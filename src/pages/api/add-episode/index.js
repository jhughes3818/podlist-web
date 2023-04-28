import supabase from "../../../../utils/supabase";
import axios from "axios";
import { fetch } from "fetch-opengraph";

// This endpoint handles the adding of episodes to user lists. It checks if the episode is already in the database, and if not, it adds it. Then it adds the episode to the user's list.

// If the episode is already in the database, it just adds it to the user's list.

// It responds with an object containing details about the episode and the list entry.

export default async function handler(req, res) {
  // Destruct the request body
  const { episode, user } = req.body;

  console.log(episode);

  // Check if the episode is already in the database
  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("url", episode.link);

  // If the episode is not in the database, add it
  if (data.length === 0) {
    // Use fetch to get the episode's description from opengraph
    const og = await fetch(episode.link);

    // Extract the description from the opengraph data
    const description = og.description;
    //Extract the image from the opengraph data
    const image = og["twitter:image"];

    const episodeTitleURLEncoded = encodeURIComponent(og.title);

    // Get the apple podcast details for the episode
    const appleReponse = await axios.get(
      `https://itunes.apple.com/search?term=${episodeTitleURLEncoded}&entity=podcastEpisode`
    );

    const { data, error } = await supabase
      .from("episodes")
      .insert([
        {
          spotifyURL: episode.link,
          title: episode.title,
          show: episode.show,
          url: episode.link,
          description: description,
          image: image,
        },
      ])
      .select();

    episodeID = data[0].id;
    console.log(data);
  } else {
    episodeID = data[0].id;
  }

  // Add the episode to the user's list
  const { data: list, error: listError } = await supabase.from("lists").insert([
    {
      episode: episodeID,
      user: user.id,
      status: "Queue",
    },
  ]);

  console.log(list);

  res.status(200).json({ episode: data, list: list });
}
