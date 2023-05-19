import supabase from "../../../../utils/supabase";

export default async function handler(req, res) {
  // Get spotify id from the url
  const spotifyID = req.query.spotifyID;

  const spotifyURL = `https://open.spotify.com/episode/${spotifyID}`;

  console.log(spotifyURL);

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("url", spotifyURL);

  console.log(data);

  return res.status(200).json({ data });
}
