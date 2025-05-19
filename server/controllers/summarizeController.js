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
      input: `Convert the following text into a clear Mermaid.js flowchart using graph TD syntax.

- It should have a clear, purpose-driven scope: It answers a specific question or explains a specific process. It doesn’t try to cover everything—just the core idea or decision points. Title or introductory text clearly frames the goal (e.g. but not limited to this, "How to Evaluate Code Quality").
- It should have logical and minimal structure: It presents logical progression—each step flows naturally into the next. It uses as few elements as possible without losing meaning (ideally 3-7 primary steps). Decision points (Yes/No, True/False) are easy to follow without looping back endlessly.
- It should have concise and readable labels: Boxes use short, action-oriented phrases (e.g., "Check if code runs", not "Consider whether the code is functioning properly"). Avoids over-explaining; additional context can be placed outside the diagram if needed.
- It should have visually distinct elements: Shapes (e.g., rectangles for actions, diamonds for decisions) follow consistent meaning. Arrows point clearly in one direction without crossing over or looping awkwardly. Adequate spacing makes it easy to distinguish steps at a glance.
- It should have user-centered design: It should be designed for the intended reader which is a neurodiverse learner. It can optionally add examples or definitions if terms are unfamiliar.

Text:
"${inputText}"`
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