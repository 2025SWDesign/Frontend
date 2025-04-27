import React, { useEffect, useState } from "react";
import RadarChart from "../components/RadarChart";
import { useAuthStore } from "../stores/authStore";
import { useStudentStore } from "../stores/studentStore";
import axios from "../api/axiosInstance";

interface Grade {
  subject: string;
  score: number;
  student: {
    studentId: number;
    user: {
      name: string;
    };
  };
}

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
  StudentGradeTable,
  StudentsTableArea,
  GuideMessage,
} from "./GradePage.styled";

// 학기별 성적
const semesterGradeData = [
  { name: "1학년 1학기", 국어: 80, 영어: 70, 수학: 90, 과학: 60, 사회: 85 },
  { name: "1학년 2학기", 국어: 82, 영어: 74, 수학: 88, 과학: 65, 사회: 83 },
  { name: "2학년 1학기", 국어: 78, 영어: 68, 수학: 92, 과학: 62, 사회: 80 },
  { name: "2학년 2학기", 국어: 85, 영어: 72, 수학: 94, 과학: 68, 사회: 86 },
  { name: "3학년 1학기", 국어: 90, 영어: 77, 수학: 91, 과학: 70, 사회: 89 },
  { name: "3학년 2학기", 국어: 88, 영어: 80, 수학: 89, 과학: 72, 사회: 90 },
];

// 과목별 성적
const subjectGradeData: { [key: string]: number[] } = {
  국어: [80, 82, 78, 85, 90, 88],
  영어: [70, 74, 68, 72, 77, 80],
  수학: [90, 88, 92, 94, 91, 89],
  과학: [60, 65, 62, 68, 70, 72],
  사회: [85, 83, 80, 86, 89, 90],
};

const semesterNames = [
  "1학년 1학기",
  "1학년 2학기",
  "2학년 1학기",
  "2학년 2학기",
  "3학년 1학기",
  "3학년 2학기",
];

