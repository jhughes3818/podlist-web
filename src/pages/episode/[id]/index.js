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

        <meta name="twitter:title" content={episode.title} />
        <meta name="twitter:description" content={episode.description} />
        <meta name="twitter:image" content={episode.image} />
        <link rel="icon" href={episode.image} />
      </Head>
      <div className="grid h-screen place-items-center">
        <div>
          <p className="mb-0">
            Want to make your own link? Do it{" "}
            <a href="/" className="bg-blue-200  rounded-sm px-1">
              here
            </a>
            .
          </p>

          <div className="w-96 items-center justify-center rounded-lg border-b-8 border-l-2 border-r-8 border-t-2 border-black p-5">
            <img src={episode.image} className="h-50 w-50 mx-auto rounded-lg" />
            <h1 className="mt-2 text-2xl font-bold">{episode.title}</h1>
            <p className="text-gray-600">{episode.show}</p>
            <div>
              <div className="flex flex-col gap-2">
                <div className="mt-2 flex flex-row gap-2">
                  <div className="w-max rounded-lg border-2 border-black px-2 py-1">
                    <a href={episode.spotifyURL}>
                      <div>
                        <img
                          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
                          className="h-8"
                        ></img>
                      </div>
                    </a>
                  </div>
                  {episode.appleURL ? (
                    <div className=" rounded-lg border-2 border-black px-2 py-1">
                      <a href={episode.appleURL}>
                        <div className="flex flex-row">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Podcasts_%28iOS%29.svg/1920px-Podcasts_%28iOS%29.svg.png"
                            className="h-8"
                          ></img>
                          <div className="ml-3">
                            <p className="text-sm text-gray-500 mb-0 p-0 leading-none font-semibold">
                              Listen on
                            </p>
                            <p className="text-md font-bold mt-0 p-0 leading-none">
                              Apple Podcasts
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ) : null}
                </div>
                <div>
                  {episode.youtubeURL ? (
                    <div className="rounded-lg border-2 border-black px-2 py-1 w-40">
                      <a href={episode.youtubeURL}>
                        <div className="flex flex-row items-center justify-center">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
                            className="h-8"
                          ></img>
                          <div className="ml-3">
                            <p className="text-md font-bold mt-0 p-0 leading-none">
                              YouTube
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  //Get og data
  // const og = await axios.get("https://podlist.co/api/og", {
  //   params: {
  //     episode_id: id,
  //   },
  // });

  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
  const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  const spotify_token = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    params: {
      grant_type: "client_credentials",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
    },
  });

  console.log(spotify_token.data.access_token);

  const spotify = await axios.get(
    `https://api.spotify.com/v1/episodes/${id}?market=US`,
    {
      headers: {
        Authorization: "Bearer " + spotify_token.data.access_token,
      },
    }
  );

  const appleResults = await axios.get(
    "https://itunes.apple.com/search" +
      "?entity=podcast&term=" +
      spotify.data.show.name
  );

  const showID = appleResults.data.results[0].collectionId;

  const apple = await axios.get(
    `https://itunes.apple.com/lookup?id=${showID}&media=podcast&entity=podcastEpisode&limit=100`
  );

  const episodeIndex = apple.data.results.findIndex(
    (episode) => episode.trackName == spotify.data.name
  );

  let appleURL = null;

  if (episodeIndex == -1) {
    appleURL = null;
  } else {
    appleURL = apple.data.results[episodeIndex].trackViewUrl;
  }

  const episode = {
    title: spotify.data.name,
    description: spotify.data.description,
    image: spotify.data.images[0].url,
    spotifyURL: spotify.data.external_urls.spotify,
    show: spotify.data.show.name,
    appleURL: appleURL,
  };

  return {
    props: {
      episode,
    },
  };
}

// export async function getStaticPaths() {
//   try {
//     const episodes = await axios.get("https://podlist.co/api/episodes");
//     console.log(episodes);

//     const paths = episodes.data.map((episode) => ({
//       params: {
//         id: episode.id.toString(),
//       },
//     }));

//     return {
//       paths,
//       fallback: "blocking",
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }
// }
