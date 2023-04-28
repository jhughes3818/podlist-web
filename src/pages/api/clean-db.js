// This endpoint goes through the database and removes any episodes that are not in user's list. It also removes duplicate episodes from the database. This is useful for when the database gets out of sync with the spotify api. This endpoint is not used in the app, but is useful for debugging.

import supabase from "../../../utils/supabase";

export default async function handler(req, res) {
  // Get all episodes
  const { data: episodes, error: episodes_error } = await supabase
    .from("episodes")
    .select("*");

  if (episodes_error) {
    console.log("Error getting episodes: ", episodes_error);
    return;
  }

  // Get all lists
  const { data: lists, error: lists_error } = await supabase
    .from("lists")
    .select("*, episodes (*)");

  if (lists_error) {
    console.log("Error getting lists: ", lists_error);
    return;
  }

  // For each episode, check if it is in any lists
  for (let i = 0; i < episodes.length; i++) {
    // For each list item, check if the episode is equal to episode.id

    let found = false;

    for (let j = 0; j < lists.length; j++) {
      if (lists[j].episode === episodes[i].id) found = true;
    }

    if (!found) {
      // If not found, delete the episode
      const { data: episode, error: episode_error } = await supabase
        .from("episodes")
        .delete()
        .eq("id", episodes[i].id);

      if (episode_error) {
        console.log("Error deleting episode: ", episode_error);
        return;
      }
    }
  }

  // Remove duplicate episodes checking by url
  for (let i = 0; i < episodes.length; i++) {
    const { data: episode, error: episode_error } = await supabase
      .from("episodes")
      .delete()
      .neq("id", episodes[i].id)
      .eq("url", episodes[i].url);

    if (episode_error) {
      console.log("Error deleting episode: ", episode_error);
      return;
    }
  }

  res.status(200).json({ success: true });
}
