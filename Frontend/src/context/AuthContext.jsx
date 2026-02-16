import React from "react";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const login = (role) => {
    setUser({ role });
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setUser({ role: savedRole });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
