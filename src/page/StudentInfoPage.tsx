import React from "react";
import {
  StdInfoContainer,
  StdInfoHeader,
  StdInfoContent,
  Line,
  GuideMessage,
  Table,
  TableRow,
  HeaderCell,
  DataCell,
} from "./StudentInfoPage.styled";

interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface StudentInfoPageProps {
  identity: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

const StudentInfoPage: React.FC<StudentInfoPageProps> = ({ identity, selectedStudent }) => {
  return (
    <StdInfoContainer>
      <StdInfoHeader>학생 정보</StdInfoHeader>
      <Line />
      {identity === "teacher" && !selectedStudent ? (
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      ) : (
        <StdInfoContent>
          <Table>
            <TableRow>
              <HeaderCell>전화번호</HeaderCell>
              <DataCell>010-xxxx-xxxx</DataCell>
            </TableRow>
            <TableRow>
              <HeaderCell>집주소</HeaderCell>
              <DataCell>인천광역시 연수구 xxx로 312-1</DataCell>
            </TableRow>
            <TableRow>
              <HeaderCell>부모님 연락처</HeaderCell>
              <DataCell>010-xxxx-xxxx</DataCell>
            </TableRow>
          </Table>
        </StdInfoContent>
      )}
    </StdInfoContainer>
  );
};

export default StudentInfoPage;