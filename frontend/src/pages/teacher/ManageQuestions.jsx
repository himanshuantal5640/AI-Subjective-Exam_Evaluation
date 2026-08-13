import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestions, addQuestion } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function ManageQuestions() {
    const { examId } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // New Question Form State
    const [form, setForm] = useState({
        text: "",
        totalMarks: "",
        rubric: [{ concept: "", marks: "" }],
        concepts: [{ name: "" }]
    });

    useEffect(() => {
        fetchQuestions();
    }, [examId]);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const { data } = await getQuestions(examId);
            // Assuming data might be { questions: [...] } or just an array
            setQuestions(Array.isArray(data) ? data : data.questions || []);
        } catch (err) {
            toast.error("Failed to load questions");
        } finally {
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Rubric Handlers
    const handleRubricChange = (index, field, value) => {
        const updatedRubric = [...form.rubric];
        updatedRubric[index][field] = value;
        setForm({ ...form, rubric: updatedRubric });
    };
    const addRubricRow = () => {
        setForm({ ...form, rubric: [...form.rubric, { concept: "", marks: "" }] });
    };
    const removeRubricRow = (index) => {
        const updatedRubric = form.rubric.filter((_, i) => i !== index);
        setForm({ ...form, rubric: updatedRubric });
    };

    // Concepts Handlers
    const handleConceptChange = (index, value) => {
        const updatedConcepts = [...form.concepts];
        updatedConcepts[index].name = value;
        setForm({ ...form, concepts: updatedConcepts });
    };
    const addConceptRow = () => {
        setForm({ ...form, concepts: [...form.concepts, { name: "" }] });
    };
    const removeConceptRow = (index) => {
        const updatedConcepts = form.concepts.filter((_, i) => i !== index);
        setForm({ ...form, concepts: updatedConcepts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.text || !form.totalMarks) {
            return toast.error("Question text and total marks are required");
        }

        try {
            const payload = {
                examId,
                text: form.text,
                totalMarks: Number(form.totalMarks),
                rubric: form.rubric.map(r => ({ ...r, marks: Number(r.marks) })),
                concepts: form.concepts
            };

            await addQuestion(payload);
            toast.success("Question Added Successfully");

            // Reset form
            setForm({
                text: "",
                totalMarks: "",
                rubric: [{ concept: "", marks: "" }],
                concepts: [{ name: "" }]
            });

            // Refresh list
            fetchQuestions();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add question");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Top Section: Header & List */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-400">Manage Questions</h2>
                <button
                    onClick={() => navigate("/teacher/manage")}
                    className="text-gray-400 hover:text-white transition"
                    type="button"
                >
                    ← Back to Exams
                </button>
            </div>

            <div className="bg-[#07100a] rounded-xl border border-green-500/10 p-6">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Existing Questions</h3>

                {loading ? (
                    <p className="text-gray-500">Loading questions...</p>
                ) : questions.length === 0 ? (
                    <p className="text-gray-500">No questions added yet.</p>
                ) : (
                    <div className="space-y-4">
                        {questions.map((q, idx) => (
                            <div key={q._id || idx} className="p-4 border border-gray-700/50 rounded-lg bg-[#0b1610]">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-semibold text-gray-200">Q{idx + 1}. {q.text}</span>
                                    <span className="text-green-500 text-sm font-medium">{q.totalMarks} Marks</span>
                                </div>

                                {q.rubric && q.rubric.length > 0 && (
                                    <div className="mt-3 text-sm text-gray-400">
                                        <strong className="text-gray-300">Rubric:</strong>
                                        <ul className="list-disc list-inside mt-1">
                                            {q.rubric.map((r, i) => (
                                                <li key={i}>{r.concept} ({r.marks}m)</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {q.concepts && q.concepts.length > 0 && (
                                    <div className="mt-3 text-sm text-gray-400">
                                        <strong className="text-gray-300">Concepts:</strong>
                                        <div className="flex gap-2 mt-1 flex-wrap">
                                            {q.concepts.map((c, i) => (
                                                <span key={i} className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded">
                                                    {c.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Section: Add Question Form */}
            <div className="bg-[#07100a] rounded-xl border border-green-500/10 p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-6">Add New Question</h3>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Question Text</label>
                            <textarea
                                name="text"
                                value={form.text}
                                onChange={handleFormChange}
                                placeholder="Enter question text"
                                rows="3"
                                className="w-full p-3 rounded-lg bg-white dark:bg-[#062015]
                border border-gray-300 dark:border-green-500/20 text-gray-900 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Total Marks</label>
                            <input
                                type="number"
                                name="totalMarks"
                                value={form.totalMarks}
                                onChange={handleFormChange}
                                placeholder="e.g. 10"
                                min="1"
                                className="w-full p-3 rounded-lg bg-white dark:bg-[#062015]
                border border-gray-300 dark:border-green-500/20 text-gray-900 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <hr className="border-gray-700/50" />

                    {/* Rubric Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-300">Rubric for Evaluation</label>
                            <button
                                type="button"
                                onClick={addRubricRow}
                                className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded hover:bg-green-600/40 transition"
                            >
                                + Add Rubric Item
                            </button>
                        </div>

                        <div className="space-y-3">
                            {form.rubric.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        placeholder="Concept/Criteria (e.g. Code syntax, Logic)"
                                        value={item.concept}
                                        onChange={(e) => handleRubricChange(index, "concept", e.target.value)}
                                        className="flex-1 p-2 text-sm rounded-lg bg-white dark:bg-[#062015]
                    border border-gray-300 dark:border-green-500/20 text-gray-900 dark:text-white"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Marks"
                                        value={item.marks}
                                        onChange={(e) => handleRubricChange(index, "marks", e.target.value)}
                                        className="w-24 p-2 text-sm rounded-lg bg-white dark:bg-[#062015]
                    border border-gray-300 dark:border-green-500/20 text-gray-900 dark:text-white"
                                        required
                                    />
                                    {form.rubric.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRubricRow(index)}
                                            className="p-2 text-red-500 hover:text-red-400 transition"
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-700/50" />

                    {/* Concepts Section */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-300">Concepts Covered</label>
                            <button
                                type="button"
                                onClick={addConceptRow}
                                className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded hover:bg-green-600/40 transition"
                            >
                                + Add Concept
                            </button>
                        </div>

                        <div className="space-y-3">
                            {form.concepts.map((concept, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input
                                        placeholder="Concept name (e.g. Arrays, React Hooks)"
                                        value={concept.name}
                                        onChange={(e) => handleConceptChange(index, e.target.value)}
                                        className="flex-1 p-2 text-sm rounded-lg bg-white dark:bg-[#062015]
                    border border-gray-300 dark:border-green-500/20 text-gray-900 dark:text-white"
                                        required
                                    />
                                    {form.concepts.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeConceptRow(index)}
                                            className="p-2 text-red-500 hover:text-red-400 transition"
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg transition"
                    >
                        Save Question
                    </button>

                </form>
            </div>

        </div>
    );
}
