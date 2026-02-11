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
