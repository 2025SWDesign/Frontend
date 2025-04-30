import React, { useCallback, useEffect, useState } from "react";
import RadarChart from "../temp/RadarChart";
import { useAuthStore } from "../stores/authStore";
import { useStudentStore } from "../stores/studentStore";
import axios from "../api/axiosInstance";

import {
  MainContainer,
  DropDown,
  Line,
  ToggleWrapper,
  ToggleButton,
  OptionButton,
  GradeContainer,
  ChartArea,
  TableArea,
  GradeTable,
  ChartTitle,
  ChartBox,
  DropdownBox,
  ScoreInput,
  EditButton,
  CancleButton,
  SaveButton,
  ButtonArea,
  GuideMessage,
  StudentsTableArea,
  StudentGradeTable
} from "./GradePage.styled";

interface GradeItem {
  subject?: string;
  semester?: string;
  score?: number;
}

interface StudentGrade {
  subject: string;
  score: number;
  schoolYear: number;
  semester: number;
  student: {
    studentId: number;
    user: {
      name: string;
    };
  };
}

interface GroupedStudent {
  name: string;
  scores: Record<string, number>;
}


const subjects = ["국어", "영어", "수학", "과학", "사회"];

const GradePage: React.FC = () => {
  const [isPeriod, setIsPeriod] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedSubject, setSelectedSubject] = useState("국어");
  const [isEditing, setIsEditing] = useState(false);
  
  const [studentGrades, setStudentGrades] = useState<GradeItem[]>([]);
  const [backupStudentGrades, setBackupStudentGrades] = useState<GradeItem[]>([]);
  const [initiallyFetchedGrades, setInitiallyFetchedGrades] = useState<StudentGrade[]>([]);
  const [classGrades, setClassGrades] = useState<StudentGrade[]>([]);

  const role = useAuthStore((state) => state.role);
  const isHomeroom = useAuthStore((state) => state.isHomeroom);
  const selectedStudent = useStudentStore((state) => state.selectedStudent);
  const schoolId = useAuthStore((state) => state.schoolId);

  const teacherGrade = useAuthStore((state) => state.grade);
  const teacherClass = useAuthStore((state) => state.gradeClass);
  
  const loadClassGrades =useCallback(async () => {
    try {
      if (isHomeroom) {
        const classId = Number(sessionStorage.getItem("classId"));
        const semester = `${selectedSemester}`;
        const response = await axios.get(`/school/${schoolId}/grades/class/${classId}?semester=${semester}`);
        setClassGrades(response.data.grades);
      }
    } catch (err) {
      console.error("반 학생 성적 조회 실패", err);
    }
  }, [isHomeroom, schoolId, selectedSemester]);

  const groupedByStudent = classGrades.reduce((acc: Record<number, GroupedStudent>, curr) => {
    const { student } = curr;
    const studentId = student.studentId;
    if (!acc[studentId]) {
      acc[studentId] = {
        name: curr.student.user.name,
        scores: {},
      };
    }
    acc[studentId].scores[curr.subject] = curr.score;
    return acc;
  }, {});

  const fetchStudentGrades = useCallback(async () => {
    if (!selectedStudent) return;
    try {
      const response = await axios.get(
        `/school/${schoolId}/grades/students/${selectedStudent.studentId}`,
        isPeriod
          ? { params: { schoolYear: selectedGrade, semester: selectedSemester } }
          : { params: { subject: selectedSubject } }
      );
      const serverGrades = response.data.grades as StudentGrade[];
      setInitiallyFetchedGrades(serverGrades);

      if (isPeriod) {
        const merged = subjects.map((subject) => {
          const found = serverGrades.find((g) => g.subject === subject);
          return {
            subject,
            score: found?.score, 
          };
        });
        
        setStudentGrades(merged);
      } else {
        const semesterOrder = [
          { schoolYear: 1, semester: 1 },
          { schoolYear: 1, semester: 2 },
          { schoolYear: 2, semester: 1 },
          { schoolYear: 2, semester: 2 },
          { schoolYear: 3, semester: 1 },
          { schoolYear: 3, semester: 2 },
        ];
        const merged = semesterOrder.map(({ schoolYear, semester }) => {
          const found = serverGrades.find(
            (g) => g.schoolYear === schoolYear && g.semester === semester
          );
          return {
            semester: `${schoolYear}학년 ${semester}학기`,
            score: found?.score,
          };
        });
        setStudentGrades(merged);
      }
    } catch (err) {
      console.error("성적 조회 실패", err);
    }
  }, [selectedGrade, selectedSemester, selectedSubject, isPeriod, selectedStudent, schoolId]);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentGrades();
    } else if (isHomeroom) {
      loadClassGrades();
    }
  }, [selectedStudent, selectedGrade, selectedSemester, selectedSubject, isPeriod, isHomeroom, fetchStudentGrades, loadClassGrades]);

  const handleEdit = () => {
    setBackupStudentGrades(JSON.parse(JSON.stringify(studentGrades)));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setStudentGrades(backupStudentGrades);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!selectedStudent) return;
  
    const patchPayload = [];
    const postPayload = [];
  
    for (const g of studentGrades) {
      if (isPeriod) {
        const found = initiallyFetchedGrades.find((f) => f.subject === g.subject);
        if (found) {
          if (found.score !== g.score && g.score !== undefined) {
            patchPayload.push({
              subject: g.subject!,
              schoolYear: Number(selectedGrade),
              semester: Number(selectedSemester),
              score: Number(g.score),
            });
          }
        } else {
          if (g.score !== undefined) {
            postPayload.push({
              subject: g.subject!,
              schoolYear: Number(selectedGrade),
              semester: Number(selectedSemester),
              score: Number(g.score),
            });
          }
        }
      } else {
        const found = initiallyFetchedGrades.find((f) => f.subject === selectedSubject && f.schoolYear === Number(g.semester?.[0]) && f.semester === Number(g.semester?.[4]));
        if (found) {
          if (found.score !== g.score && g.score !== undefined) {
            patchPayload.push({
              subject: selectedSubject,
              schoolYear: Number(g.semester?.[0]),
              semester: Number(g.semester?.[4]),
              score: Number(g.score),
            });
          }
        } else {
          if (g.score !== undefined) {
            postPayload.push({
              subject: selectedSubject,
              schoolYear: Number(g.semester?.[0]),
              semester: Number(g.semester?.[4]),
              score: Number(g.score),
            });
          }
        }
      }
    }
  
    try {
      if (postPayload.length > 0) {
        await axios.post(`/school/${schoolId}/grades/students/${selectedStudent.studentId}`, postPayload);
      }
      if (patchPayload.length > 0) {
        await axios.patch(`/school/${schoolId}/grades/students/${selectedStudent.studentId}`, patchPayload);
      }
      alert("성적 저장 완료");
      setIsEditing(false);
      fetchStudentGrades();
    } catch (err) {
      console.error("성적 저장 실패", err);
      alert("성적 저장 실패");
    }
  };  

  const handleScoreChange = (idx: number, value: string) => {
    const updated = [...studentGrades];
    updated[idx].score = value === "" ? undefined : Number(value);
    setStudentGrades(updated);
  };

  const radarSemesterData:{ name: string; value: number }[] = studentGrades.map((g) => ({
    name: (isPeriod ? g.subject : g.semester) ?? "N/A",
    value: g.score === undefined  ? 0 : Number(g.score),
  }));

  if (role === "TEACHER" && !isHomeroom && !selectedStudent) {
    return (
      <MainContainer>
        <h1>학생성적관리</h1>
        <Line />
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      </MainContainer>
    );
  }

  if (role === "TEACHER" && isHomeroom && !selectedStudent) {
    return (
      <MainContainer>
        <h1>학생성적관리</h1>
        <Line />
        <GradeContainer>
          <StudentsTableArea>
            <h2>{`${new Date().getFullYear()}학년도 ${selectedSemester}학기 성적 - ${teacherGrade}학년 ${teacherClass}반`}</h2>
            <StudentGradeTable>
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    {subjects.map((subj) => (<th key={subj}>{subj}</th>))}
                    <th>평균</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedByStudent).map(([studentId, { name, scores }]) => {
                    const subjectScores = subjects.map((subject) => scores[subject] ?? "-");
                    const validScores = subjectScores.filter((s) => typeof s === "number") as number[];
                    const average = validScores.length > 0
                      ? (validScores.reduce((sum, v) => sum + v, 0) / validScores.length).toFixed(1)
                      : "-";
                    return (
                      <tr key={studentId}>
                        <td>{name}</td>
                        {subjectScores.map((score, idx) => (<td key={idx}>{score}</td>))}
                        <td>{average}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </StudentGradeTable>
          </StudentsTableArea>
        </GradeContainer>
      </MainContainer>
    );
  }
  return (
    <MainContainer>
      <h1>학생성적관리</h1>
      <Line />
      <GradeContainer>
        <TableArea>
          <ToggleWrapper onClick={() => !isEditing && setIsPeriod(!isPeriod)}>
            <ToggleButton $isPeriod={isPeriod} />
            <OptionButton $isActive={isPeriod}>기간별</OptionButton>
            <OptionButton $isActive={!isPeriod}>과목별</OptionButton>
          </ToggleWrapper>
          <DropdownBox>
            {isPeriod ? (
              <>
                <DropDown value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)} disabled={isEditing}>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                </DropDown>
                <DropDown value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} disabled={isEditing} id="semester">
                  <option value="1">1학기</option>
                  <option value="2">2학기</option>
                </DropDown>
              </>
            ) : (
              <DropDown value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={isEditing}>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </DropDown>
            )}
          </DropdownBox>
          <GradeTable>
            <table>
              <thead>
                <tr>
                  <th>{isPeriod ? "과목" : "학기"}</th>
                  <th>성적</th>
                  <th>등급</th>
                </tr>
              </thead>
              <tbody>
                {studentGrades.map((g, idx) => (
                  <tr key={idx}>
                    <td>{isPeriod ? g.subject : g.semester}</td>
                    <td>
                      {isEditing ? (
                        <ScoreInput
                          type="number"
                          value={g.score === undefined ? "" : g.score}
                          onChange={(e) => handleScoreChange(idx, e.target.value)}
                        />
                      ) : (
                        g.score
                      )}
                    </td>
                    <td>{g.score !== undefined  ? Math.ceil((100 - Number(g.score)) / 10) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GradeTable>
          <ButtonArea>
            {isEditing ? (
              <>
                <CancleButton onClick={handleCancel}>수정 취소</CancleButton>
                <SaveButton onClick={handleSave}>수정 완료</SaveButton>
              </>
            ) : (
              <EditButton onClick={handleEdit}>성적관리</EditButton>
            )}
          </ButtonArea>
        </TableArea>
        <ChartArea>
          <ChartTitle>{isPeriod ? `${selectedGrade}학년 ${selectedSemester}학기 통계` : `${selectedSubject} 성적 통계`}</ChartTitle>
          <ChartBox>
            <RadarChart data={radarSemesterData} />
          </ChartBox>
        </ChartArea>
      </GradeContainer>
    </MainContainer>
  );
};

export default GradePage;