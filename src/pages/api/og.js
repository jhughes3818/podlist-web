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

  const data = await fetch(episodeData.url);

  // Remove spaces, punctuation and numbers from episode title

  console.log(data["og:title"]);

  const episodeTitleNoSpaces = data["og:title"]
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "+")
    .replace(/[0-9]/g, "")
    .replace(/\b(ep(isode)?|e(p)?\.?)\b/gi, "");

  console.log(episodeTitleNoSpaces);

  // Get apple podcast data
  const appleResponse = await axios.get(
    `https://itunes.apple.com/search?term=${episodeTitleNoSpaces}&entity=podcastEpisode`
  );

  console.log(appleResponse.data.results[0]);

  const episodeObject = {
    title: data["og:title"],
    description: appleResponse.data.results[0].description,
    image: data["og:image"],
    show: appleResponse.data.results[0].collectionName,
    appleURL: appleResponse.data.results[0].trackViewUrl,
    spotifyURL: data["og:url"],
  };

  res.status(200).json(episodeObject);
}
