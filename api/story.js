import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Generate a short magical children's story based on this prompt: ${prompt}`,
        },
      ],
      max_tokens: 300,
    });

    const story = completion.choices[0].message.content;
    res.status(200).json({ story });
  } catch (error) {
    console.error("Error generating story:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
