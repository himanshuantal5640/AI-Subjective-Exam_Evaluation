exports.analyzeConceptCoverage = (answerText, concepts) => {
  const normalizedAnswer = answerText.toLowerCase();

  let covered = [];
  let missing = [];

  concepts.forEach(concept => {
    if (normalizedAnswer.includes(concept.name.toLowerCase())) {
      covered.push(concept.name);
    } else {
      missing.push(concept.name);
    }
  });

  const coverageScore =
    concepts.length > 0
      ? Math.round((covered.length / concepts.length) * 100)
      : 0;

  return {
    coveredConcepts: covered,
    missingConcepts: missing,
    coverageScore
  };
};

exports.calculateRubricScore = (answerText, rubric) => {
  const normalized = answerText.toLowerCase();
  let totalScore = 0;

  rubric.forEach(item => {
    if (normalized.includes(item.concept.toLowerCase())) {
      totalScore += item.marks;
    }
  });

  return totalScore;
};

exports.calculateQualityScore = (answerText) => {
  let score = 0;

  const words = answerText.split(" ").length;
  const sentences = answerText.split(".").length;

  // Length check
  if (words > 50) score += 2;

  // Structure check
  if (sentences > 2) score += 2;

  // Explanation depth
  const depthKeywords = ["because", "therefore", "hence", "thus"];
  if (depthKeywords.some(word => answerText.toLowerCase().includes(word)))
    score += 2;

  // Example presence
  const exampleKeywords = ["for example", "e.g", "such as"];
  if (exampleKeywords.some(word => answerText.toLowerCase().includes(word)))
    score += 2;

  return score;
};


exports.calculateFinalScore = (rubricScore, coverageScore, qualityScore) => {
  return Math.round(
    (rubricScore * 0.5) +
    (coverageScore * 0.3) +
    (qualityScore * 0.2)
  );
};

exports.calculateConfidence = (coverageScore) => {
  if (coverageScore > 70) return "High";
  if (coverageScore >= 40) return "Medium";
  return "Low";
};

exports.generateFeedback = (
  coveredConcepts,
  missingConcepts,
  qualityScore
) => {
  let feedback = "";

  if (coveredConcepts.length > 0)
    feedback += `Good coverage of: ${coveredConcepts.join(", ")}. `;

  if (missingConcepts.length > 0)
    feedback += `Missing concepts: ${missingConcepts.join(", ")}. `;

  if (qualityScore > 4)
    feedback += "Well structured explanation. ";
  else
    feedback += "Answer lacks structural clarity. ";

  return feedback.trim();
};
