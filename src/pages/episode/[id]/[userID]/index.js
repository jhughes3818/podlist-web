import axios from "axios";
import Head from "next/head";
import supabase from "../../../../../utils/supabase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayCircle, PauseCircle } from "react-ionicons";
import ReactPlayer from "react-player";
import ClipPlayer from "@/components/ClipPlayer";

export default function Episode({ episode, userID }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [show, setShow] = useState(episode.show);
  const [episodeTitle, setEpisodeTitle] = useState(episode.title);
  const [audio, setAudio] = useState("");
  const [hasWindow, setHasWindow] = useState(false);
  const [audioPlayerState, setAudioPlayerState] = useState("paused");
  const [progress, setProgress] = useState(50);

  // Play the audio when the user clicks the play button
  function playAudio(name) {
    const audioPlayer = document.querySelector("audio");
    audioPlayer.play();
    setAudioPlayerState("playing");
  }

  // Pause the audio when the user clicks the pause button
  function pauseAudio(name) {
    const audioPlayer = document.querySelector("audio");
    audioPlayer.pause();
    setAudioPlayerState("paused");
  }

  // Update the progress bar as the audio plays
  function updateProgress(name) {
    const audioPlayer = document.querySelector("audio");
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    setProgress(progress);
  }

  useEffect(() => {
    const audioPlayer = document.querySelector("audio");
    if (audioPlayerState == "playing") {
      audioPlayer.addEventListener("timeupdate", updateProgress);
    }
  }, [audioPlayerState]);

  async function getBookmarks() {
    console.log("Running function");

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user", userID)
      .eq("episode_spotify_url", episode.spotifyURL);
    if (error) {
      console.log(error);
    } else {
      data.forEach((bookmark) => {
        // Convert the timestamp to a string with format hh:mm:ss
        bookmark.timestring = new Date(bookmark.timestamp)
          .toISOString()
          .substr(11, 8);
      });

      setBookmarks(data);

      return data;
    }
  }

  async function getAppleLink() {
    const appleResults = await axios.get(
      "https://itunes.apple.com/search" + "?entity=podcast&term=" + show
    );

    const showID = appleResults.data.results[0].collectionId;

    const episode = await axios.get(
      `https://itunes.apple.com/lookup?id=${showID}&media=podcast&entity=podcastEpisode&limit=100`
    );

    // Find the index of the episode in the array where the title matches the title of the episode we're looking for
    const episodeIndex = episode.data.results.findIndex(
      (episode) => episode.trackName == episodeTitle
    );

    console.log(episodeIndex);

    console.log(episode.data.results[episodeIndex].trackName);
    setAudio(episode.data.results[episodeIndex].episodeUrl);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
      getBookmarks();
    }
  }, [episode]);

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
          {/* <p className="mb-0">
            Want to make your own link? Do it{" "}
            <a href="/" className="bg-blue-200  rounded-sm px-1">
              here
            </a>
            .
          </p> */}

          <div className="w-96 items-center justify-center rounded-lg border-b-8 border-l-2 border-r-8 border-t-2 border-black p-5">
            <img src={episode.image} className="h-50 w-50 mx-auto rounded-lg" />
            <h1 className="mt-2 text-2xl font-bold">{episode.title}</h1>
            <p className="text-gray-600">{episode.show}</p>
            <div>
              <ClipPlayer src={episode.appleMp3} />
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
                {bookmarks.length > 0 ? (
                  <div>
                    <h1 className="font-bold">Bookmarked moments</h1>
                    <div className="flex flex-col gap-2">
                      {bookmarks.map((bookmark) => (
                        <div className="flex flex-row gap-2 items-center">
                          <div className="w-full">
                            {/* Play icon from fontawesome*/}
                            {/* <a
                              href={`${episode.spotifyURL}?t=${bookmark.timestamp}`}
                            >
                              <PlayCircle
                                color={"gray"}
                                height={40}
                                width={40}
                              />
                            </a> */}
                            <ClipPlayer
                              src={episode.appleMp3}
                              startTimestamp={bookmark.timestamp}
                            />
                          </div>
                          {/* <div className="flex flex-col">
                            <p className="text-sm text-gray-500 mb-0 p-0 leading-none font-semibold">
                              {bookmark.timestring}
                            </p>
                          </div> */}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id, userID } = context.query;

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
  let appleMp3 = null;

  if (episodeIndex == -1) {
    appleURL = null;
  } else {
    appleURL = apple.data.results[episodeIndex].trackViewUrl;
    appleMp3 = apple.data.results[episodeIndex].episodeUrl;
  }

  const episode = {
    title: spotify.data.name,
    description: spotify.data.description,
    image: spotify.data.images[0].url,
    spotifyURL: spotify.data.external_urls.spotify,
    show: spotify.data.show.name,
    appleURL: appleURL,
    appleMp3: appleMp3,
  };

  // const og = await axios.get("http://localhost:3000/api/og", {
  //   params: {
  //     episode_id: id,
  //   },
  // });

  // const episode = og.data;

  console.log(userID);
  console.log(spotify.data.external_urls.spotify);

  // Get bookmarks for the current episode
  const { bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("episode_spotify_url", spotify.data.external_urls.spotify)
    .eq("user", userID);

  console.log(error);

  console.log(bookmarks);

  return {
    props: {
      episode,
      userID,
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
