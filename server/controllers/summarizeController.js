import OpenAI from 'openai';

console.log('Loaded OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const summarizeText = async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: 'No inputText provided' });
    }

    const prompt = `Rewrite the following in a casual, neurodiverse-friendly way that's easy to understand:\n\n"${inputText}"`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7, // Creative but still on-topic
    });

    const summary = response.data.choices[0].message.content; // choices[0] is the first result
    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
};