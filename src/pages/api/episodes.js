import supabase from "../../../utils/supabase";

export default async function handler(req, res) {
  const { data, error } = await supabase.from("episodes").select("*");

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  console.log(data);
  return res.status(200).json(data);
}
