import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function extractMermaidGraph(text) {
  const regex = /```mermaid\s*([\s\S]*?)```/;
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

    const summary = summaryResponse.output[0].content[0].text;
    const rawDiagram = diagramResponse.output[0].content[0].text;
    const cleanedDiagram = extractMermaidGraph(rawDiagram)

    res.status(200).json({ summary, diagram: cleanedDiagram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate summary or diagram' });
  }
};