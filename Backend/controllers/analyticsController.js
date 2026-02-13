const analyticsService =
  require("../services/analyticsService");

exports.getMyAnalytics = async (req, res) => {
  try {

    const data =
      await analyticsService.getStudentAnalytics(
        req.user.id
      );

    res.json(data);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getTeacherAnalytics = async (req, res) => {
  try {

    const data =
      await analyticsService.getTeacherAnalytics(
        req.params.examId
      );

    res.json(data);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
