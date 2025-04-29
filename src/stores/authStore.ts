import { create } from "zustand";

export type RoleType = "STUDENT" | "TEACHER" | "PARENT";

interface StudentSummary {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface AuthState {
  role: RoleType;
  isHomeroom: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  schoolId: number;
  classId: number;
  schoolName: string;
  userName: string;
  classStudents: StudentSummary[];

  setUserName: (name: string) => void;
  setSchoolName: (name: string) => void;
  setRole: (role: RoleType) => void;
  setIsHomeroom: (value: boolean) => void;
  setAuthTokens: (access: string, refresh: string) => void;
  setSchoolAndClass: (schoolId: number, classId: number) => void;
  
  // 신규 액션: 반 학생 목록 설정
  setClassStudents: (students: StudentSummary[]) => void;
  clearClassStudents: () => void;

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
  classStudents: [],

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
  setClassStudents: (students) => set({ classStudents: students }),
  clearClassStudents: () => set({ classStudents: [] }),

  resetAuth: () => {
    sessionStorage.clear();
    set({
      role: "TEACHER",
      isHomeroom: false,
      accessToken: null,
      refreshToken: null,
      schoolId: 0,
      classId: 0,
      classStudents: [],
    });
  },
}));
