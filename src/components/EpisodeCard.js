import axios from "axios";
import { useState, useEffect } from "react";

export default function EpisodeCard(props) {
  const [episodeData, setEpisodeData] = useState({});
  const id = props.id;

  useEffect(() => {
    if (props.episode) {
      setEpisodeData(props.episode);
      console.log(props.episode.image);
    }

    async function fetchData() {
      const data = await getEpisode();
      setEpisodeData(data);
    }
    fetchData();
  }, [id]);

  async function getEpisode() {
    if (!props.episode) {
      // const episode = await axios.get("https://podlist.co/api/og", {
      //   params: {
      //     episode_id: id,
      //   },
      // });

      const episode = await axios.get("http://localhost:3000/api/og", {
        params: {
          episode_id: id,
        },
      });
      return episode.data;
    }
  }

  {
    episodeData ? console.log(episodeData) : null;
  }

  return (
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
          <img
            src={episodeData.image || null}
            className="h-50 w-50 mx-auto rounded-lg"
          />
          <h1 className="mt-2 text-2xl font-bold">
            {episodeData.title || null}
          </h1>
          <p className="text-gray-600">{episodeData.show || null}</p>
          <div>
            <div className="flex flex-col gap-2">
              <div className="mt-2 flex flex-row gap-2">
                <div className="w-max rounded-lg border-2 border-black px-2 py-1">
                  <a href={episodeData.spotifyURL || null}>
                    <div>
                      <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
                        className="h-8"
                      ></img>
                    </div>
                  </a>
                </div>
                {episodeData.appleURL ? (
                  <div className=" rounded-lg border-2 border-black px-2 py-1">
                    <a href={episodeData.appleURL}>
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
                {episodeData.youtubeURL ? (
                  <div className="rounded-lg border-2 border-black px-2 py-1 w-40">
                    <a href={episodeData.youtubeURL}>
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
  );
}
