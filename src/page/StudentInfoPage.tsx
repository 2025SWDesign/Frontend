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
import { useAuthStore } from "../stores/authStore";
import { useStudentStore } from "../stores/studentStore";

const StudentInfoPage: React.FC = () => {
  const role = useAuthStore((state) => state.role);
  const selectedStudent = useStudentStore((state) => state.selectedStudent);
  const info = useStudentStore((s) => s.extraInfo);

  return (
    <StdInfoContainer>
      <StdInfoHeader>학생 정보</StdInfoHeader>
      <Line />
      {role === "TEACHER" && !selectedStudent ? (
        <GuideMessage>
          좌측 검색창에서 학생정보를 조회할 학생을 검색하세요.
        </GuideMessage>
      ) : (
        <StdInfoContent>
          <Table>
            <tbody>
              <TableRow>
                <HeaderCell>이메일</HeaderCell>
                <DataCell>{info?.email}</DataCell>
              </TableRow>
              <TableRow>
                <HeaderCell>전화번호</HeaderCell>
                <DataCell>{info?.phonenumber}</DataCell>
              </TableRow>
              <TableRow>
                <HeaderCell>부모님 연락처</HeaderCell>
                <DataCell>{info?.homenumber}</DataCell>
              </TableRow>
              <TableRow>
                <HeaderCell>집주소</HeaderCell>
                <DataCell>{info?.address}</DataCell>
              </TableRow>
            </tbody>
          </Table>
        </StdInfoContent>
      )}
    </StdInfoContainer>
  );
};

export default StudentInfoPage;
