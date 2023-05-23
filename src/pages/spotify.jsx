import React from "react";
import { useUser } from "@clerk/nextjs";

export default function Spotify() {
  const { user } = useUser();

  return (
    <div>
      <a
        href={`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}e&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-currently-playing+user-top-read`}
      >
        Login with Spotify
      </a>
    </div>
  );
}
