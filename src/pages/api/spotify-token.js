import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../utils/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { userId } = req.body;

    const userId = "user_2NhYvntlxmPDdOSLHukmS1UNbUP";

    try {
      // Fetch refresh token from Supabase using the user ID
      const { data, error } = await supabase
        .from("profiles")
        .select("spotify_refresh_token")
        .eq("id", userId)
        .single();

      console.log(data, error);

      if (error) {
        throw new Error("Failed to retrieve refresh token from the database");
      }

      const refreshToken = data.spotify_refresh_token;

      // Make a POST request to Spotify API to obtain a new access token
      const response = await axios
        .post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
              ).toString("base64")}`,
            },
          }
        )
        .catch((error) => {
          console.log(error);
        });

      const accessToken = response.data.access_token;

      // Update the access token in the database
      const { data: updateData, error: updateError } = await supabase
        .from("profiles")
        .update({ spotify_refresh_token: response.data.refresh_token })
        .eq("id", userId);

      if (updateError) {
        console.log(updateError);
        throw new Error("Failed to update access token in the database");
      }

      // Send the access token in the response
      res
        .status(200)
        .json({ access_token: accessToken, refreshToken: refreshToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
