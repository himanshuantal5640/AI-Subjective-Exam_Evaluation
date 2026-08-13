import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { Users, UserPlus, CheckCircle, Search } from 'lucide-react';

export default function AdminAssignments() {
  const { darkMode } = useTheme();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/admin/users");
        setStudents(data.filter(u => u.role === 'student'));
        setTeachers(data.filter(u => u.role === 'teacher'));
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedStudent) return toast.error("Please select a student");
    if (selectedTeachers.length === 0) return toast.error("Please select at least one teacher");

    try {
      await API.post("/admin/assign", {
        studentId: selectedStudent._id,
        teacherIds: selectedTeachers
      });
      toast.success("Assignment updated successfully!");
      
      // Refresh local state if needed or clear selection
      setSelectedStudent(null);
      setSelectedTeachers([]);
    } catch (err) {
      toast.error(err.response?.data?.message || "Assignment failed");
    }
  };

  const toggleTeacher = (id) => {
    setSelectedTeachers(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center mt-20 font-['Orbitron'] text-indigo-500 animate-pulse">Loading Identity Grid...</div>;

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className={`text-[32px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-wider mb-2`}>
          Management Core
        </h1>
        <p className={`${darkMode ? 'text-indigo-400/50' : 'text-gray-500'} font-['JetBrains_Mono'] text-sm uppercase tracking-widest`}>
          Teacher-Student Neural Mapping
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Selection */}
        <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10' : 'bg-white border-gray-200'} backdrop-blur-md rounded-2xl border p-6 flex flex-col h-[600px]`}>
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-indigo-500" size={24} />
            <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select Student</h2>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search student..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border focus:outline-none focus:border-indigo-500 transition-all font-['JetBrains_Mono'] text-sm`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            {filteredStudents.map(student => (
              <div 
                key={student._id}
                onClick={() => {
                  setSelectedStudent(student);
                  setSelectedTeachers(student.assignedTeachers || []);
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedStudent?._id === student._id 
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                    : `${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{student.name}</p>
                    <p className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-['JetBrains_Mono']`}>{student.email}</p>
                  </div>
                  {selectedStudent?._id === student._id && <CheckCircle className="text-indigo-500" size={18} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teacher Assignment */}
        <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10' : 'bg-white border-gray-200'} backdrop-blur-md rounded-2xl border p-6 flex flex-col h-[600px]`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <UserPlus className="text-violet-500" size={24} />
              <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>Assign Teachers</h2>
            </div>
            {selectedStudent && (
              <button 
                onClick={handleAssign}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                Save Mapping
              </button>
            )}
          </div>

          {!selectedStudent ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
              <Users size={64} className="mb-4 text-indigo-500" />
              <p className={`font-['Orbitron'] text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>Select a student to authorize teacher mapping</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
              <p className={`text-[10px] font-bold tracking-[2px] uppercase ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4 px-2`}>
                Select Educators for {selectedStudent.name}
              </p>
              {teachers.map(teacher => (
                <div 
                  key={teacher._id}
                  onClick={() => toggleTeacher(teacher._id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                    selectedTeachers.includes(teacher._id)
                      ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_15px_rgba(139,92,246,0.2)]' 
                      : `${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold font-['Orbitron']`}>
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{teacher.name}</p>
                        <p className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-['JetBrains_Mono']`}>{teacher.email}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded border ${selectedTeachers.includes(teacher._id) ? 'bg-violet-500 border-violet-500' : 'border-gray-500'} flex items-center justify-center transition-all`}>
                      {selectedTeachers.includes(teacher._id) && <CheckCircle className="text-white" size={14} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
