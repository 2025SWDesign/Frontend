import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  author: string;
  subject: string;
  counselingDate: string;
  content: string;
  isPrivate: boolean;
  nextCounselingDate: string;
}

interface LocationState {
  post: Post;
  viewOnly: boolean;
}

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
  SaveButton,
  CancelButton,
  DateInput, 
  DateLabel, 
  DateSection, 
} from "./CounselingWritePage.styled";

const CounselingWritePage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState || { viewOnly: false };
  // 안전하게 값을 추출
  const post = state.post;
  const viewOnly = state.viewOnly || false;
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [nextCounselingDate, setNextCounselingDate] = useState("");

  // Load post data when component mounts or when post changes
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setIsPrivate(post.isPrivate || false);
      setNextCounselingDate(post.nextCounselingDate || "");
    }
  }, [post]);

  const handleSubmit = () => {
    // 여기에 저장 로직 구현
    console.log({
      title,
      content,
      isPrivate,
      nextCounselingDate,
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
            disabled={viewOnly}
          />
          
          <DateSection>
            <DateLabel>다음 상담 기간</DateLabel>
            <DateInput
              type="date"
              value={nextCounselingDate}
              onChange={(e) => setNextCounselingDate(e.target.value)}
              disabled={viewOnly}
            />
          </DateSection>
          
          <PrivacySection>
            <CheckboxLabel>
              <strong>동일 과목 교사에게 공개</strong>
              <Checkbox
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
                disabled={viewOnly}
              />
            </CheckboxLabel>
          </PrivacySection>
        </Header>

        <ContentArea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={viewOnly}
        />

        <ButtonGroup>
          <CancelButton onClick={handleGoBack}>취소</CancelButton>
          {!viewOnly && <SaveButton onClick={handleSubmit}>저장</SaveButton>}
        </ButtonGroup>
      </Container>
    </CounselingWriteContainer>
  );
};

export default CounselingWritePage;