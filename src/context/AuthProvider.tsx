import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  schoolId: string | null;
  classId: string | null;
}

export interface AuthContextType extends AuthState {
  setAuth: (auth: AuthState) => void;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem("refreshToken"));
  const [schoolId, setSchoolId] = useState(sessionStorage.getItem("schoolId"));
  const [classId, setClassId] = useState(sessionStorage.getItem("classId"));

  const setAuth = ({ accessToken, refreshToken, schoolId, classId }: AuthState) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setSchoolId(schoolId);
    setClassId(classId);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        schoolId,
        classId,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
