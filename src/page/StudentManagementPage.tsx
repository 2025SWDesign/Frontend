import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { useStudentStore } from "../stores/studentStore";

import {
  StudentManagementContainer,
  StudentManagementHeader,
  Line,
  BasicInfoSection,
  InfoRow,
  InfoContent,
  InfoLabel,
  InfoInput,
  UpdateButton,
  SemesterAttendanceSection,
  SectionTitle,
  AttendanceTableWrapper,
  AttendanceTable,
  AttendanceHeaderCell,
  AttendanceCell,
  StudentAttendanceSection,
  AttendanceSummaryTable,
  AttendanceEditButton,
  SummaryHeaderCell,
  SummarySubHeaderCell,
  SummaryCell,
  SpecialNotesSection,
  NotesForm,
  EditButton,
  ClassAttendanceTableWrapper,
  ClassAttendanceTable,
  ClassAttendanceHeaderCell,
  ClassAttendanceCell,
  ClassAttendanceEditButton,
  ClassSectionTitle,
  GuideMessage,
} from "./StudentManagementPage.styled";

interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface StudentManagementPageProps {
  role: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

interface AttendanceRecord {
  date: string;
  absent: string;
  late: string;
  earlyLeave: string;
  skip: string;
}

interface AttendanceSummary {
  grade: string;
  totalDays: number;
  absentIllness: number;
  absentUnauthorized: number;
  absentOther: number;
  lateIllness: number;
  lateUnauthorized: number;
  lateOther: number;
  earlyLeaveIllness: number;
  earlyLeaveUnauthorized: number;
  earlyLeaveOther: number;
  skipIllness: number;
  skipUnauthorized: number;
  skipOther: number;
}

interface ClassAttendanceRecord {
  studentId: number;
  name: string;
  number: string;
  absent: string;
  late: string;
  earlyLeave: string;
  skip: string;
}

const StudentManagementPage: React.FC<StudentManagementPageProps> = ({
  isHomeroom,
}) => {
  const selectedStudent = useStudentStore((state) => state.selectedStudent);
  const role = useAuthStore((state) => state.role);

  // 학생 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    name: selectedStudent?.name || "",
    grade: selectedStudent?.grade || "",
    class: selectedStudent?.gradeClass || "",
    number: selectedStudent?.number || "",
  });

  // 상태관리
  const [specialNotes, setSpecialNotes] = useState(""); // 특기사항
  const [isSpecialNotesEditing, setIsSpeicalNotesEditing] = useState(false); // 특기사항 편집
  const [isAttendanceEditing, setIsAttendanceEditing] = useState(false); // 개인 출석 편집
  const [isClassAttendanceEditing, setIsClassAttendanceEditing] =
    useState(false); // 담임 모드 출석 편집
  const [isClassAttendanceLoaded, setIsClassAttendanceLoaded] = useState(false); // 반 출석 데이터 로드 상태

  // 학기 출석 데이터
  const [semesterAttendance, setSemesterAttendance] = useState<
    AttendanceRecord[]
  >([]);
  // 학생 출결 정보 데이터
  const [attendanceSummaryData, setAttendanceSummaryData] = useState<
    AttendanceSummary[]
  >([]);
  // 반 출석 데이터
  const [classAttendance, setClassAttendance] = useState<
    ClassAttendanceRecord[]
  >([]);
  const semesterId = 202301; // Example semester ID, should be dynamic in production
  const classId = 101; // Example class ID (e.g., 1학년 1반), should be dynamic based on TEACHER

  // 기본 정보 변경 핸들러
  const handleBasicInfoChange =
    (field: keyof typeof basicInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBasicInfo({
        ...basicInfo,
        [field]: e.target.value,
      });
    };

  // 기본 정보 업데이트 핸들러
  const handleUpdateBasicInfo = async () => {
    try {
      const response = await axios.put("/api/students/basic-info", {
        studentId: selectedStudent?.studentId,
        name: basicInfo.name,
        grade: basicInfo.grade,
        class: basicInfo.class,
        number: basicInfo.number,
      });

      console.log("Updated basic info:", response.data);
      alert("기본 정보가 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating student info:", error);
      alert("기본 정보 업데이트 중 오류가 발생했습니다.");
    }
  };

  // 특기사항 변경 핸들러
  const handleSpecialNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSpecialNotes(e.target.value);
  };

  // 출석 정보 입력 핸들러 (반 출석)
  const handleAttendanceInput = (
    studentId: number,
    field: string,
    value: string
  ) => {
    // Validate input
    const isValid =
      ["1", "2", ""].includes(value) ||
      (value.startsWith("3(") && value.endsWith(")"));
    if (!isValid) {
      alert(
        "출석 값은 '1', '2', '3(임의의 문자열)' 또는 빈 문자열이어야 합니다."
      );
      return;
    }

    setClassAttendance(
      classAttendance.map((student) => {
        if (student.studentId === studentId) {
          return {
            ...student,
            [field]: value,
          };
        }
        return student;
      })
    );
  };

  // 편집 모드 토글 핸들러
  const toggleSpecialNotesEditMode = async () => {
    if (isSpecialNotesEditing && selectedStudent) {
      // Save changes when exiting edit mode
      await handleSpecialNotesOperation();
    }
    setIsSpeicalNotesEditing(!isSpecialNotesEditing);
  };
  const toggleAttendanceEditMode = async () => {
    if (isAttendanceEditing) {
      // Save changes when exiting edit mode
      await handleAttendanceOperation();
    }
    setIsAttendanceEditing(!isAttendanceEditing);
  };
  const toggleClassAttendanceEditMode = async () => {
    if (isClassAttendanceEditing) {
      // Save changes when exiting edit mode
      await handleClassAttendanceOperation();
    }
    setIsClassAttendanceEditing(!isClassAttendanceEditing);
  };

  // 출석 정보 입력 핸들러 (학기 출석)
  const handleSemesterAttendanceInput = (
    date: string,
    field: string,
    value: string
  ) => {
    // Validate input
    const isValid =
      ["1", "2", ""].includes(value) ||
      (value.startsWith("3(") && value.endsWith(")"));
    if (!isValid) {
      alert(
        "출석 값은 '1', '2', '3(임의의 문자열)' 또는 빈 문자열이어야 합니다."
      );
      return;
    }

    setSemesterAttendance(
      semesterAttendance.map((record) => {
        if (record.date === date) {
          return {
            ...record,
            [field]: value,
          };
        }
        return record;
      })
    );
  };

  // API: Fetch semester attendance
  const fetchSemesterAttendance = async (
    studentId: number,
    semesterId: number
  ) => {
    try {
      const response = await axios.get(
        `/api/students/${studentId}/attendance/semester/${semesterId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      throw error;
    }
  };

  // API: Create semester attendance
  const createSemesterAttendance = async (
    studentId: number,
    semesterId: number,
    attendanceData: AttendanceRecord[]
  ) => {
    try {
      const response = await axios.post(
        `/api/students/${studentId}/attendance/semester/${semesterId}`,
        { attendance: attendanceData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating attendance:", error);
      throw error;
    }
  };

  // API: Update semester attendance
  const updateSemesterAttendance = async (
    studentId: number,
    semesterId: number,
    attendanceData: AttendanceRecord[]
  ) => {
    try {
      const response = await fetch(
        `/api/students/${studentId}/attendance/semester/${semesterId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ attendance: attendanceData }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating attendance:", error);
      throw error;
    }
  };

  // API: Fetch attendance summary
  const fetchAttendanceSummary = async (
    studentId: number,
    semesterId: number | null = null
  ) => {
    try {
      const response = await axios.get(
        `/api/students/${studentId}/attendance/summary`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: semesterId ? { semesterId } : {},
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance summary:", error);
      throw error;
    }
  };

  // API: Fetch special notes
  const fetchSpecialNotes = async (studentId: number, semesterId: number) => {
    try {
      const response = await axios.get(
        `/api/students/${studentId}/special-notes/${semesterId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching special notes:", error);
      throw error;
    }
  };

  // API: Create special notes
  const createSpecialNotes = async (
    studentId: number,
    semesterId: number,
    notes: string
  ) => {
    try {
      const response = await axios.post(
        `/api/students/${studentId}/special-notes/${semesterId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating special notes:", error);
      throw error;
    }
  };

  // API: Update special notes
  const updateSpecialNotes = async (
    studentId: number,
    semesterId: number,
    notes: string
  ) => {
    try {
      const response = await axios.patch(
        `/api/students/${studentId}/special-notes/${semesterId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating special notes:", error);
      throw error;
    }
  };

  // API: Fetch class attendance
  const fetchClassAttendance = async (
    classId: number,
    semesterId: number,
    date: string
  ) => {
    try {
      const response = await axios.get(
        `/api/classes/${classId}/attendance/${semesterId}/${date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching class attendance:", error);
      throw error;
    }
  };

  // API: Create class attendance
  const createClassAttendance = async (
    classId: number,
    semesterId: number,
    date: string,
    attendance: ClassAttendanceRecord[]
  ) => {
    try {
      const response = await axios.post(
        `/api/classes/${classId}/attendance/${semesterId}/${date}`,
        { attendance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating class attendance:", error);
      throw error;
    }
  };

  // API: Update class attendance
  const updateClassAttendance = async (
    classId: number,
    semesterId: number,
    date: string,
    attendance: ClassAttendanceRecord[]
  ) => {
    try {
      const response = await axios.patch(
        `/api/classes/${classId}/attendance/${semesterId}/${date}`,
        { attendance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating class attendance:", error);
      throw error;
    }
  };

  // Handle attendance operation (create or update for individual student)
  const handleAttendanceOperation = async () => {
    if (!selectedStudent) return;

    try {
      const existingRecords = await fetchSemesterAttendance(
        selectedStudent.studentId,
        semesterId
      );

      // Validate attendance data
      const isValidData = semesterAttendance.every(
        (record) =>
          ["1", "2", ""].includes(record.absent) ||
          (record.absent.startsWith("3(") &&
            record.absent.endsWith(")") &&
            ["1", "2", ""].includes(record.late)) ||
          (record.late.startsWith("3(") &&
            record.late.endsWith(")") &&
            ["1", "2", ""].includes(record.earlyLeave)) ||
          (record.earlyLeave.startsWith("3(") &&
            record.earlyLeave.endsWith(")") &&
            ["1", "2", ""].includes(record.skip)) ||
          (record.skip.startsWith("3(") && record.skip.endsWith(")"))
      );

      if (!isValidData) {
        throw new Error(
          "Invalid attendance values. Must be '1', '2', '3(임의의 문자열)', or ''"
        );
      }

      if (existingRecords.data.attendance.length === 0) {
        await createSemesterAttendance(
          selectedStudent.studentId,
          semesterId,
          semesterAttendance
        );
        alert("출석 정보가 생성되었습니다.");
      } else {
        await updateSemesterAttendance(
          selectedStudent.studentId,
          semesterId,
          semesterAttendance
        );
        alert("출석 정보가 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("Error handling attendance:", error);
      alert("출석 정보 처리 중 오류가 발생했습니다.");
    }
  };

  // Handle special notes operation (create or update)
  const handleSpecialNotesOperation = async () => {
    if (!selectedStudent) return;

    try {
      if (!specialNotes.trim()) {
        throw new Error("특기사항은 비어 있을 수 없습니다.");
      }

      const existingNotes = await fetchSpecialNotes(
        selectedStudent.studentId,
        semesterId
      );

      if (!existingNotes.data.notes) {
        await createSpecialNotes(
          selectedStudent.studentId,
          semesterId,
          specialNotes
        );
        alert("특기사항이 생성되었습니다.");
      } else {
        await updateSpecialNotes(
          selectedStudent.studentId,
          semesterId,
          specialNotes
        );
        alert("특기사항이 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("Error handling special notes:", error);
      alert("특기사항 처리 중 오류가 발생했습니다.");
    }
  };

  // Handle class attendance operation (create or update)
  const handleClassAttendanceOperation = async () => {
    if (!isClassAttendanceLoaded) return;

    try {
      // Validate attendance data
      const isValidData = classAttendance.every(
        (record) =>
          ["1", "2", ""].includes(record.absent) ||
          (record.absent.startsWith("3(") &&
            record.absent.endsWith(")") &&
            ["1", "2", ""].includes(record.late)) ||
          (record.late.startsWith("3(") &&
            record.late.endsWith(")") &&
            ["1", "2", ""].includes(record.earlyLeave)) ||
          (record.earlyLeave.startsWith("3(") &&
            record.earlyLeave.endsWith(")") &&
            ["1", "2", ""].includes(record.skip)) ||
          (record.skip.startsWith("3(") && record.skip.endsWith(")"))
      );

      if (!isValidData) {
        throw new Error(
          "Invalid attendance values. Must be '1', '2', '3(임의의 문자열)', or ''"
        );
      }

      const formattedDate = formatDateForApi(today); // e.g., "2023-03-02"
      const existingRecords = await fetchClassAttendance(
        classId,
        semesterId,
        formattedDate
      );

      if (
        !existingRecords.data.attendance ||
        existingRecords.data.attendance.length === 0
      ) {
        await createClassAttendance(
          classId,
          semesterId,
          formattedDate,
          classAttendance
        );
        alert("반 출석 정보가 생성되었습니다.");
      } else {
        await updateClassAttendance(
          classId,
          semesterId,
          formattedDate,
          classAttendance
        );
        alert("반 출석 정보가 업데이트되었습니다.");
      }
    } catch (error) {
      console.error("Error handling class attendance:", error);
      alert("반 출석 정보 처리 중 오류가 발생했습니다.");
    }
  };

  // Utility to format date for API (YYYY-MM-DD)
  const formatDateForApi = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // Fetch initial data
  useEffect(() => {
    if (selectedStudent) {
      // Update basicInfo when selectedStudent changes
      setBasicInfo({
        name: selectedStudent.name || "",
        grade: selectedStudent.grade || "",
        class: selectedStudent.gradeClass || "",
        number: selectedStudent.number || "",
      });

      const loadStudentData = async () => {
        try {
          // Fetch semester attendance
          const attendanceResponse = await fetchSemesterAttendance(
            selectedStudent.studentId,
            semesterId
          );
          setSemesterAttendance(attendanceResponse.data.attendance || []);

          // Fetch attendance summary
          const summaryResponse = await fetchAttendanceSummary(
            selectedStudent.studentId,
            semesterId
          );
          setAttendanceSummaryData(
            summaryResponse.data && summaryResponse.data.length > 0
              ? summaryResponse.data
              : [
                  {
                    grade: "1학년",
                    totalDays: 240,
                    absentIllness: 0,
                    absentUnauthorized: 0,
                    absentOther: 0,
                    lateIllness: 0,
                    lateUnauthorized: 0,
                    lateOther: 0,
                    earlyLeaveIllness: 0,
                    earlyLeaveUnauthorized: 0,
                    earlyLeaveOther: 0,
                    skipIllness: 0,
                    skipUnauthorized: 0,
                    skipOther: 0,
                  },
                  {
                    grade: "2학년",
                    totalDays: 240,
                    absentIllness: 0,
                    absentUnauthorized: 0,
                    absentOther: 0,
                    lateIllness: 0,
                    lateUnauthorized: 0,
                    lateOther: 0,
                    earlyLeaveIllness: 0,
                    earlyLeaveUnauthorized: 0,
                    earlyLeaveOther: 0,
                    skipIllness: 0,
                    skipUnauthorized: 0,
                    skipOther: 0,
                  },
                  {
                    grade: "3학년",
                    totalDays: 240,
                    absentIllness: 0,
                    absentUnauthorized: 0,
                    absentOther: 0,
                    lateIllness: 0,
                    lateUnauthorized: 0,
                    lateOther: 0,
                    earlyLeaveIllness: 0,
                    earlyLeaveUnauthorized: 0,
                    earlyLeaveOther: 0,
                    skipIllness: 0,
                    skipUnauthorized: 0,
                    skipOther: 0,
                  },
                ]
          );

          // Fetch special notes
          const notesResponse = await fetchSpecialNotes(
            selectedStudent.studentId,
            semesterId
          );
          setSpecialNotes(notesResponse.data.notes || "");
        } catch (error) {
          console.error("Error fetching student data:", error);
          setSemesterAttendance(
            semesterDates.map((date) => ({
              date,
              absent: "",
              late: "",
              earlyLeave: "",
              skip: "",
            }))
          );
          setAttendanceSummaryData([
            {
              grade: "1학년",
              totalDays: 240,
              absentIllness: 0,
              absentUnauthorized: 0,
              absentOther: 0,
              lateIllness: 0,
              lateUnauthorized: 0,
              lateOther: 0,
              earlyLeaveIllness: 0,
              earlyLeaveUnauthorized: 0,
              earlyLeaveOther: 0,
              skipIllness: 0,
              skipUnauthorized: 0,
              skipOther: 0,
            },
            {
              grade: "2학년",
              totalDays: 240,
              absentIllness: 0,
              absentUnauthorized: 0,
              absentOther: 0,
              lateIllness: 0,
              lateUnauthorized: 0,
              lateOther: 0,
              earlyLeaveIllness: 0,
              earlyLeaveUnauthorized: 0,
              earlyLeaveOther: 0,
              skipIllness: 0,
              skipUnauthorized: 0,
              skipOther: 0,
            },
            {
              grade: "3학년",
              totalDays: 240,
              absentIllness: 0,
              absentUnauthorized: 0,
              absentOther: 0,
              lateIllness: 0,
              lateUnauthorized: 0,
              lateOther: 0,
              earlyLeaveIllness: 0,
              earlyLeaveUnauthorized: 0,
              earlyLeaveOther: 0,
              skipIllness: 0,
              skipUnauthorized: 0,
              skipOther: 0,
            },
          ]);
          setSpecialNotes("");
        }
      };
      loadStudentData();
    }

    if (isHomeroom) {
      const loadClassAttendance = async () => {
        try {
          const formattedDate = formatDateForApi(today);
          const attendanceResponse = await fetchClassAttendance(
            classId,
            semesterId,
            formattedDate
          );
          if (
            attendanceResponse.data.attendance &&
            attendanceResponse.data.attendance.length > 0
          ) {
            setClassAttendance(attendanceResponse.data.attendance);
            setIsClassAttendanceLoaded(true);
          } else {
            setClassAttendance([]);
            setIsClassAttendanceLoaded(false);
          }
        } catch (error) {
          console.error("Error fetching class attendance:", error);
          setClassAttendance([]);
          setIsClassAttendanceLoaded(false);
        }
      };
      loadClassAttendance();
    }
  }, [selectedStudent, isHomeroom]);

  // 현재 날짜 구하기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  // 학기 출석 날짜
  const semesterDates = [
    "3/2",
    "3/3",
    "3/4",
    "3/5",
    "3/6",
    "3/9",
    "3/10",
    "3/11",
    "3/12",
    "3/13",
    "3/16",
    "3/17",
    "3/18",
    "3/19",
    "3/20",
  ];

  const attendanceCategories = ["결석", "지각", "조퇴", "결과"];

  // 총계 계산
  const calculateTotals = () => {
    const totals = {
      absent: 0,
      late: 0,
      earlyLeave: 0,
      skip: 0,
    };

    semesterAttendance.forEach((record) => {
      if (record.absent) totals.absent += 1;
      if (record.late) totals.late += 1;
      if (record.earlyLeave) totals.earlyLeave += 1;
      if (record.skip) totals.skip += 1;
    });

    return totals;
  };

  const totals = calculateTotals();

  return (
    <StudentManagementContainer>
      <StudentManagementHeader>학생부 관리</StudentManagementHeader>
      <Line />
      {selectedStudent || !(role == "TEACHER") ? (
        <>
          {/* 학생 기본정보 수정 섹션 */}
          {role === "TEACHER" && (
            <BasicInfoSection>
              <SectionTitle>학생 기본정보 수정</SectionTitle>
              <InfoRow>
                <InfoContent>
                  <InfoLabel>이름</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("name")}
                    value={basicInfo.name}
                  />
                  <InfoLabel>학년</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("grade")}
                    value={basicInfo.grade}
                  />
                  <InfoLabel>반</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("class")}
                    value={basicInfo.class}
                  />
                  <InfoLabel>번호</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("number")}
                    value={basicInfo.number}
                  />
                  <UpdateButton onClick={handleUpdateBasicInfo}>
                    적용
                  </UpdateButton>
                </InfoContent>
              </InfoRow>
            </BasicInfoSection>
          )}

          {/* 해당 학기 출석 섹션 */}
          <SemesterAttendanceSection role={role}>
            <SectionTitle>해당 학기 출석</SectionTitle>
            <AttendanceTableWrapper>
              <AttendanceTable>
                <thead>
                  <tr>
                    <AttendanceHeaderCell></AttendanceHeaderCell>
                    <AttendanceHeaderCell>총</AttendanceHeaderCell>
                    {semesterDates.map((date) => (
                      <AttendanceHeaderCell key={date}>
                        {date}
                      </AttendanceHeaderCell>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceCategories.map((category) => (
                    <tr key={category}>
                      <AttendanceHeaderCell>{category}</AttendanceHeaderCell>
                      <AttendanceCell className="total">
                        {
                          totals[
                            category === "결석"
                              ? "absent"
                              : category === "지각"
                                ? "late"
                                : category === "조퇴"
                                  ? "earlyLeave"
                                  : "skip"
                          ]
                        }
                      </AttendanceCell>
                      {semesterDates.map((date) => {
                        const record = semesterAttendance.find(
                          (r) => r.date === date
                        );
                        const field =
                          category === "결석"
                            ? "absent"
                            : category === "지각"
                              ? "late"
                              : category === "조퇴"
                                ? "earlyLeave"
                                : "skip";
                        return (
                          <AttendanceCell
                            key={`${category}-${date}`}
                            contentEditable={isAttendanceEditing}
                            suppressContentEditableWarning={true}
                            onBlur={(e) =>
                              handleSemesterAttendanceInput(
                                date,
                                field,
                                e.currentTarget.textContent || ""
                              )
                            }
                          >
                            {record ? record[field] : ""}
                          </AttendanceCell>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </AttendanceTable>
            </AttendanceTableWrapper>
            {role === "TEACHER" && (
              <AttendanceEditButton onClick={toggleAttendanceEditMode}>
                {isAttendanceEditing ? "저장" : "수정"}
              </AttendanceEditButton>
            )}
          </SemesterAttendanceSection>

          {/* 출결 정보 테이블 */}
          <StudentAttendanceSection>
            <SectionTitle>학생 출결 정보</SectionTitle>
            <AttendanceSummaryTable>
              <thead>
                <tr>
                  <SummaryHeaderCell rowSpan={2}>학년</SummaryHeaderCell>
                  <SummaryHeaderCell rowSpan={2}>수업일수</SummaryHeaderCell>
                  <SummaryHeaderCell colSpan={3}>결석일수</SummaryHeaderCell>
                  <SummaryHeaderCell colSpan={3}>지각</SummaryHeaderCell>
                  <SummaryHeaderCell colSpan={3}>조퇴</SummaryHeaderCell>
                  <SummaryHeaderCell colSpan={3}>결과</SummaryHeaderCell>
                </tr>
                <tr>
                  <SummarySubHeaderCell>질병</SummarySubHeaderCell>
                  <SummarySubHeaderCell>무단</SummarySubHeaderCell>
                  <SummarySubHeaderCell>기타</SummarySubHeaderCell>
                  <SummarySubHeaderCell>질병</SummarySubHeaderCell>
                  <SummarySubHeaderCell>무단</SummarySubHeaderCell>
                  <SummarySubHeaderCell>기타</SummarySubHeaderCell>
                  <SummarySubHeaderCell>질병</SummarySubHeaderCell>
                  <SummarySubHeaderCell>무단</SummarySubHeaderCell>
                  <SummarySubHeaderCell>기타</SummarySubHeaderCell>
                  <SummarySubHeaderCell>질병</SummarySubHeaderCell>
                  <SummarySubHeaderCell>무단</SummarySubHeaderCell>
                  <SummarySubHeaderCell>기타</SummarySubHeaderCell>
                </tr>
              </thead>
              <tbody>
                {attendanceSummaryData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <SummaryCell>{row.grade}</SummaryCell>
                    <SummaryCell>{row.totalDays}</SummaryCell>
                    <SummaryCell>{row.absentIllness}</SummaryCell>
                    <SummaryCell>{row.absentUnauthorized}</SummaryCell>
                    <SummaryCell>{row.absentOther}</SummaryCell>
                    <SummaryCell>{row.lateIllness}</SummaryCell>
                    <SummaryCell>{row.lateUnauthorized}</SummaryCell>
                    <SummaryCell>{row.lateOther}</SummaryCell>
                    <SummaryCell>{row.earlyLeaveIllness}</SummaryCell>
                    <SummaryCell>{row.earlyLeaveUnauthorized}</SummaryCell>
                    <SummaryCell>{row.earlyLeaveOther}</SummaryCell>
                    <SummaryCell>{row.skipIllness}</SummaryCell>
                    <SummaryCell>{row.skipUnauthorized}</SummaryCell>
                    <SummaryCell>{row.skipOther}</SummaryCell>
                  </tr>
                ))}
              </tbody>
            </AttendanceSummaryTable>
          </StudentAttendanceSection>

          {/* 특기 사항 섹션 */}
          <SpecialNotesSection role={role}>
            <SectionTitle>특기 사항</SectionTitle>
            <NotesForm
              value={specialNotes}
              onChange={handleSpecialNotesChange}
              disabled={!isSpecialNotesEditing}
              placeholder={
                isSpecialNotesEditing ? "학생의 특기 사항을 입력하세요" : ""
              }
              role={role}
            />
            {role === "TEACHER" && (
              <EditButton onClick={toggleSpecialNotesEditMode}>
                {isSpecialNotesEditing ? "저장" : "수정"}
              </EditButton>
            )}
          </SpecialNotesSection>
        </>
      ) : isHomeroom ? (
        <div>
          <ClassSectionTitle>{formattedDate} - 반 출석 관리</ClassSectionTitle>
          {isClassAttendanceLoaded ? (
            <>
              <ClassAttendanceTableWrapper>
                <ClassAttendanceTable>
                  <thead>
                    <tr>
                      <ClassAttendanceHeaderCell>
                        번호
                      </ClassAttendanceHeaderCell>
                      <ClassAttendanceHeaderCell>
                        이름
                      </ClassAttendanceHeaderCell>
                      <ClassAttendanceHeaderCell>
                        결석
                      </ClassAttendanceHeaderCell>
                      <ClassAttendanceHeaderCell>
                        지각
                      </ClassAttendanceHeaderCell>
                      <ClassAttendanceHeaderCell>
                        조퇴
                      </ClassAttendanceHeaderCell>
                      <ClassAttendanceHeaderCell>
                        결과
                      </ClassAttendanceHeaderCell>
                    </tr>
                  </thead>
                  <tbody>
                    {classAttendance.map((student) => (
                      <tr key={student.studentId}>
                        <ClassAttendanceCell>
                          {student.number}
                        </ClassAttendanceCell>
                        <ClassAttendanceCell>
                          {student.name}
                        </ClassAttendanceCell>
                        <ClassAttendanceCell
                          contentEditable={isClassAttendanceEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleAttendanceInput(
                              student.studentId,
                              "absent",
                              e.currentTarget.textContent || ""
                            )
                          }
                        >
                          {student.absent}
                        </ClassAttendanceCell>
                        <ClassAttendanceCell
                          contentEditable={isClassAttendanceEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleAttendanceInput(
                              student.studentId,
                              "late",
                              e.currentTarget.textContent || ""
                            )
                          }
                        >
                          {student.late}
                        </ClassAttendanceCell>
                        <ClassAttendanceCell
                          contentEditable={isClassAttendanceEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleAttendanceInput(
                              student.studentId,
                              "earlyLeave",
                              e.currentTarget.textContent || ""
                            )
                          }
                        >
                          {student.earlyLeave}
                        </ClassAttendanceCell>
                        <ClassAttendanceCell
                          contentEditable={isClassAttendanceEditing}
                          suppressContentEditableWarning={true}
                          onBlur={(e) =>
                            handleAttendanceInput(
                              student.studentId,
                              "skip",
                              e.currentTarget.textContent || ""
                            )
                          }
                        >
                          {student.skip}
                        </ClassAttendanceCell>
                      </tr>
                    ))}
                  </tbody>
                </ClassAttendanceTable>
              </ClassAttendanceTableWrapper>
              <ClassAttendanceEditButton
                onClick={toggleClassAttendanceEditMode}
              >
                {isClassAttendanceEditing ? "저장" : "수정"}
              </ClassAttendanceEditButton>
            </>
          ) : (
            <GuideMessage>반 학생 정보를 받아오지 못했습니다.</GuideMessage>
          )}
        </div>
      ) : (
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      )}
    </StudentManagementContainer>
  );
};

export default StudentManagementPage;
