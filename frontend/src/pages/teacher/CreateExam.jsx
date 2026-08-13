import React, { useState } from "react";
import { createExam } from "../../services/teacherService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { BookOpen, Clock, Award, PenTool, Layout, CheckCircle, Plus, Trash2, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateExam() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    duration: "60",
    totalMarks: "100",
    deadline: "",
    questions: [{ text: "", totalMarks: 10 }]
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].text = value;
    setForm({ ...form, questions: newQuestions });
  };

  const handleQuestionMarksChange = (index, value) => {
    const newQuestions = [...form.questions];
    newQuestions[index].totalMarks = parseInt(value) || 0;
    setForm({ ...form, questions: newQuestions });
  };

  const addQuestion = () => {
    setForm({
      ...form,
      questions: [...form.questions, { text: "", totalMarks: 10 }]
    });
  };

  const removeQuestion = (index) => {
    if (form.questions.length === 1) return toast.error("At least one question is required");
    const newQuestions = form.questions.filter((_, i) => i !== index);
    setForm({ ...form, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject || !form.duration || !form.totalMarks || !form.deadline) {
      return toast.error("All basic fields including Deadline are mandatory");
    }

    const invalidQuestion = form.questions.find(q => !q.text.trim());
    if (invalidQuestion) {
      return toast.error("All questions must have text");
    }

    try {
      setLoading(true);
      await createExam(form);
      toast.success("Examination Node Deployed!");
      navigate('/teacher/manage'); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Deployment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center gap-6 mb-12">
        <div className={`p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 shadow-xl shadow-emerald-500/10`}>
          <PenTool size={32} />
        </div>
        <div>
          <h1 className={`text-3xl md:text-4xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Initialize Assessment
          </h1>
          <p className={`text-sm font-['JetBrains_Mono'] ${darkMode ? 'text-emerald-500/40' : 'text-gray-500'} mt-2 uppercase tracking-widest`}>
            Deploying Hybrid AI Evaluation Protocols
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className={`grid grid-cols-1 lg:grid-cols-4 gap-10`}>
          {/* Config Section */}
          <div className={`lg:col-span-1 space-y-8`}>
            <div className={`${
              darkMode ? 'bg-[#08150f]/80 border-emerald-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'
            } backdrop-blur-xl border rounded-[32px] p-8 transition-all`}>
              <h2 className={`text-xs font-bold uppercase tracking-[2px] ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} mb-8 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'} pb-6 font-['Orbitron']`}>
                Node Config
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-[3px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block font-['JetBrains_Mono']`}>
                    Title
                  </label>
                  <div className="relative">
                    <Layout className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-emerald-500/20' : 'text-gray-400'}`} size={16} />
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Quantum Theory"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none font-['JetBrains_Mono'] ${
                        darkMode ? 'bg-black/40 border-emerald-500/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-bold uppercase tracking-[3px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block font-['JetBrains_Mono']`}>
                    Subject
                  </label>
                  <div className="relative">
                    <BookOpen className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-emerald-500/20' : 'text-gray-400'}`} size={16} />
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Physics"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all outline-none font-['JetBrains_Mono'] ${
                        darkMode ? 'bg-black/40 border-emerald-500/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                   <label className={`text-[10px] font-bold uppercase tracking-[3px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block font-['JetBrains_Mono']`}>
                     Deadline
                   </label>
                   <div className="relative">
                     <Clock className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-emerald-500/20' : 'text-gray-400'}`} size={16} />
                     <input
                       name="deadline"
                       type="datetime-local"
                       value={form.deadline}
                       onChange={handleChange}
                       className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs transition-all outline-none font-['JetBrains_Mono'] ${
                         darkMode ? 'bg-black/40 border-emerald-500/10 text-white focus:border-emerald-500/50 [color-scheme:dark]' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                       }`}
                     />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block font-['JetBrains_Mono']`}>
                      Min
                    </label>
                    <input
                      name="duration"
                      type="number"
                      value={form.duration}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none font-['JetBrains_Mono'] ${
                        darkMode ? 'bg-black/40 border-emerald-500/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block font-['JetBrains_Mono']`}>
                      Marks
                    </label>
                    <input
                      name="totalMarks"
                      type="number"
                      value={form.totalMarks}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none font-['JetBrains_Mono'] ${
                        darkMode ? 'bg-black/40 border-emerald-500/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                       }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-[24px] font-bold uppercase tracking-[3px] text-xs transition-all shadow-2xl active:scale-95 font-['Orbitron'] ${
                loading 
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20'
              }`}
            >
              {loading ? "Transmitting..." : "Initialize Node"}
            </button>
          </div>

          {/* Questions Section */}
          <div className={`lg:col-span-3 space-y-8`}>
            <div className={`${
              darkMode ? 'bg-[#08150f]/80 border-emerald-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'
            } backdrop-blur-xl border rounded-[40px] p-10 transition-all`}>
              <div className="flex justify-between items-center mb-10 border-b dark:border-white/5 pb-6">
                <h2 className={`font-bold font-['Orbitron'] flex items-center gap-3 tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <HelpCircle size={24} className="text-emerald-500" /> Structure Grid
                </h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all font-['JetBrains_Mono'] ${
                    darkMode ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                  }`}
                >
                  <Plus size={16} /> Add Logic Node
                </button>
              </div>

              <div className="space-y-8">
                {form.questions.map((q, index) => (
                  <div key={index} className={`p-8 rounded-[32px] border transition-all duration-500 hover:scale-[1.01] ${
                    darkMode ? 'bg-black/20 border-white/5 hover:border-emerald-500/30 shadow-inner' : 'bg-white border-gray-100 hover:border-emerald-200'
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                         <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold font-['Orbitron'] text-xs">
                          {index + 1}
                         </span>
                         <span className={`text-[10px] uppercase tracking-[3px] font-bold ${darkMode ? 'text-gray-600' : 'text-gray-400'} font-['JetBrains_Mono']`}>
                          Question Profile
                         </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-gray-500 hover:text-red-500 transition-all hover:rotate-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <textarea
                        value={q.text}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        placeholder="Define the subjective challenge..."
                        className={`w-full p-6 rounded-2xl border text-sm transition-all outline-none resize-none h-32 font-['JetBrains_Mono'] ${
                          darkMode ? 'bg-black/40 border-white/5 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-emerald-500'
                        }`}
                      />
                      <div className="flex items-center gap-4">
                        <Award size={16} className="text-emerald-500" />
                        <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-['JetBrains_Mono']`}>
                          Weighted Score:
                        </label>
                        <input
                          type="number"
                          value={q.totalMarks}
                          onChange={(e) => handleQuestionMarksChange(index, e.target.value)}
                          className={`w-28 px-4 py-2 rounded-xl border text-sm transition-all outline-none font-['JetBrains_Mono'] ${
                            darkMode ? 'bg-black/40 border-white/5 text-white focus:border-emerald-500/50' : 'bg-white border-gray-200 text-gray-900 focus:border-emerald-500'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}