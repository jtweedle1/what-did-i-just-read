import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeText = async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: 'No inputText provided' });
    }

    const response = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `Rewrite the following in a casual, neurodiverse-friendly way that's easy to understand:\n\n"${inputText}"`
  });

    const summary = response.output[0].content[0].text;
    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};