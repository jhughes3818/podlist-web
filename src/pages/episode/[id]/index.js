import axios from "axios";
import Head from "next/head";

export default function Episode({ episode }) {
  return (
    <>
      <Head>
        <title>{episode.title}</title>
        <meta name="description" content={episode.description} />
        <meta property="og:title" content={episode.title} />
        <meta property="og:description" content={episode.description} />
        <meta property="og:image" content={episode.image} />
        <meta property="og:url" content={episode.spotifyURL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Podlist" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="w-96 items-center justify-center rounded-lg border-b-4 border-l-2 border-r-4 border-t-2 border-black p-5">
          <img src={episode.image} className="h-50 w-50 mx-auto rounded-lg" />
          <h1 className="mt-2 text-2xl font-bold">{episode.title}</h1>
          <p className="text-gray-600">{episode.show}</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <div className="w-max rounded-lg border-2 border-black px-2 py-1">
              <a href={episode.spotifyURL}>Spotify</a>
            </div>
            <div className="w-max rounded-lg border-2 border-black px-2 py-1">
              <a href={episode.appleURL}>Apple</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Get og data
  const og = await axios.get("https://podlist-web-js-mmfx.vercel.app/api/og", {
    params: {
      episode_id: id,
    },
  });

  const episode = og.data;

  return {
    props: {
      episode,
    },
  };
}
