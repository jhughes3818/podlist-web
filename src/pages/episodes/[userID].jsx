import supabase from "../../../utils/supabase";
import axios from "axios";
import Head from "next/head";

export default function Shows({ episodes }) {
  const episodeTitles = episodes.map((episode) => episode.episodes.title);

  return (
    <>
      <Head>
        <title>My Favourite Episodes</title>
        <meta name="description" content={episodeTitles} />
        <meta property="og:title" content={"My Favourite Episodes"} />
        <meta property="og:description" content={episodeTitles} />
        <meta property="og:image" content={episodes[0].episodes.image} />
        <meta property="og:url" content={episodes[0].url} />
        <meta property="twiter:title" content={"My Favourite Episodes"} />
        <meta property="twiter:description" content={episodeTitles} />
        <meta property="twiter:image" content={episodes[0].episodes.image} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Podlist" />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="https://fav.farm/🔥" />
      </Head>
      <div className="grid place-items-center h-screen">
        <h1 className="text-3xl font-bold mb-3">My Favourite Episodes</h1>
        <div className="flex flex-col gap-2">
          {episodes.map((episode) => (
            <div className="w-max border-2 border-black flex flex-row rounded-md">
              <img
                src={episode.episodes.image}
                className="h-52 w-52 rounded-s-md "
              />
              <div className="h-52">
                <h1 className="font-bold text-lg w-96 px-4 max-h-32 overflow-hidden line-clamp-4">
                  {episode.episodes.title}
                </h1>
                <h1 className="text-sm text-gray-600 truncate w-96 px-4">
                  {episode.episodes.description}
                </h1>
                <div className="w-max rounded-md border-2 border-black px-2 py-1 ml-4">
                  <a href={episode.episodes.url || null}>
                    <div>
                      <img
                        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
                        className="h-5"
                      ></img>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { userID } = context.query;

  console.log(userID);

  const { data, error } = await supabase
    .from("lists")
    .select("*, episodes(*)")
    .eq("user", userID);

  console.log(data);

  return {
    props: {
      episodes: data,
    },
  };
}

const querystring = require("querystring");

const getSpotifyToken = async () => {
  const data = {
    client_id: "d64cd591e68841728e4068cffe50d506",
    client_secret: "411373f77091415e9a7b596c818f58ac",
    grant_type: "client_credentials",
  };

  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const spotifyToken = await axios.post(
    "https://accounts.spotify.com/api/token",
    querystring.stringify(data),
    options
  );
  // console.log(spotifyToken.data.access_token);

  return spotifyToken.data.access_token;
};

const getFollowing = async (user, token) => {
  // // // //console.log("Getting following list...");

  const { data: following, error: followingError } = await supabase
    .from("followed_podcasts")
    .select("*")
    .eq("user_id", user);

  if (followingError) {
    // // //console.log("Error getting following list: ", followingError);
    return;
  }

  // Get the podcast information from the spotify api
  let followingListWithPodcastInfo = [];

  let followingIDs = [];

  for (let i = 0; i < following.length; i++) {
    // // //console.log(following);

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        Authorization: "Bearer " + token,
      },
    };

    // // //console.log(following[i].id);

    const searchResults = await axios.get(
      "https://api.spotify.com/v1/shows/" +
        following[i].spotify_id +
        "?offset=0&limit=50&market=US",
      options
    );

    // // //console.log(searchResults.data);

    // Get the latest episode date
    const latestEpisodeDate = new Date(
      searchResults.data.episodes.items[0].release_date
    );

    followingListWithPodcastInfo.push(searchResults.data);
  }

  // Sort episodes.items by release date with the latest episode first
  for (let i = 0; i < followingListWithPodcastInfo.length; i++) {
    followingListWithPodcastInfo[i].episodes.items.sort((a, b) => {
      const aDate = new Date(a.release_date);
      const bDate = new Date(b.release_date);
      return bDate - aDate;
    });
  }

  // Order the podcasts by the latest episode date
  followingListWithPodcastInfo.sort((a, b) => {
    const aDate = new Date(a.episodes.items[0].release_date);
    const bDate = new Date(b.episodes.items[0].release_date);
    return bDate - aDate;
  });

  // // //console.log(followingListWithPodcastInfo[0].images[0].url);

  return followingListWithPodcastInfo;
};
