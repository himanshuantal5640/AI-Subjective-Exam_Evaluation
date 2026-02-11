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
