import axios from "axios";
import Vibrant from "vibrant";

export default async function handler(req, res) {
  try {
    const { imageUrl } = req.query;

    // Fetch the image data
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(imageResponse.data, "binary");

    // Extract the dominant color from the image
    const palette = await Vibrant.from(imageBuffer).getPalette();
    const dominantColor = palette.Vibrant.hex;

    res.status(200).json({ color: dominantColor });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
