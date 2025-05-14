import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractMermaidGraph(text) {
  const regex = /```mermaid\s*([\s\S]*?)```/;
  const match = text.match(regex);
  return match ? match[1].trim() : text.trim();
}

function extractJson(text) {
  const regex = /```(?:json)?\s*([\s\S]*?)```/;
  const match = text.match(regex);
  return match ? match[1].trim() : text.trim();
}

export const summarizeText = async (req, res) => {
  try {
    const { inputText } = req.body;

    if (!inputText) {
      return res.status(400).json({ error: 'No inputText provided' });
    }

    const summaryResponse = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `Rewrite the following in a more casual neurodiverse-friendly way that's easy to understand but stays true to the original vocabulary used, explaining vocabulary in more depth if necessary for the purpose of being rewritten in a better way:\n\n"${inputText}"`
    });

    const diagramResponse = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `Convert the following content into a Mermaid.js flowchart using graph TD syntax. Only return valid Mermaid code. The flowchart should be presented in a casual, neurodiverse-friendly way that's easy to understand while staying true to the vocabulary used. Do not include any explanation or commentary:\n\n"${inputText}"`
    });

    const quizResponse = await client.responses.create({
      model: "gpt-3.5-turbo",
      input: `Generate a multiple-choice quiz based on the following text. Provide 1 to 10 questions depending on the content's complexity. Return JSON in this format:

      [
        {
          "question": "Question text?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "answer": "Option A"
        }
      ]

      Text:
      "${inputText}"`
    });

    let quiz;
    try {
      const cleanedQuizText = extractJson(quizResponse.output[0].content[0].text);
      quiz = JSON.parse(cleanedQuizText);
    } catch (e) {
      console.error('Quiz parsing failed:', e);
      quiz = [];
    }

    const summary = summaryResponse.output[0].content[0].text;
    const rawDiagram = diagramResponse.output[0].content[0].text;
    const cleanedDiagram = extractMermaidGraph(rawDiagram);

    res.status(200).json({ summary, diagram: cleanedDiagram, quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary or diagram' });
  }
};