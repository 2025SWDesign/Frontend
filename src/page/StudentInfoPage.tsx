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
        <StdInfoText>전화번호: 010-xxxx-xxxx</StdInfoText>
        <StdInfoText>집주소: 인천광역시 연수구 xxx로 312-1</StdInfoText>
        <StdInfoText>부모님 연락처: 010-xxxx-xxxx</StdInfoText>
      </StdInfoContent>
    </StdInfoContainer>
  );
};

export default StudentInfoPage;
