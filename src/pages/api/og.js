import { fetch } from "fetch-opengraph";
import supabase from "utils/supabase";
import axios from "axios";

export default async function handler(req, res) {
  const id = req.query.episode_id;
  // console.log(id);

  const spotifyURL = `https://open.spotify.com/episode/${id}`;

  // console.log("Getting Episode");
  // const { data: episodeData, error } = await supabase
  //   .from("episodes")
  //   .select("*")
  //   .eq("id", id)
  //   .single();
  // if (error) {
  //   // console.log(error);
  // }

  const { data: episodeData, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("url", spotifyURL)
    .single();

  console.log(episodeData);
  // console.log(episodeData);

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
      youtubeURL: episodeData.youtubeURL,
    };

    res.status(200).json(episodeObject);
  } else {
    const ogData = await fetch(episodeData.url);

    // Extract the title, description, and image from the og data
    const title = ogData["og:title"];
    const description = ogData["og:description"];
    const image = ogData["og:image"];

    // Encode the title in url encoding
    const titleEncoded = encodeURIComponent(title);

    console.log(titleEncoded);

    // Search itunes api for the podcast
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

    // console.log(episodeTitleFirst20);
    // console.log("hello");

    // Get apple podcast data
    let appleResponse = await axios.get(
      `https://itunes.apple.com/search?term=${titleEncoded}&entity=podcastEpisode`
    );

    // if (appleResponse.data.results.length === 0) {
    //   // console.log("Trying second call");
    //   appleResponse = await axios.get(
    //     `https://itunes.apple.com/search?term=${episodeTitleFirst20WithNumbers}&entity=podcastEpisode`
    //   );
    // }

    // if (appleResponse.data.results.length === 0) {
    //   // console.log("Trying third call");
    //   appleResponse = await axios.get(
    //     `https://itunes.apple.com/search?term=${episodeTitleFirst60}&entity=podcastEpisode`
    //   );
    // }

    // if (appleResponse.data.results.length === 0) {
    //   // console.log("Trying fourth call");
    //   appleResponse = await axios.get(
    //     `https://itunes.apple.com/search?term=${episodeTitleWithNumbers}&entity=podcastEpisode`
    //   );
    // }

    // if (appleResponse.data.results.length === 0) {
    //   // console.log("Trying fifth call");
    //   appleResponse = await axios.get(
    //     `https://itunes.apple.com/search?term=${episodeTitleSearch}&entity=podcastEpisode`
    //   );
    // }

    if (appleResponse.data.results.length === 0) {
      // Create episode object with null for show and appleURL
      const episodeObject = {
        title: title,
        description: description,
        image: image,
        spotifyURL: episodeData.url,
        appleURL: null,
        show: null,
        url: episodeData.url,
      };

      const { data, error } = await supabase
        .from("episodes")
        .update(episodeObject)
        .eq("id", id);

      res.status(200).json(episodeObject);
    } else {
      const episodeObject = {
        title: title,
        description: description,
        image: image,
        spotifyURL: episodeData.url,
        appleURL: appleResponse.data.results[0].trackViewUrl,
        show: appleResponse.data.results[0].collectionName,
        url: episodeData.url,
      };

      const { data, error } = await supabase
        .from("episodes")
        .update(episodeObject)
        .eq("id", id);

      res.status(200).json(episodeObject);
    }

    // Update the episode in the database
  }
}
