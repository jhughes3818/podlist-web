import supabase from "../../../utils/supabase";
import axios from "axios";

export default async function handler(req, res) {
  const { data, error } = await supabase.from("episodes").select("*");

  let episodeTitles = [];

  data.map(async (episode) => {
    const episode_data = await axios.get("https://podlist.co/api/og", {
      params: {
        episode_id: episode.id,
      },
    });

    const episodeTitle = episode_data.data.title;
    const episodeID = episode.id;

    episodeTitles.push({ episodeTitle, episodeID });
    console.log(episodeTitles);
  });

  res.status(200).json(episodeTitles);
}
