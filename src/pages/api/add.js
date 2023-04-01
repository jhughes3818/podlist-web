import supabase from "../../../utils/supabase";
import { fetch } from "fetch-opengraph";
import axios from "axios";

export default async function handler(req, res) {
  // Check if the url is already in the database
  const { data: episodeData, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("url", req.body.url);
  if (error) {
    console.log(error);
  }
  console.log(episodeData);

  // send back the id of the episode

  let data = null;

  // Get the og data
  const ogData = await fetch(req.body.url);

  // Extract the title, description, and image from the og data
  const title = ogData["og:title"];
  const description = ogData["og:description"];
  const image = ogData["og:image"];

  // Create first call to itunes api
  const episodeTitleSearch = title
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "+");

  // Search itunes api for the podcast

  const episodeTitleNoSpaces = title
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "+")
    .replace(/[0-9]/g, "")
    .replace(/\b(ep(isode)?|e(p)?\.?|show)\b/gi, "");

  const episodeTitleFirst20 = episodeTitleNoSpaces.slice(0, 50);
  const episodeTitleFirst60 = episodeTitleNoSpaces.slice(0, 60);
  const episodeTitleWithNumbers = title
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, "+")
    .replace(/\b(ep(isode)?|e(p)?\.?|show)\b/gi, "");

  const episodeTitleFirst20WithNumbers = episodeTitleWithNumbers.slice(0, 50);

  console.log(episodeTitleFirst20);
  console.log("hello");

  // Get apple podcast data
  let appleResponse = await axios.get(
    `https://itunes.apple.com/search?term=${episodeTitleFirst20}&entity=podcastEpisode`
  );

  if (appleResponse.data.results.length === 0) {
    console.log("Trying second call");
    appleResponse = await axios.get(
      `https://itunes.apple.com/search?term=${episodeTitleFirst20WithNumbers}&entity=podcastEpisode`
    );
  }

  if (appleResponse.data.results.length === 0) {
    console.log("Trying third call");
    appleResponse = await axios.get(
      `https://itunes.apple.com/search?term=${episodeTitleFirst60}&entity=podcastEpisode`
    );
  }

  if (appleResponse.data.results.length === 0) {
    console.log("Trying fourth call");
    appleResponse = await axios.get(
      `https://itunes.apple.com/search?term=${episodeTitleWithNumbers}&entity=podcastEpisode`
    );
  }

  if (appleResponse.data.results.length === 0) {
    console.log("Trying fifth call");
    appleResponse = await axios.get(
      `https://itunes.apple.com/search?term=${episodeTitleSearch}&entity=podcastEpisode`
    );
  }

  // create episode object
  const episodeObject = {
    title: title,
    description: description,
    show: appleResponse.data.results[0].collectionName,
    image: image,
    spotifyURL: req.body.url,
    appleURL: appleResponse.data.results[0].trackViewUrl,
    url: req.body.url,
  };

  if (episodeData.length === 0) {
    const { data: newEpisodeData, error } = await supabase
      .from("episodes")
      .insert([episodeObject])
      .select();
    if (error) {
      console.log(error);
    }
    console.log(data);
    data = newEpisodeData[0];
  } else {
    data = episodeData[0];
  }

  res.status(200).json(data);
}
