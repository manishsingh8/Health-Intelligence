import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

dotenv.config();

// Initialize Genkit
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call Gemini
    const result = await ai.generate({
      model: "googleai/gemini-1.5-flash",
      prompt,
    });

    const text = result.text();

    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
