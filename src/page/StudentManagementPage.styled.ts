import styled from "styled-components";
import { media } from "../styles/media";

interface StudentManagementPageProps {
  role: string;
}

export const StudentManagementContainer = styled.div``;

export const StudentManagementHeader = styled.p`
  color: #000;
  font-family: "Noto Sans";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: bold;
  display: flex;
  margin: 1rem 0 1rem 3rem;

  ${media.mobile} {
    margin-left: 10.5rem;
    font-size: 1.3rem;
  }
`;

export const Line = styled.div`
  width: 90rem;
  height: 0.0625rem;
  border-bottom: 0.0625rem solid black;
  margin-bottom: 0.5rem;

  ${media.mobile} {
    width: 100%;
  }
`;

export const SectionTitle = styled.div`
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;

  white-space: normal;
  word-break: break-all;
  overflow-wrap: break-word;
`;

export const SectionNote = styled.span`
  color: #000;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  margin-left: 0.2rem;
`;

// 해당 학기 출석 섹션
export const SemesterAttendanceSection = styled.section<StudentManagementPageProps>`
  margin-left: 2.5rem;
  margin-top: 1.5rem;
  width: 78rem;

  ${media.mobile} {
    width: 90%;
    margin-left: 1rem;
    margin-bottom: 1rem;  
    font-size: 0.7rem;
  }
`;

export const AttendanceTableWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
`;

export const AttendanceTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 800px;
`;

export const AttendanceHeaderCell = styled.th`
  padding: 0.15rem;
  background-color: #146c94;
  color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: #146c94;
    min-width: 4rem;
  }

  
`;

export const AttendanceEditButton = styled.button`
  margin-left: 73rem;
  background-color: #146c94;
  width: 5rem;
  height: 2rem;
  color: white;

  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const AttendanceCell = styled.td`
  padding: 0.35rem;
  border: 1px solid #e0e0e0;
  text-align: center;
  min-width: 4rem;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: #f5f5f5;
  }

  &[contenteditable="true"]:focus {
    outline: 2px solid #146c94;
    outline-offset: -2px;
  }
`;

// 학생 출결 정보 섹션
export const StudentAttendanceSection = styled.section<StudentManagementPageProps>`
  margin-top: 2rem;
  margin-left: 2.5rem;
  margin-bottom: 1rem;

  ${(props) =>
    props.role === "TEACHER" &&
    `
    margin-top: 0rem;
  `}

  ${media.mobile} {
    margin-left: 1rem;
  }
`;

export const AttendanceSummaryTable = styled.table`
  border-collapse: collapse;
  width: 78rem;
  border-radius: 0.5rem;
  overflow: hidden;
  
  ${media.mobile} {
    width: 95%;
    font-size: 0.7rem;
  }
`;

// 출결 정보 테이블의 컬러 스타일 추가
export const SummaryHeaderCell = styled.th`
  padding: 0.15rem;
  background-color: #146c94;
  color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-weight: bold;
  white-space: nowrap;

  &:first-child:nth-last-child(n + 1):first-child {
    border-top-left-radius: 0.5rem;
  }

  &:last-child:nth-child(n + 1):first-child {
    border-top-right-radius: 0.5rem;
  }
`;

export const SummarySubHeaderCell = styled.th`
  padding: 0.15rem;
  background-color: #146c94;
  color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-weight: bold;


`;

export const SummaryCell = styled.td`
  padding: 0.15rem;
  border: 1px solid #e0e0e0;
  text-align: center;

  tr:last-child &:first-child {
    border-bottom-left-radius: 0.5rem;
  }

  tr:last-child &:last-child {
    border-bottom-right-radius: 0.5rem;
  }
`;

// 특기 사항 섹션
export const SpecialNotesSection = styled.section<StudentManagementPageProps>`
  flex-direction: column;
  display: flex;
  margin-left: 2.5rem;
  margin-bottom: 1rem;
  margin-top: 2rem;

  ${media.mobile} {
    margin-left: 1rem;
    margin-top : -0rem;
  }
`;

export const NotesForm = styled.textarea<StudentManagementPageProps>`
  width: 76rem;
  height: 10rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;

  font-family: "Noto Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.5;

  overflow-y: auto;
  resize: none;

  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }

  ${(props) =>
    props.role !== "TEACHER" &&
    `
    height: 12rem;
  `}

  ${media.mobile} {
    width: 87%;
    font-size: 0.7rem;
    height: 14rem;
  }
`;

export const EditButton = styled.button`
  margin-left: 73rem;
  background-color: #146c94;
  width: 5rem;
  height: 2rem;
  color: white;

  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ClassAttendanceTableWrapper = styled.div`
  overflow-y: scroll;
  max-height: 37rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  margin-top: 1rem;
  width: 55rem;
  margin-left: 3rem;
`;

export const ClassAttendanceTable = styled.table`
  border-collapse: collapse;

  width: 100%;
`;

export const ClassAttendanceHeaderCell = styled.th`
  padding: 0.15rem;
  background-color: #146c94;
  color: white;
  border: 1px solid #e0e0e0;
  text-align: center;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1;

  &:first-child {
    width: 2rem;
  }
  &:nth-child(2) {
    width: 4rem;
  }
  &:nth-child(3) {
    width: 3rem;
  }
  &:nth-child(4) {
    width: 3rem;
  }
  &:nth-child(5) {
    width: 3rem;
  }
  &:nth-child(6) {
    width: 3rem;
  }
`;

export const ClassAttendanceCell = styled.td`
  padding: 0.35rem;
  border: 1px solid #e0e0e0;
  text-align: center;
`;
export const ClassAttendanceEditButton = styled.button`
  margin-left: 53rem;
  background-color: #146c94;
  width: 5rem;
  height: 2rem;
  color: white;

  border: none;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.3s ease;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ClassSectionTitle = styled.div`
  margin-left: 2.5rem;
  margin-top: 1rem;
  height: 2rem;
  width: 40rem;
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
`;

export const GuideMessage = styled.div`
  height: 42.75rem;
  display: flex;

  justify-content: center;
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 20.3rem;
`;
