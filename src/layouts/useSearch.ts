interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

import { useState, useMemo } from "react";

export const useSearch = (students: Student[]) => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => students.filter((s) => s.name.includes(query)),
    [students, query]
  );

  return { query, setQuery, filtered };
};
