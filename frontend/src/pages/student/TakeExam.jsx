import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { 
  Clock, 
  Send, 
  AlertTriangle, 
  BookOpen, 
  ArrowLeft, 
  Terminal,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function TakeExam() {
    const { examId } = useParams();
    const navigate = useNavigate();
    const { darkMode } = useTheme();

    const [questions, setQuestions] = useState([]);
    const [examInfo, setExamInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        fetchData();
    }, [examId]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [qRes, eRes] = await Promise.all([
               API.get(`/questions/${examId}`),
               API.get(`/exams/${examId}`)
            ]);
            
            const qData = Array.isArray(qRes.data) ? qRes.data : qRes.data.questions || [];
            setQuestions(qData);
            setExamInfo(eRes.data);
            
            if (eRes.data.duration) {
               setTimeLeft(eRes.data.duration * 60);
            }
        } catch (err) {
            toast.error("Failed to initialize assessment node");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (questionId, text) => {
        setAnswers({ ...answers, [questionId]: text });
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length === 0) {
            return toast.error("Deployment requires at least one data packet (answer).");
        }

        try {
            setSubmitting(true);
            const promises = Object.keys(answers).map(questionId => {
                return API.post("/answers/submit", {
                    examId,
                    questionId,
                    answerText: answers[questionId]
                });
            });

            await Promise.all(promises);
            toast.success("Data Transmitted Successfully!");
            navigate("/student/results");
        } catch (err) {
            toast.error(err.response?.data?.message || "Transmission Failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen space-y-6 font-['JetBrains_Mono']">
             <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-[10px] uppercase tracking-[4px] font-black text-blue-500 animate-pulse">Establishing Secure Uplink...</p>
          </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center font-['Orbitron']">
                <AlertTriangle size={64} className="text-amber-500 mb-6 animate-bounce" />
                <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tighter">Empty Assessment Node</h2>
                <p className="text-xs text-gray-500 mb-10 font-['JetBrains_Mono']">No questions found in this sector.</p>
                <button
                    onClick={() => navigate("/student/exams")}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all active:scale-95"
                >
                    <ArrowLeft size={16} /> Return to Registry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10 animate-in fade-in duration-700 font-['JetBrains_Mono']">
            {/* HUD Header */}
            <div className={`sticky top-6 z-40 flex flex-col md:flex-row justify-between items-center gap-6 p-8 rounded-[32px] border ${darkMode ? 'bg-[#0a111b]/90 border-blue-500/20 shadow-2xl shadow-blue-900/40' : 'bg-white/90 border-blue-100 shadow-xl'} backdrop-blur-xl transition-all`}>
                <div className="flex items-center gap-6">
                   <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
                      <Terminal size={24} className="text-white" />
                   </div>
                   <div>
                      <h2 className={`text-2xl font-black font-['Orbitron'] ${darkMode ? 'text-white' : 'text-blue-900'} tracking-tight`}>
                         {examInfo?.title || 'ASSESSMENT_NODE'}
                      </h2>
                      <div className="flex items-center gap-4 mt-1">
                         <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest">Protocol: {examInfo?.subject}</span>
                         <div className="w-1 h-1 rounded-full bg-blue-500/20"></div>
                         <span className="text-[9px] font-black text-blue-500/60 uppercase tracking-widest">{questions.length} Linked Nodes</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-8">
                   <div className="text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 mb-1">Time Latency</p>
                      <div className={`text-3xl font-black font-['Orbitron'] ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
                         {formatTime(timeLeft)}
                      </div>
                   </div>
                   <button
                       onClick={() => navigate("/student/exams")}
                       className="p-3 text-gray-500 hover:text-red-500 transition-colors hover:bg-red-500/10 rounded-xl"
                   >
                       <AlertTriangle size={20} />
                   </button>
                </div>
            </div>

            {/* Questions Mesh */}
            <div className="space-y-12">
                {questions.map((q, idx) => (
                    <div key={q._id} className={`group relative p-10 rounded-[40px] border transition-all duration-500 ${
                        darkMode ? 'bg-[#0d1825]/60 border-blue-500/10 hover:border-blue-500/30 shadow-inner' : 'bg-white border-blue-100 shadow-lg'
                    }`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-blue-500/15 transition-all duration-700"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                            <div className="flex gap-6">
                               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold font-['Orbitron'] text-xl">
                                  {idx + 1}
                               </div>
                               <h3 className={`text-lg font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-gray-900'} max-w-2xl`}>
                                   {q.text}
                               </h3>
                            </div>
                            <div className={`px-4 py-1.5 rounded-full ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'} text-[9px] font-black uppercase tracking-widest border border-blue-500/20 whitespace-nowrap`}>
                                Weighted: {q.totalMarks} PTS
                            </div>
                        </div>

                        <div className="relative group/input">
                           <div className="absolute top-4 left-4 text-blue-500/20 group-focus-within/input:text-blue-500/40 transition-colors">
                              <BookOpen size={20} />
                           </div>
                           <textarea
                               className={`w-full p-10 pl-14 rounded-[32px] border transition-all outline-none min-h-[250px] text-sm leading-relaxed ${
                                   darkMode ? 'bg-black/40 border-white/5 text-blue-100 focus:border-blue-500/50' : 'bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500 shadow-inner'
                               }`}
                               placeholder="Synthesize your response here..."
                               value={answers[q._id] || ""}
                               onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                           />
                           <div className="absolute bottom-4 right-6 flex items-center gap-2 opacity-20 text-[8px] font-black uppercase tracking-widest group-focus-within/input:opacity-60 transition-opacity">
                              <Zap size={10} className="text-blue-500" /> Auto-Sync Active
                           </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transmission Footer */}
            <div className="pt-10 pb-20">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`group/btn relative w-full py-6 rounded-[32px] font-black font-['Orbitron'] text-sm uppercase tracking-[4px] transition-all shadow-2xl active:scale-95 overflow-hidden ${
                        submitting 
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                            : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30"
                    }`}
                >
                    <div className="relative z-10 flex items-center justify-center gap-4">
                       {submitting ? (
                          <>
                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             Transmitting Packets...
                          </>
                       ) : (
                          <>
                             Commit To Neural Evaluation <Send size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
                          </>
                       )}
                    </div>
                    {!submitting && (
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    )}
                </button>
                <div className="mt-6 flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-widest text-blue-500/40">
                   <ShieldCheck size={14} /> End-to-End Encrypted Transmission
                </div>
            </div>
        </div>
    );
}
