const Answer = require("../models/Answer");

exports.getStudentAnalytics = async (studentId) => {
  const answers = await Answer.find({ studentId });

  if (answers.length === 0)
    return {
      totalAttempts: 0,
      averageScore: 0,
      conceptMastery: {},
      weakConcepts: []
    };

  let totalScore = 0;
  let conceptStats = {};

  answers.forEach((a) => {
    const finalScore = a.isOverridden
      ? a.teacherFinalScore
      : (a.hybridFinalScore || a.aiFinalScore || 0);

    totalScore += finalScore;

    if (a.coveredConcepts && Array.isArray(a.coveredConcepts)) {
      a.coveredConcepts.forEach((concept) => {
        conceptStats[concept] = (conceptStats[concept] || 0) + 1;
      });
    }
  });

  const averageScore = Math.round(totalScore / answers.length);

  const weakConcepts = Object.entries(conceptStats)
    .filter(([_, count]) => count < 2)
    .map(([concept]) => concept);

  return {
    totalAttempts: answers.length,
    averageScore,
    conceptMastery: conceptStats,
    weakConcepts
  };
};

exports.getTeacherAnalytics = async (examId) => {
  const answers = await Answer.find({ examId }).populate("questionId", "totalMarks");

  const scoreRanges = ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"];

  if (answers.length === 0) {
    return {
      totalStudents: 0,
      averageScore: 0,
      classAverage: 0,
      highestScore: 0,
      scoreRanges,
      scoreCounts: [0, 0, 0, 0, 0],
      trendLabels: [],
      trendValues: [],
      difficultyIndex: {},
      mostMissedConcepts: []
    };
  }

  let totalScore = 0;
  let highestScore = 0;
  let questionStats = {};
  let conceptMissStats = {};
  const scoreCounts = [0, 0, 0, 0, 0];

  answers.forEach((a, idx) => {
    const finalScore = a.isOverridden
      ? a.teacherFinalScore
      : (a.hybridFinalScore || a.aiFinalScore || 0);

    totalScore += finalScore;
    if (finalScore > highestScore) highestScore = finalScore;

    const totalMarks = a.questionId?.totalMarks || 100;
    const percentage = totalMarks > 0 ? (finalScore / totalMarks) * 100 : 0;

    if (percentage <= 20) scoreCounts[0]++;
    else if (percentage <= 40) scoreCounts[1]++;
    else if (percentage <= 60) scoreCounts[2]++;
    else if (percentage <= 80) scoreCounts[3]++;
    else scoreCounts[4]++;

    if (a.questionId) {
      const qKey = a.questionId._id ? a.questionId._id.toString() : a.questionId.toString();
      questionStats[qKey] = questionStats[qKey] || { totalScore: 0, count: 0 };
      questionStats[qKey].totalScore += finalScore;
      questionStats[qKey].count += 1;
    }

    if (a.missingConcepts && Array.isArray(a.missingConcepts)) {
      a.missingConcepts.forEach((concept) => {
        conceptMissStats[concept] = (conceptMissStats[concept] || 0) + 1;
      });
    }
  });

  const classAverage = Math.round(totalScore / answers.length);

  const difficultyIndex = {};
  Object.keys(questionStats).forEach((qId) => {
    const data = questionStats[qId];
    const avg = data.count > 0 ? data.totalScore / data.count : 0;
    difficultyIndex[qId] = avg < 40 ? "Hard" : avg < 70 ? "Medium" : "Easy";
  });

  const mostMissedConcepts = Object.entries(conceptMissStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map((entry) => entry[0]);

  // Compute trend labels and values (e.g. per-submission or average trend)
  const trendLabels = answers.map((_, i) => `Sub #${i + 1}`);
  let runningSum = 0;
  const trendValues = answers.map((a, i) => {
    const score = a.isOverridden
      ? a.teacherFinalScore
      : (a.hybridFinalScore || a.aiFinalScore || 0);
    runningSum += score;
    return Math.round(runningSum / (i + 1));
  });

  return {
    totalStudents: answers.length,
    averageScore: classAverage,
    classAverage,
    highestScore,
    scoreRanges,
    scoreCounts,
    trendLabels,
    trendValues,
    difficultyIndex,
    mostMissedConcepts
  };
};

exports.getSystemAnalytics = async () => {
  const User = require("../models/User");
  const Exam = require("../models/Exam");

  const studentCount = await User.countDocuments({ role: "student" });
  const teacherCount = await User.countDocuments({ role: "teacher" });
  const totalExams = await Exam.countDocuments();
  const liveSessions = Math.floor(Math.random() * 5) + 1;
  const avgPassRate = 76;

  return {
    studentCount,
    teacherCount,
    totalExams,
    liveSessions,
    avgPassRate
  };
};
