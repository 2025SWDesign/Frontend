import { create } from "zustand";

export interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface StudentStore {
  selectedStudent: Student | null;
  setSelectedStudent: (student: Student | null) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  selectedStudent: null,
  setSelectedStudent: (student) => set({ selectedStudent: student }),
}));
