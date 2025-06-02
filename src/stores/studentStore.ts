import { create } from "zustand";

export interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface StudentExtraInfo {
  email: string;
  phonenumber: string | null;
  homenumber: string | null;
  address: string | null;
}

interface StudentStore {
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;

  extraInfo: StudentExtraInfo | null;
  setExtraInfo: (info: StudentExtraInfo | null) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  selectedStudent: null,
  setSelectedStudent: (student) => set({ selectedStudent: student }),

  extraInfo: null,
  setExtraInfo: (info) => set({ extraInfo: info }),
}));
