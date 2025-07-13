export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Write a magical story for kids about: ${prompt}` }],
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  res.status(200).json({ story: data.choices[0].message.content });
}
