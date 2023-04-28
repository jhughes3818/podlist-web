import axios from "axios";
import Head from "next/head";
import supabase from "../../../../utils/supabase";
import EpisodeCard from "@/components/episodeCard";

export default function Episode({ episode }) {
  if (episode.title === undefined) {
    console.log(episode.id);
  }
  return (
    <>
      <Head>
        <title>{episode.title}</title>
        <meta name="description" content={episode.description || null} />
        <meta property="og:title" content={episode.title || "Episode"} />
        <meta property="og:description" content={episode.description || null} />
        <meta property="og:image" content={episode.image || null} />
        <meta property="og:url" content={episode.spotifyURL || null} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Podlist" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:title" content={episode.title} />
        <meta name="twitter:description" content={episode.description} />
        <meta name="twitter:image" content={episode.image} />
        <link rel="icon" href={episode.image} />
      </Head>
      {/* <EpisodeCard id={episode.id} /> */}
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   //Get og data
//   const og = await axios.get("https://podlist.co/api/og", {
//     params: {
//       episode_id: id,
//     },
//   });

//   // const og = await axios.get("http://localhost:3000/api/og", {
//   //   params: {
//   //     episode_id: id,
//   //   },
//   // });

//   const episode = og.data;

//   return {
//     props: {
//       episode,
//     },
//   };
// }

export async function getStaticProps({ params }) {
  const { id } = params;

  //Get episode data from Supabase
  const { data: episodeData, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return {
      props: {},
    };
  }

  return {
    props: {
      episode: episodeData,
    },
  };
}
export async function getStaticPaths() {
  // Fetch the episode ids from Supabase
  const { data, error } = await supabase.from("episodes").select("*");

  if (error) {
    console.error(error);
    return {
      paths: [],
      fallback: true,
    };
  }

  // Map the episode ids to Next.js path objects
  const paths = data.map((episode) => ({
    params: {
      id: episode.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
