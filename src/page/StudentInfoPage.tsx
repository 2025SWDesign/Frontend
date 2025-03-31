import React from "react";
import {
  StdInfoContainer,
  StdInfoHeader,
  StdInfoContent,
  StdInfoText,
  Line,
} from "./StudentInfoPage.styled";

const StudentInfoPage: React.FC = () => {
  return (
    <StdInfoContainer>
      <StdInfoHeader>학생 정보</StdInfoHeader>
      <Line /> 
      <StdInfoContent>
        <StdInfoText>전화번호:</StdInfoText>
        <StdInfoText>집주소:</StdInfoText>
        <StdInfoText>부모님 연락처:</StdInfoText>
      </StdInfoContent>
    </StdInfoContainer>
  );
};

export default StudentInfoPage;
