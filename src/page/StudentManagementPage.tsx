import React, { useState } from "react";

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
  identity: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

const StudentManagementPage: React.FC<StudentManagementPageProps> = ({
  identity,
  isHomeroom,
  selectedStudent,
}) => {
  // 학생 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    name: "홍길동",
    grade: "1",
    class: "3",
    number: "15",
  });

  // 상태관리
  const [specialNotes, setSpecialNotes] = useState(""); // 특기사항
  const [isSpecialNotesEditing, setIsSpeicalNotesEditing] = useState(false); // 특기사항 편집
  const [isAttendanceEditing, setIsAttendanceEditing] = useState(false); // 개인 출석 편집
  const [isClassAttendanceEditing, setIsClassAttendanceEditing] = useState(false); // 담임 모드 출석 편집집

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
  const handleUpdateBasicInfo = () => {
    // API 호출 로직 추가
    console.log("Updated basic info:", basicInfo);
    alert("기본 정보가 업데이트되었습니다.");
  };

  // 총 출석 업데이트 함수
  const updateTotalAttendance = (category: string) => {
    const cells = document.querySelectorAll(
      `tr[data-category="${category}"] td:not(.total)`
    );
    let sum = 0;

    cells.forEach((cell) => {
      const value = cell.textContent?.trim();
      if (value && value !== "") {
        sum++;
      }
    });

    const totalCell = document.querySelector(
      `tr[data-category="${category}"] td.total`
    );
    if (totalCell) {
      totalCell.textContent = sum.toString();
    }
  };

  // 특기사항 변경 핸들러
  const handleSpecialNotesChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSpecialNotes(e.target.value);
  };

  // 편집 모드 토글 핸들러
  const toggleSpecialNotesEditMode = () => {
    setIsSpeicalNotesEditing(!isSpecialNotesEditing);
  };
  const toggleAttendanceEditMode = () => {
    setIsAttendanceEditing(!isAttendanceEditing);
  };
  // 담임 편집 모드 토글
  const toggleClassAttendanceEditMode = () => {
    setIsClassAttendanceEditing(!isClassAttendanceEditing);
  };

  // 출석 정보 입력 핸들러
  const handleAttendanceInput = (
    studentId: number,
    field: string,
    value: string
  ) => {
    setClassAttendance(
      classAttendance.map((student) => {
        if (student.id === studentId) {
          return {
            ...student,
            [field]: value,
          };
        }
        return student;
      })
    );
  };

  // 현재 날짜 구하기
  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  // 반 학생들 출석 상태 관리
  const [classAttendance, setClassAttendance] = useState([
    {
      id: 1,
      name: "김철수",
      number: "1",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 2,
      name: "이영희",
      number: "2",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 3,
      name: "박민수",
      number: "3",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 4,
      name: "최지은",
      number: "4",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 5,
      name: "정현우",
      number: "5",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 6,
      name: "강수진",
      number: "6",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 7,
      name: "윤준호",
      number: "7",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 8,
      name: "송지원",
      number: "8",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 9,
      name: "임성민",
      number: "9",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 10,
      name: "한예슬",
      number: "10",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 11,
      name: "조민재",
      number: "11",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 12,
      name: "장현서",
      number: "12",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 13,
      name: "신아영",
      number: "13",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 14,
      name: "권태준",
      number: "14",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 15,
      name: "홍길동",
      number: "15",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 1,
      name: "김철수",
      number: "1",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 2,
      name: "이영희",
      number: "2",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 3,
      name: "박민수",
      number: "3",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 4,
      name: "최지은",
      number: "4",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 5,
      name: "정현우",
      number: "5",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 6,
      name: "강수진",
      number: "6",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 7,
      name: "윤준호",
      number: "7",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 8,
      name: "송지원",
      number: "8",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 9,
      name: "임성민",
      number: "9",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 10,
      name: "한예슬",
      number: "10",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 11,
      name: "조민재",
      number: "11",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 12,
      name: "장현서",
      number: "12",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 13,
      name: "신아영",
      number: "13",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 14,
      name: "권태준",
      number: "14",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    {
      id: 15,
      name: "홍길동",
      number: "15",
      absent: "",
      late: "",
      earlyLeave: "",
      skip: "",
    },
    // 추가 학생들...
  ]);

  // 학기 출석 데이터 - 실제로는 API에서 가져올 것
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

  const attendanceSummaryData = [
    [
      "1학년",
      "240",
      "0",
      "0",
      "0",
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
    [
      "2학년",
      "240",
      "2",
      "0",
      "1",
      "3",
      "0",
      "0",
      "1",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
    [
      "3학년",
      "220",
      "1",
      "0",
      "0",
      "2",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
  ];

  return (
    <StudentManagementContainer>
      <StudentManagementHeader>학생부 관리</StudentManagementHeader>
      <Line />
      {selectedStudent || !(identity == "teacher") ? (
        <>
          {/* 학생 기본정보 수정 섹션 수정 */}
          {identity === "teacher" && (
            <BasicInfoSection>
              <SectionTitle>학생 기본정보 수정</SectionTitle>
              <InfoRow>
                <InfoContent>
                  <InfoLabel>이름</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("name")}
                  />
                  <InfoLabel>학년</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("grade")}
                  />
                  <InfoLabel>반</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("class")}
                  />
                  <InfoLabel>번호</InfoLabel>
                  <InfoInput
                    type="text"
                    onChange={handleBasicInfoChange("number")}
                  />
                  <UpdateButton onClick={handleUpdateBasicInfo}>
                    적용
                  </UpdateButton>
                </InfoContent>
              </InfoRow>
            </BasicInfoSection>
          )}

          {/* 해당 학기 출석 섹션 */}
          <SemesterAttendanceSection identity={identity}>
            <SectionTitle>해당 학기 출석</SectionTitle>
            {/* 해당 학기 출석 테이블의 "총" 열 추가 */}
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
                      <AttendanceCell className="total">0</AttendanceCell>
                      {semesterDates.map((date) => (
                        <AttendanceCell
                          key={`${category}-${date}`}
                          contentEditable={isAttendanceEditing}
                          onInput={() => updateTotalAttendance(category)}
                        ></AttendanceCell>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </AttendanceTable>
            </AttendanceTableWrapper>
            {identity === "teacher" && (
              <AttendanceEditButton onClick={toggleAttendanceEditMode}>
                {isAttendanceEditing ? "저장" : "수정"}
              </AttendanceEditButton>
            )}
          </SemesterAttendanceSection>

          {/* 출결 정보 테이블 구조 수정 */}
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
                    {row.map((cell, cellIndex) => (
                      <SummaryCell key={`${rowIndex}-${cellIndex}`}>
                        {cell}
                      </SummaryCell>
                    ))}
                  </tr>
                ))}
              </tbody>
            </AttendanceSummaryTable>
          </StudentAttendanceSection>

          {/* 특기 사항 섹션 */}
          <SpecialNotesSection identity={identity}>
            <SectionTitle>특기 사항</SectionTitle>
            <NotesForm
              value={specialNotes}
              onChange={handleSpecialNotesChange}
              disabled={!isSpecialNotesEditing}
              placeholder={
                isSpecialNotesEditing ? "학생의 특기 사항을 입력하세요" : ""
              }
              identity={identity}
            />
            {identity === "teacher" && (
              <EditButton onClick={toggleSpecialNotesEditMode}>
                {isSpecialNotesEditing ? "저장" : "수정"}
              </EditButton>
            )}
          </SpecialNotesSection>
        </>
      ) : isHomeroom ? (
        <div>
          <ClassSectionTitle>{formattedDate} - 반 출석 관리</ClassSectionTitle>
          <ClassAttendanceTableWrapper>
            <ClassAttendanceTable>
              <thead>
                <tr>
                  <ClassAttendanceHeaderCell>번호</ClassAttendanceHeaderCell>
                  <ClassAttendanceHeaderCell>이름</ClassAttendanceHeaderCell>
                  <ClassAttendanceHeaderCell>결석</ClassAttendanceHeaderCell>
                  <ClassAttendanceHeaderCell>지각</ClassAttendanceHeaderCell>
                  <ClassAttendanceHeaderCell>조퇴</ClassAttendanceHeaderCell>
                  <ClassAttendanceHeaderCell>결과</ClassAttendanceHeaderCell>
                </tr>
              </thead>
              <tbody>
                {classAttendance.map((student) => (
                  <tr key={student.id}>
                    <ClassAttendanceCell>{student.number}</ClassAttendanceCell>
                    <ClassAttendanceCell>{student.name}</ClassAttendanceCell>
                    <ClassAttendanceCell
                      contentEditable={isClassAttendanceEditing}
                      suppressContentEditableWarning={true}
                      onBlur={(e) =>
                        handleAttendanceInput(
                          student.id,
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
                          student.id,
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
                          student.id,
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
                          student.id,
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
          <ClassAttendanceEditButton onClick={toggleClassAttendanceEditMode}>
            {isClassAttendanceEditing ? "저장" : "수정"}
          </ClassAttendanceEditButton>
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
