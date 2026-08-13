import API from "./api";

export const getMyResults = () =>
  API.get("/answers/my-results");

export const getExamAnswers = (examId) =>
  API.get(`/answers/${examId}`);