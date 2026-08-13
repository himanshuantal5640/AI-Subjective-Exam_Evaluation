import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExamSubmissions, overrideScore, evaluateWithAI } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function ReviewAnswers() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // To handle manual grading states
  const [manualScores, setManualScores] = useState({});
  const [manualComments, setManualComments] = useState({});
  const [evaluating, setEvaluating] = useState({});

  useEffect(() => {
    fetchSubmissions();
  }, [examId]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await getExamSubmissions(examId);
      setSubmissions(res.data);
    } catch (err) {
      toast.error("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleManualGrade = async (answer) => {
    const newScore = manualScores[answer._id];
    const newComment = manualComments[answer._id] || "";

    if (newScore === undefined || newScore === "") {
      return toast.error("Please enter a valid score");
    }

    try {
      await overrideScore(answer._id, Number(newScore), newComment);
      toast.success("Score updated successfully!");
      fetchSubmissions(); // Refresh the list
    } catch (err) {
      toast.error("Failed to update score");
    }
  };

  const handleRunAIEval = async (answer) => {
    try {
      setEvaluating(prev => ({ ...prev, [answer._id]: true }));
      await evaluateWithAI(answer._id);
      toast.success("AI Evaluation complete!");
      fetchSubmissions();
    } catch (err) {
      toast.error("Failed to run AI evaluation");
    } finally {
      setEvaluating(prev => ({ ...prev, [answer._id]: false }));
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-400">Loading submissions...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-[#07100a] p-4 rounded-xl border border-green-500/10">
        <h2 className="text-2xl font-bold text-green-400">Review Submissions</h2>
        <button
          onClick={() => navigate("/teacher/manage")}
          className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition"
        >
          Back to Exams
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center p-10 bg-[#07100a] rounded-xl border border-green-500/10 text-gray-500">
          No submissions found for this exam yet.
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map(sub => (
            <div key={sub._id} className="bg-[#07100a] p-6 rounded-xl border border-green-500/10 shadow-lg">

              {/* Header Info */}
              <div className="flex justify-between items-start border-b border-green-500/10 pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-400">{sub.studentId?.name || "Unknown Student"}</h3>
                  <p className="text-sm text-gray-400">{sub.studentId?.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    {sub.finalScore} / {sub.questionId?.totalMarks || '?'} Marks
                  </div>
                  {sub.isOverridden && (
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Manually Graded</span>
                  )}
                </div>
              </div>

              {/* Question & Answer */}
              <div className="mb-6 space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 font-medium mb-1">Question</h4>
                  <p className="text-gray-200 bg-[#0b1610] p-3 rounded-lg border border-green-500/5">
                    {sub.questionId?.text || "Unknown Question"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 font-medium mb-1">Student's Answer</h4>
                  <p className="text-gray-300 bg-[#0b1610] p-4 rounded-lg border border-green-500/5 whitespace-pre-wrap">
                    {sub.answerText}
                  </p>
                </div>
              </div>

              {/* AI Feedback & Grading Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0b1610] p-4 rounded-xl border border-indigo-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-indigo-400 font-medium">AI Evaluation</h4>
                    <span className="text-sm font-bold text-indigo-300">{sub.aiSemanticScore} Marks</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">{sub.aiSemanticFeedback || "No AI feedback available."}</p>

                  <button
                    onClick={() => handleRunAIEval(sub)}
                    disabled={evaluating[sub._id]}
                    className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 rounded-lg text-sm transition disabled:opacity-50"
                  >
                    {evaluating[sub._id] ? "Evaluating..." : "Re-evaluate with AI"}
                  </button>
                </div>

                {/* Manual Grading Section */}
                <div className="bg-[#0b1610] p-4 rounded-xl border border-green-500/10">
                  <h4 className="text-green-400 font-medium mb-4">Manual Override</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Score</label>
                      <input
                        type="number"
                        min="0"
                        max={sub.questionId?.totalMarks || 100}
                        placeholder={sub.finalScore}
                        className="w-full bg-[#07100a] border border-green-500/20 rounded-lg px-3 py-2 text-white focus:border-green-500 outline-none"
                        value={manualScores[sub._id] !== undefined ? manualScores[sub._id] : ""}
                        onChange={(e) => setManualScores({ ...manualScores, [sub._id]: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Teacher Comment (Optional)</label>
                      <input
                        type="text"
                        placeholder="Great answer, but missed one point..."
                        className="w-full bg-[#07100a] border border-green-500/20 rounded-lg px-3 py-2 text-white focus:border-green-500 outline-none"
                        value={manualComments[sub._id] !== undefined ? manualComments[sub._id] : (sub.teacherComment || "")}
                        onChange={(e) => setManualComments({ ...manualComments, [sub._id]: e.target.value })}
                      />
                    </div>
                    <button
                      onClick={() => handleManualGrade(sub)}
                      className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition mt-2"
                    >
                      Save Manual Score
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}