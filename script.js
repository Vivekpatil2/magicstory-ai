export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing OpenAI API key" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Write a magical story for kids based on: ${prompt}` }],
        temperature: 0.8,
        max_tokens: 200
      })
    });

    const data = await response.json();

    const story = data.choices?.[0]?.message?.content || "No story generated.";
    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate story" });
  }
}
