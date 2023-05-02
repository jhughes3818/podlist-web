import { clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  // Get the user id from the request
  const { id } = req.query;

  // Get the user from clerk
  const user = await clerkClient.users.getUser(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  console.log(user.profileImageUrl);

  // Return profileImageURL
  res.status(200).json({ name: user.fullname, avatar: user.profileImageUrl });
}
