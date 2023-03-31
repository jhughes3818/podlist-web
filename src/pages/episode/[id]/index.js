import { useRouter } from "next/router";
import supabase from "utils/supabase";
import { useEffect, useState } from "react";
import { fetch } from "fetch-opengraph";
import axios from "axios";

export default function Episode() {
  const [episode, setEpisode] = useState(null);

  // Get id from URL
  const { id } = useRouter().query;

  // Get episode from supabase
  useEffect(() => {
    console.log("Hello");

    if (id) {
      getEpisode()
        .catch((err) => console.log(err))
        .then(() => console.log("done"))
        .catch((err) => console.log(err));
    }
  }, [id]);

  const getEpisode = async () => {
    // Get og data

    const og = await axios.get("/api/og", {
      params: {
        episode_id: id,
      },
    });

    setEpisode(og.data);
  };

  return (
    <>
      {episode ? (
        <div className="grid h-screen place-items-center">
          <div className="w-96 items-center justify-center rounded-lg border-b-4 border-l-2 border-r-4 border-t-2 border-black p-5">
            <img src={episode.image} className="h-50 w-50 mx-auto rounded-lg" />
            <h1 className="mt-2 text-2xl font-bold">{episode.title}</h1>
            <p className="text-gray-600">{episode.show}</p>
            <div className="mt-2 flex flex-row items-center justify-center gap-2">
              <div className="w-max rounded-lg border-2 border-black px-2 py-1">
                <a href={episode.spotifyURL}>Spotify</a>
              </div>
              <div className="w-max rounded-lg border-2 border-black px-2 py-1">
                <a href={episode.appleURL}>Apple</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
