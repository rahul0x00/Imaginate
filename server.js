import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/image", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.Image.create({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    // const image = aiResponse.data.data[0].url;
    const image = aiResponse["data"][0]["url"];

    // Send the image URL as a response
    res.json({ imageUrl: image });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      error?.response.data.error.message || "Something went wrong",
    );
  }
});

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  () => console.log(`Server is running on http://localhost:${PORT}/image`),
);
