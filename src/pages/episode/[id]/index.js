import axios from "axios";
import Head from "next/head";
import supabase from "../../../../utils/supabase";

export default function Episode({ episode }) {
  if (episode.title === undefined) {
    console.log(episode.id);
  }
  return (
    <>
      <Head>
        <title>{episode.title}</title>
        <meta name="description" content={episode.description} />
        <meta property="og:title" content={episode.title.toString()} />
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

  try {
    const og = await axios.get("https://podlist.co/api/og", {
      params: {
        episode_id: id,
      },
    });

    const episode = og.data;

    return {
      props: {
        episode,
      },
      revalidate: 60, // Regenerate at most once every 60 seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
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
