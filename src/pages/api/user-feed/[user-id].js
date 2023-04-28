import axios from "axios";
import supabase from "../../../../utils/supabase";

/// This endpoint will return a feed of for the user which will include the episodes in a users lists, and the most recent episode from the shows they follow

export default async function handler(req, res) {
  // Get the user ID from the route
  const user_id = req.query["user-id"];

  console.log("User id: ", user_id);

  // Get the user list
  const { data: user_list, error: user_list_error } = await supabase
    .from("lists")
    .select("*, episodes (*)")
    .eq("user", user_id);

  if (user_list_error) {
    console.log("Error getting user list: ", user_list_error);
    return;
  }

  // Get the podcasts the user follows
  const { data: user_follows, error: user_follows_error } = await supabase
    .from("followed_podcasts")
    .select("*");

  // Get a spotify bearer token
  const spotify_token = await getSpotifyToken();

  // Get the latest episode from each podcast the user follows from the spotify api
  let following_list = [];

  for (let i = 0; i < user_follows.length; i++) {
    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        Authorization: "Bearer " + spotify_token,
      },
    };

    const search_results = await axios.get(
      "https://api.spotify.com/v1/shows/" +
        user_follows[i].spotify_id +
        "?offset=0&limit=1&market=US",
      options
    );

    // Sort the episodes by release date with the latest episode first
    search_results.data.episodes.items.sort((a, b) => {
      const a_date = new Date(a.release_date);
      const b_date = new Date(b.release_date);
      return b_date - a_date;
    });

    // Push first episode to the following list
    following_list.push(search_results.data);
    console.log("Got episodes for: " + search_results.data.name);

    // Save each of the episodes to the episodes table
    // for (let j = 0; j < search_results.data.episodes.items.length; j++) {
    //   const { data: episodes, error: episodes_error } = await supabase
    //     .from("episodes")
    //     .update([
    //       {
    //         spotifyURL:
    //           search_results.data.episodes.items[j].external_urls.spotify,
    //         title: search_results.data.episodes.items[j].name,
    //         description: search_results.data.episodes.items[j].description,
    //         image: search_results.data.episodes.items[j].images[0].url,
    //         show: search_results.data.name,
    //         url: search_results.data.episodes.items[j].external_urls.spotify,
    //       },
    //     ])
    //     .eq("url", search_results.data.episodes.items[j].external_urls.spotify);
    // }
  }

  // Create a single object with all the episodes
  let episodes = [];

  console.log(user_list);

  // Add the episodes from the user lists
  for (let i = 0; i < user_list.length; i++) {
    for (let j = 0; j < user_list[i].episodes.length; j++) {
      episodes.push(user_list[i].episodes[j]);
    }
  }

  //Add the episodes from the podcasts the user follows
  for (let i = 0; i < following_list.length; i++) {
    for (let j = 0; j < following_list[i].episodes.items.length; j++) {
      episodes.push(following_list[i].episodes.items[j]);
    }
  }

  // Sort the episodes by release date
  episodes.sort((a, b) => {
    const a_date = new Date(a.release_date);
    const b_date = new Date(b.release_date);
    return b_date - a_date;
  });

  // Return the episodes
  res.status(200).json(episodes);
}

const getSpotifyToken = async () => {
  const querystring = require("querystring");

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
  console.log(spotifyToken.data.access_token);
  // do something with spotifyToken
  return spotifyToken.data.access_token;
};
