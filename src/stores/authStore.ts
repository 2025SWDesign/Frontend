import { create } from "zustand";

export type RoleType = "STUDENT" | "TEACHER" | "PARENT";

interface AuthState {
  role: RoleType;
  isHomeroom: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  schoolId: number;
  classId: number;
  schoolName: string;
  userName: string;
  grade: number;
  gradeClass: number;
  setUserName: (name: string) => void;
  setSchoolName: (name: string) => void;
  setRole: (role: RoleType) => void;
  setIsHomeroom: (value: boolean) => void;
  setAuthTokens: (access: string, refresh: string) => void;
  setSchoolAndClass: (schoolId: number, classId: number) => void;
  setGradeAndClass: (grade: number, gradeClass: number) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: "TEACHER",
  isHomeroom: false,
  accessToken: sessionStorage.getItem("accessToken"),
  refreshToken: sessionStorage.getItem("refreshToken"),
  schoolId: Number(sessionStorage.getItem("schoolId")) || 0,
  classId: Number(sessionStorage.getItem("classId")) || 0,
  schoolName: "",
  userName: "",
  grade: 0,
  gradeClass: 0,

  setUserName: (userName) => set({ userName }),
  setSchoolName: (schoolName) => set({ schoolName }),
  setRole: (role) => set({ role }),
  setIsHomeroom: (value) => set({ isHomeroom: value }),
  setAuthTokens: (accessToken, refreshToken) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);
    set({ accessToken, refreshToken });
  },
  setSchoolAndClass: (schoolId, classId) => set({ schoolId, classId }),
  setGradeAndClass: (grade, gradeClass) => set({ grade, gradeClass }),
  resetAuth: () => {
    sessionStorage.clear();
    set({
      role: "TEACHER",
      isHomeroom: false,
      accessToken: null,
      refreshToken: null,
      schoolId: 0,
      classId: 0,
    });
  },
}));
