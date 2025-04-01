import React, { useState } from "react";
import {
  CounselingWriteContainer,
  CounselingWriteHeader,
  Line,
  Container,
  Header,
  TitleInput,
  PrivacySection,
  CheckboxLabel,
  Checkbox,
  ContentArea,
  ButtonGroup,
  Button,
} from "./CounselingWritePage.styled";

const CounselingWritePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = () => {
    // 여기에 저장 로직 구현
    console.log({
      title,
      content,
      isPrivate,
    });
  };

  const handleGoBack = () => {
    // 뒤로가기 로직
    window.history.back();
  };

  return (
    <CounselingWriteContainer>
      <CounselingWriteHeader>상담 내역</CounselingWriteHeader>
      <Line />
      <Container>
        <Header>
          <TitleInput
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <PrivacySection>
            <CheckboxLabel>
              <strong>같은 과목에게만 공개</strong>
              <Checkbox
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
            </CheckboxLabel>
          </PrivacySection>
        </Header>

        <ContentArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <ButtonGroup>
          <Button onClick={handleGoBack}>뒤로가기</Button>
          <Button onClick={handleSubmit}>저장</Button>
        </ButtonGroup>
      </Container>
    </CounselingWriteContainer>
  );
};

export default CounselingWritePage;
