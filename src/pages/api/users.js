import supabase from "../../../utils/supabase";
import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  const users = await clerkClient.users.getUserList({
    limit: 100,
  });

  console.log(users.length);

  res.status(200).json(users);
}
