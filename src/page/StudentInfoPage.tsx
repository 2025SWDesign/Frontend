import React from "react";
import {
  StdInfoContainer,
  StdInfoHeader,
  StdInfoContent,
  StdInfoText,
  Line,
  GuideMessage,
} from "./StudentInfoPage.styled";

interface Student {
  name: string;
  grade: number;
  class: number;
  number: number;
  img: string;
}

interface StudentInfoPageProps {
  identity: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

const StudentInfoPage: React.FC<StudentInfoPageProps> = ({ identity }) => {
  return (
    <StdInfoContainer>
      <StdInfoHeader>학생 정보</StdInfoHeader>
      <Line />
      {identity == "teacher" ? (
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      ) : (
        <StdInfoContent>
          <StdInfoText>전화번호: 010-xxxx-xxxx</StdInfoText>
          <StdInfoText>집주소: 인천광역시 연수구 xxx로 312-1</StdInfoText>
          <StdInfoText>부모님 연락처: 010-xxxx-xxxx</StdInfoText>
        </StdInfoContent>
      )}
    </StdInfoContainer>
  );
};

export default StudentInfoPage;
