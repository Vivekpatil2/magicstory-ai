import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Write a short story for kids about: ${prompt}`,
        },
      ],
    });

    const story = completion.choices[0].message.content;
    res.status(200).json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ message: 'Failed to generate story', error });
  }
}
