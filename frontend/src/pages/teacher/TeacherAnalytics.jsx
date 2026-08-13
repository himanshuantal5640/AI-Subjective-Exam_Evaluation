import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeacherAnalytics } from "../../services/teacherService";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function TeacherAnalytics() {
  const { examId } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) return;

    getTeacherAnalytics(examId)
      .then((res) => {
        setAnalytics(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [examId]);

  if (loading) {
    return (
      <div className="text-green-400 text-lg font-semibold">
        Loading analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-red-400 text-lg">
        No analytics data found.
      </div>
    );
  }

  // -------- BAR CHART (Score Distribution) --------
  const scoreDistributionData = {
    labels: analytics.scoreRanges || [],
    datasets: [
      {
        label: "Students",
        data: analytics.scoreCounts || [],
        backgroundColor: "rgba(34,197,94,0.7)",
        borderRadius: 6,
      },
    ],
  };

  // -------- LINE CHART (Average Trends) --------
  const averageTrendData = {
    labels: analytics.trendLabels || [],
    datasets: [
      {
        label: "Average Score",
        data: analytics.trendValues || [],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-green-400">
          Exam Analytics
        </h2>
        <p className="text-gray-400 text-sm">
          Performance overview & score insights
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">
            Total Students
          </h4>
          <p className="text-3xl font-bold text-green-400">
            {analytics.totalStudents}
          </p>
        </div>

        <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">
            Average Score
          </h4>
          <p className="text-3xl font-bold text-green-400">
            {analytics.averageScore}
          </p>
        </div>

        <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">
          <h4 className="text-gray-400 text-sm mb-2">
            Highest Score
          </h4>
          <p className="text-3xl font-bold text-green-400">
            {analytics.highestScore}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">

        {/* Score Distribution */}
        <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Score Distribution
          </h3>
          <Bar data={scoreDistributionData} />
        </div>

        {/* Trend Chart */}
        <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Performance Trend
          </h3>
          <Line data={averageTrendData} />
        </div>

      </div>

    </div>
  );
}