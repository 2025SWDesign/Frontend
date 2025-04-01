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
} from "./StudentManagementPage.styled";

const StudentManagementPage = () => {
  // 학생 기본 정보 상태
  const [basicInfo, setBasicInfo] = useState({
    name: "홍길동",
    grade: "1",
    class: "3",
    number: "15",
  });

  // 특기사항 및 편집 모드 상태
  const [specialNotes, setSpecialNotes] = useState("");
  const [isSpecialNotesEditing, setIsSpeicalNotesEditing] = useState(false);
  const [isAttendanceEditing, setIsAttendanceEditing] = useState(false);

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

      {/* 학생 기본정보 수정 섹션 수정 */}
      <BasicInfoSection>
        <SectionTitle>학생 기본정보 수정</SectionTitle>
        <InfoRow>
          <InfoContent>
            <InfoLabel>이름</InfoLabel>
            <InfoInput type="text" onChange={handleBasicInfoChange("name")} />
            <InfoLabel>학년</InfoLabel>
            <InfoInput type="text" onChange={handleBasicInfoChange("grade")} />
            <InfoLabel>반</InfoLabel>
            <InfoInput type="text" onChange={handleBasicInfoChange("class")} />
            <InfoLabel>번호</InfoLabel>
            <InfoInput type="text" onChange={handleBasicInfoChange("number")} />
            <UpdateButton onClick={handleUpdateBasicInfo}>적용</UpdateButton>
          </InfoContent>
        </InfoRow>
      </BasicInfoSection>

      {/* 해당 학기 출석 섹션 */}
      <SemesterAttendanceSection>
        <SectionTitle>해당 학기 출석</SectionTitle>
        {/* 해당 학기 출석 테이블의 "총" 열 추가 */}
        <AttendanceTableWrapper>
          <AttendanceTable>
            <thead>
              <tr>
                <AttendanceHeaderCell></AttendanceHeaderCell>
                <AttendanceHeaderCell>총</AttendanceHeaderCell>
                {semesterDates.map((date) => (
                  <AttendanceHeaderCell key={date}>{date}</AttendanceHeaderCell>
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
                      onInput={(e) => updateTotalAttendance(category)}
                    ></AttendanceCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </AttendanceTable>
        </AttendanceTableWrapper>
        <AttendanceEditButton onClick={toggleAttendanceEditMode}>
          {isAttendanceEditing ? "저장" : "수정"}
        </AttendanceEditButton>
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
      <SpecialNotesSection>
        <SectionTitle>특기 사항</SectionTitle>
        <NotesForm
          value={specialNotes}
          onChange={handleSpecialNotesChange}
          disabled={!isSpecialNotesEditing}
          placeholder={
            isSpecialNotesEditing ? "학생의 특기 사항을 입력하세요" : ""
          }
        />
        <EditButton onClick={toggleSpecialNotesEditMode}>
          {isSpecialNotesEditing ? "저장" : "수정"}
        </EditButton>
      </SpecialNotesSection>
    </StudentManagementContainer>
  );
};

export default StudentManagementPage;
