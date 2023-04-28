import supabase from "../../../../utils/supabase";
import { fetch } from "fetch-opengraph";
import axios from "axios";

export default async function handler(req, res) {
  // Get all podcasts from episodes table
  const { data: podcasts, error } = await supabase.from("episodes").select("*");

  // For each episode, get the og data
  podcasts.forEach(async (podcast, index) => {
    const waitTime = index * 1000; // 1 second per request

    setTimeout(async () => {
      const ogData = await fetch(podcast.url);

      // Extract the title, description, and image from the og data
      const title = ogData["og:title"];
      const description = ogData["og:description"];
      const image = ogData["og:image"];

      console.log(title, description, image);

      const regex = /^(ep|episode|show|season|s)\b/;

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

      const episodeTitleFirst20WithNumbers = episodeTitleWithNumbers.slice(
        0,
        50
      );

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
        // Remove leading character from episodeTitleFirst60
        const episodeTitleFirst60NoLeadingCharacter =
          episodeTitleFirst60.slice(1);
        appleResponse = await axios.get(
          `https://itunes.apple.com/search?term=${episodeTitleFirst60NoLeadingCharacter}&entity=podcastEpisode`
        );
      }

      console.log(appleResponse.data.results[0]);

      const episodeObject = {
        title: title,
        description: appleResponse.data.results[0].description,
        image: image,
        show: appleResponse.data.results[0].collectionName,
        appleURL: appleResponse.data.results[0].trackViewUrl,
        spotifyURL: podcast.url,
      };

      // Update the episode with the new data
      const { data, error } = await supabase
        .from("episodes")
        .update(episodeObject)
        .eq("id", podcast.id);

      console.log(data, error);
    }, waitTime);
  });
}