const GradePage: React.FC = () => {
  //기간&과목별용
  const [isPeriod, setIsPeriod] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState("1");
  const [selectedSemester, setSelectedSemester] = useState("2");
  const [editedSemesterGrades, setEditedSemesterGrades] =
    useState(semesterGradeData);
  const [editedSubjectGrades, setEditedSubjectGrades] =
    useState(subjectGradeData);
  const fullSemester = `${selectedGrade}학년 ${selectedSemester}학기`;
  const selectedData = editedSemesterGrades.find(
    (d) => d.name === fullSemester
  );
  const [selectedSubject, setSelectedSubject] = useState("국어");
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentSemester =
    currentMonth >= 3 && currentMonth <= 8 ? "1학기" : "2학기";

  const role = useAuthStore((state) => state.role);
  const isHomeroom = useAuthStore((state) => state.isHomeroom);
  const selectedStudent = useStudentStore((state) => state.selectedStudent);

  const [classGrades, setClassGrades] = useState<Grade[]>([]);
  const subjects = ["국어", "영어", "수학", "과학", "사회"];

  const teacherGrade = useAuthStore((state) => state.grade);
  const teacherClass = useAuthStore((state) => state.gradeClass);

  useEffect(() => {
    const loadClassGrades = async () => {
      try {
        if (isHomeroom) {
          const schoolId = Number(sessionStorage.getItem("schoolId"));
          const classId = Number(sessionStorage.getItem("classId"));
          const semester = `${selectedSemester}`;

          const response = await axios.get(
            `/school/${schoolId}/grades/class/${classId}?semester=${semester}`
          );

          setClassGrades(response.data.grades);
          console.log(response.data);
        }
      } catch (err) {
        console.error("성적 조회 실패", err);
      }
    };

    loadClassGrades();
  }, [isHomeroom, selectedSemester]);

  const groupedByStudent = classGrades.reduce(
    (acc, curr) => {
      const { studentId } = curr.student;
      if (!acc[studentId]) {
        acc[studentId] = {
          name: curr.student.user.name,
          scores: {},
        };
      }
      acc[studentId].scores[curr.subject] = curr.score;
      return acc;
    },
    {} as Record<number, { name: string; scores: Record<string, number> }>
  );

  // 학기별 테이블 데이터
  const semesterTableData = selectedData
    ? Object.entries(selectedData)
        .filter(([key]) => key !== "name")
        .map(([subject, score]) => ({
          subject,
          score,
          grade: Math.ceil((100 - Number(score)) / 10),
        }))
    : [];

  // 과목별 테이블 데이터
  const subjectTableData = editedSubjectGrades[selectedSubject].map(
    (score: number, index: number) => ({
      semester: semesterNames[index],
      score,
      grade: Math.ceil((100 - score) / 10),
    })
  );
  // 학기별 차트 데이터
  const radarSemesterData = selectedData
    ? Object.entries(selectedData)
        .filter(([key]) => key !== "name")
        .map(([name, value]) => ({ name, value: Number(value) }))
    : [];

  // 과목별 차트 데이터
  const radarGradeData = semesterNames.map((semester, i) => ({
    name: semester,
    value: editedSubjectGrades[selectedSubject][i],
  }));

  // 학기별 성적 변경
  const handleSemesterChange = (
    semester: string,
    subject: string,
    newScore: number
  ) => {
    setEditedSemesterGrades((prev) =>
      prev.map((row) =>
        row.name === semester ? { ...row, [subject]: newScore } : row
      )
    );
  };

  //과목별 성적 변경
  const handleSubjectChange = (
    subject: string,
    index: number,
    newScore: number
  ) => {
    setEditedSubjectGrades((prev) => ({
      ...prev,
      [subject]: prev[subject].map((score, i) =>
        i === index ? newScore : score
      ),
    }));
  };

  const [backupSemesterGrades, setBackupSemesterGrades] =
    useState(semesterGradeData);
  const [backupSubjectGrades, setBackupSubjectGrades] =
    useState(subjectGradeData);

  const handleEdit = () => {
    // 편집 시작 시 현재 상태를 백업
    setBackupSemesterGrades(JSON.parse(JSON.stringify(editedSemesterGrades)));
    setBackupSubjectGrades(JSON.parse(JSON.stringify(editedSubjectGrades)));
    setIsEditing(true);
  };

  const handleCancel = () => {
    // 백업된 데이터를 복원
    setEditedSemesterGrades(backupSemesterGrades);
    setEditedSubjectGrades(backupSubjectGrades);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    console.log("🟢 selectedStudent changed:", selectedStudent);
  }, [selectedStudent]);

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

  return (
    <MainContainer>
      <h1>학생성적관리</h1>
      <Line />
      {role === "TEACHER" && isHomeroom && !selectedStudent ? (
        <GradeContainer>
          <StudentsTableArea>
            <h2>{`${currentYear}학년도 ${currentSemester} 성적 - ${teacherGrade}학년 ${teacherClass}반`}</h2>
            <StudentGradeTable>
              <table>
                <thead>
                  <tr>
                    <th>이름</th>
                    {subjects.map((subj) => (
                      <th key={subj}>{subj}</th>
                    ))}
                    <th>평균</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedByStudent).map(
                    ([studentId, { name, scores }]) => {
                      const subjectScores = subjects.map(
                        (subject) => scores[subject] ?? "-"
                      );
                      const validScores = subjectScores.filter(
                        (s) => typeof s === "number"
                      ) as number[];
                      const average =
                        validScores.length > 0
                          ? (
                              validScores.reduce((sum, v) => sum + v, 0) /
                              validScores.length
                            ).toFixed(1)
                          : "-";

                      return (
                        <tr key={studentId}>
                          <td>{name}</td>
                          {subjectScores.map((score, index) => (
                            <td key={index}>{score}</td>
                          ))}
                          <td>{average}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </StudentGradeTable>
          </StudentsTableArea>
        </GradeContainer>
      ) : role === "TEACHER" && selectedStudent ? (
        <GradeContainer>
          <TableArea>
            <ToggleWrapper
              onClick={() => {
                if (isEditing) return; // 편집 중이면 동작 X
                setIsPeriod(!isPeriod);
              }}
            >
              <ToggleButton $isPeriod={isPeriod} />
              <OptionButton $isActive={isPeriod}>기간별</OptionButton>
              <OptionButton $isActive={!isPeriod}>과목별</OptionButton>
            </ToggleWrapper>
            <DropdownBox>
              {isPeriod ? (
                <>
                  <DropDown
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    disabled={isEditing}
                  >
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                  </DropDown>
                  <DropDown
                    id="semester"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={isEditing}
                  >
                    <option value="1">1학기</option>
                    <option value="2">2학기</option>
                  </DropDown>
                </>
              ) : (
                <DropDown
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isEditing}
                >
                  {Object.keys(subjectGradeData).map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </DropDown>
              )}
            </DropdownBox>
            <GradeTable>
              <table>
                <thead>
                  <tr>
                    {isPeriod ? (
                      <>
                        <th>과목</th>
                        <th>성적</th>
                        <th>등급</th>
                      </>
                    ) : (
                      <>
                        <th>학기</th>
                        <th>{selectedSubject}</th>
                        <th>등급</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(isPeriod ? semesterTableData : subjectTableData).map(
                    (row, i) => (
                      <tr key={i}>
                        <td>
                          {isPeriod
                            ? (row as { subject: string }).subject
                            : (row as { semester: string }).semester}
                        </td>
                        {isEditing ? (
                          <td>
                            <ScoreInput
                              type="number"
                              onChange={(e) =>
                                isPeriod
                                  ? handleSemesterChange(
                                      fullSemester,
                                      (row as { subject: string }).subject,
                                      Number(e.target.value)
                                    )
                                  : handleSubjectChange(
                                      selectedSubject,
                                      i,
                                      Number(e.target.value)
                                    )
                              }
                            />
                          </td>
                        ) : (
                          <td>{row.score}</td>
                        )}
                        <td>{row.grade}</td>
                      </tr>
                    )
                  )}
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
            <ChartTitle>
              {isPeriod
                ? `${fullSemester} 통계`
                : `${selectedSubject} 성적 통계`}
            </ChartTitle>
            <ChartBox>
              <RadarChart
                data={isPeriod ? radarSemesterData : radarGradeData}
              />
            </ChartBox>
          </ChartArea>
        </GradeContainer>
      ) : (
        <GradeContainer>
          <TableArea>
            <ToggleWrapper
              onClick={() => {
                if (isEditing) return; // 편집 중이면 동작 X
                setIsPeriod(!isPeriod);
              }}
            >
              <ToggleButton $isPeriod={isPeriod} />
              <OptionButton $isActive={isPeriod}>기간별</OptionButton>
              <OptionButton $isActive={!isPeriod}>과목별</OptionButton>
            </ToggleWrapper>
            <DropdownBox>
              {isPeriod ? (
                <>
                  <DropDown
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    disabled={isEditing}
                  >
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                  </DropDown>
                  <DropDown
                    id="semester"
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    disabled={isEditing}
                  >
                    <option value="1">1학기</option>
                    <option value="2">2학기</option>
                  </DropDown>
                </>
              ) : (
                <DropDown
                  id="subject"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isEditing}
                >
                  {Object.keys(subjectGradeData).map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </DropDown>
              )}
            </DropdownBox>
            <GradeTable>
              <table>
                <thead>
                  <tr>
                    {isPeriod ? (
                      <>
                        <th>과목</th>
                        <th>성적</th>
                        <th>등급</th>
                      </>
                    ) : (
                      <>
                        <th>학기</th>
                        <th>{selectedSubject}</th>
                        <th>등급</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(isPeriod ? semesterTableData : subjectTableData).map(
                    (row, i) => (
                      <tr key={i}>
                        <td>
                          {isPeriod
                            ? (row as { subject: string }).subject
                            : (row as { semester: string }).semester}
                        </td>
                        {isEditing ? (
                          <td>
                            <ScoreInput
                              type="number"
                              onChange={(e) =>
                                isPeriod
                                  ? handleSemesterChange(
                                      fullSemester,
                                      (row as { subject: string }).subject,
                                      Number(e.target.value)
                                    )
                                  : handleSubjectChange(
                                      selectedSubject,
                                      i,
                                      Number(e.target.value)
                                    )
                              }
                            />
                          </td>
                        ) : (
                          <td>{row.score}</td>
                        )}
                        <td>{row.grade}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </GradeTable>
          </TableArea>
          <ChartArea>
            <ChartTitle>
              {isPeriod
                ? `${fullSemester} 통계`
                : `${selectedSubject} 성적 통계`}
            </ChartTitle>
            <ChartBox>
              <RadarChart
                data={isPeriod ? radarSemesterData : radarGradeData}
              />
            </ChartBox>
          </ChartArea>
        </GradeContainer>
      )}
    </MainContainer>
  );
};

export default GradePage;
