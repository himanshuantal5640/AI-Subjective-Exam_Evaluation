import React from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "../layout/ThemeToggle";

export default function StudentTopbar({ setSidebarOpen }) {
  return (
    <header className="flex justify-between items-center 
    p-4 border-b dark:border-white/10 
    bg-white dark:bg-[#050c14]">

      <Menu
        className="md:hidden cursor-pointer"
        onClick={() => setSidebarOpen(true)}
      />

      <h1 className="font-semibold">
        Welcome Back 👋
      </h1>

      <ThemeToggle />
    </header>
  );
}