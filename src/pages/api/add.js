import supabase from "../../../utils/supabase";

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

  if (episodeData.length === 0) {
    const { data: newEpisodeData, error } = await supabase
      .from("episodes")
      .insert([{ url: req.body.url }])
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
