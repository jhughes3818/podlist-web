import supabase from "../../../utils/supabase";
import axios from "axios";

export default function Shows({ shows }) {
  // Get the user ID from the route

  return (
    <div className="grid place-items-center h-screen">
      <h1 className="text-3xl font-bold mb-3">My Favourite Podcasts</h1>
      <div className="flex flex-col gap-2">
        {shows.map((show) => (
          <div className="w-max border-2 border-black flex flex-row rounded-md">
            <img src={show.images[0].url} className="h-52 w-52 rounded-s-md " />
            <div className="h-52">
              <h1 className="font-bold text-lg w-96 px-4 max-h-32 overflow-hidden line-clamp-4">
                {show.name}
              </h1>
              <h1 className="text-sm text-gray-600 truncate w-96 px-4">
                {show.description}
              </h1>
              <div className="w-max rounded-md border-2 border-black px-2 py-1 ml-4">
                <a href={show.external_urls.spotify || null}>
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
  );
}

export async function getServerSideProps(context) {
  const { userID } = context.query;

  console.log(userID);

  const { data, error } = await supabase
    .from("followed_podcasts")
    .select("*")
    .eq("user_id", userID);

  // Construct list of Spotify IDs
  const spotifyIDs = data.map((show) => show.spotify_id);

  const token = await getSpotifyToken();

  const podcasts = await getFollowing(userID, token);

  console.log(podcasts);

  return {
    props: {
      shows: podcasts,
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
