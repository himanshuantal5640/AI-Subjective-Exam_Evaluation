import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentTopbar from "../components/student/StudentTopbar";
import ChatButton from "../components/student/ChatButton";
import StudentSidebar from "../components/layout/StudentSidebar";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-[#020408] text-gray-900 dark:text-white">

      <StudentSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    
      <div className="flex-1 flex flex-col">
        <StudentTopbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <ChatButton />
    </div>
  );
}