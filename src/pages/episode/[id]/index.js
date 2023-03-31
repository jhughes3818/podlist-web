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
      </Head>
      <div className="grid h-screen place-items-center">
        <div className="w-96 items-center justify-center rounded-lg border-b-8 border-l-2 border-r-8 border-t-2 border-black p-5">
          <img src={episode.image} className="h-50 w-50 mx-auto rounded-lg" />
          <h1 className="mt-2 text-2xl font-bold">{episode.title}</h1>
          <p className="text-gray-600">{episode.show}</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
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
            <div className="w-max rounded-lg border-2 border-black px-2 py-1">
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
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  //Get og data
  const og = await axios.get("https://podlist-web-js-mmfx.vercel.app/api/og", {
    params: {
      episode_id: id,
    },
  });

  // const og = await axios.get("http://localhost:3000/api/og", {
  //   params: {
  //     episode_id: id,
  //   },
  // });

  const episode = og.data;

  return {
    props: {
      episode,
    },
  };
}
