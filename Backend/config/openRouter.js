const axios = require("axios");

exports.evaluateWithAI = async (
  question,
  rubric,
  answerText,
  totalMarks
) => {

  const prompt = `
You are a strict academic evaluator.

You must grade the student's answer based strictly on:
1. Concept correctness
2. Logical explanation
3. Completeness
4. Alignment with rubric
5. Depth of understanding

--------------------------------
QUESTION:
${question}

--------------------------------
RUBRIC:
${JSON.stringify(rubric, null, 2)}

--------------------------------
STUDENT ANSWER:
${answerText}

--------------------------------
TOTAL MARKS: ${totalMarks}

--------------------------------

Evaluation Instructions:

- Follow the rubric strictly.
- Award marks proportionally.
- Do NOT give full marks unless answer is complete and accurate.
- Deduct marks for:
  • Missing concepts
  • Logical errors
  • Incomplete explanation
  • Irrelevant content
- Be strict but fair.
- Maximum score must not exceed TOTAL MARKS.
- If answer is irrelevant, give score 0.

Return ONLY valid JSON in this format:

{
  "score": number,
  "confidence": "Low | Medium | High",
  "feedback": "Concise academic feedback explaining strengths and weaknesses"
}
`;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo",
      temperature: 0.2, // Lower randomness
      messages: [
        { role: "user", content: prompt }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const content =
    response.data.choices[0].message.content.trim();

  return JSON.parse(content);
};
