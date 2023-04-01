import { fetch } from "fetch-opengraph";
import supabase from "utils/supabase";
import axios from "axios";

export default async function handler(req, res) {
  const id = req.query.episode_id;
  console.log(id);

  console.log("Getting Episode");
  const { data: episodeData, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.log(error);
  }
  console.log(episodeData);

  // Check if title, description, and image are in the database already
  // If they are, send back the episode data
  // If they aren't, get the og data and send back the episode data

  if (
    episodeData.title &&
    episodeData.description &&
    episodeData.image &&
    episodeData.show &&
    episodeData.appleURL &&
    episodeData.spotifyURL
  ) {
    const episodeObject = {
      title: episodeData.title,
      description: episodeData.description,
      image: episodeData.image,
      show: episodeData.show,
      appleURL: episodeData.appleURL,
      spotifyURL: episodeData.spotifyURL,
    };

    res.status(200).json(episodeObject);
  } else {
    const ogData = await fetch(episodeData.url);

    // Extract the title, description, and image from the og data
    const title = ogData["og:title"];
    const description = ogData["og:description"];
    const image = ogData["og:image"];

    const episodeObject = {
      title: title,
      description: description,
      image: image,
      spotifyURL: episodeData.url,
    };

    res.status(200).json(episodeObject);
  }
}
