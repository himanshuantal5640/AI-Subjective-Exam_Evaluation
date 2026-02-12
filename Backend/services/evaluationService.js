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
