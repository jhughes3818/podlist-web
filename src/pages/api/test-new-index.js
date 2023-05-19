import supabase from "../../../utils/supabase";

export default async function handler(req, res) {
  const body = req.body;

  const spotifyID = body.spotifyID;

  const spotifyURL = `https://api.spotify.com/v1/episodes/${spotifyID}`;

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("url", spotifyURL);

  console.log(data);
}
