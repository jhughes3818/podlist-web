// import ClipPlayer from "../../../../components/ClipPlayer";
// import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Episode() {
  // Redirect user one level up
  const router = useRouter();

  // Extract the id and userID from the router query
  const { id, userID } = router.query;

  useEffect(() => {
    if (userID) {
      router.push(`/episode/${id}`);
    }
  }, [id, userID, router]);

  return (
    <>
      <Head>
        <title>Episode Page</title>
        {/* <meta name="description" content={episode.description} />
        <meta property="og:title" content={episode.title} />
        <meta property="og:description" content={episode.description} />
        <meta property="og:image" content={episode.image} />
        <meta property="og:url" content={episode.spotifyURL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Podlist" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:title" content={episode.title} />
        <meta name="twitter:description" content={episode.description} />
        <meta name="twitter:image" content={episode.image} />
        <link rel="icon" href={episode.image} /> */}
      </Head>
      <span>Loading...</span>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { id } = context.query;

//   //Get og data
//   // const og = await axios.get("https://podlist.co/api/og", {
//   //   params: {
//   //     episode_id: id,
//   //   },
//   // });

//   const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
//   const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

//   const spotify_token = await axios({
//     method: "post",
//     url: "https://accounts.spotify.com/api/token",
//     params: {
//       grant_type: "client_credentials",
//     },
//     headers: {
//       Authorization:
//         "Basic " +
//         Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
//           "base64"
//         ),
//     },
//   });

//   console.log(spotify_token.data.access_token);

//   const spotify = await axios.get(
//     `https://api.spotify.com/v1/episodes/${id}?market=US`,
//     {
//       headers: {
//         Authorization: "Bearer " + spotify_token.data.access_token,
//       },
//     }
//   );

//   const appleResults = await axios.get(
//     "https://itunes.apple.com/search" +
//       "?entity=podcast&term=" +
//       spotify.data.show.name
//   );

//   const showID = appleResults.data.results[0]?.collectionId;

//   let apple = null;

//   if (showID != null) {
//     apple = await axios.get(
//       `https://itunes.apple.com/lookup?id=${showID}&media=podcast&entity=podcastEpisode&limit=100`
//     );
//   }

//   let episodeIndex = -1;

//   if (apple != null) {
//     episodeIndex = apple.data.results.findIndex(
//       (episode) => episode.trackName == spotify.data.name
//     );
//   }

//   let appleURL = null;
//   let appleMp3 = null;

//   if (episodeIndex == -1 || showID == null) {
//     appleURL = null;
//   } else {
//     appleURL = apple.data.results[episodeIndex].trackViewUrl;
//     appleMp3 = apple.data.results[episodeIndex].episodeUrl;
//   }

//   const episode = {
//     title: spotify.data.name,
//     description: spotify.data.description,
//     image: spotify.data.images[0].url,
//     spotifyURL: spotify.data.external_urls.spotify,
//     show: spotify.data.show.name,
//     appleURL: appleURL,
//     appleMp3: appleMp3,
//   };

//   return {
//     props: {
//       episode,
//     },
//   };
// }

// // export async function getStaticPaths() {
// //   try {
// //     const episodes = await axios.get("https://podlist.co/api/episodes");
// //     console.log(episodes);

// //     const paths = episodes.data.map((episode) => ({
// //       params: {
// //         id: episode.id.toString(),
// //       },
// //     }));

// //     return {
// //       paths,
// //       fallback: "blocking",
// //     };
// //   } catch (error) {
// //     console.error(error);
// //     return {
// //       paths: [],
// //       fallback: "blocking",
// //     };
// //   }
// // }
