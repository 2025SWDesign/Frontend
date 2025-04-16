import React, { useState } from "react";

import {
  FeedbackContainer,
  FeedbackHeader,
  Line,
  FeedbackContentContainer,
  ContentBox,
  ContentTitle,
  ContentForm,
  ButtonContainer,
  SendButton,
  EditButton,
  GradeSelect,
  GuideMessage,
} from "./FeedbackPage.styled";

interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface FeedbackPageProps {
  identity: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({
  identity,
  //isHomeroom,
  selectedStudent,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [feedbacks, setFeedbacks] = useState({
    academic: "",
    behavior: "",
    attendance: "",
    attitude: "",
  });
  const [grade, setGrade] = useState("1");

  const handleChange =
    (field: keyof typeof feedbacks) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFeedbacks({
        ...feedbacks,
        [field]: e.target.value,
      });
    };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSendToStudent = () => {
    // API 호출 로직 추가
    console.log("학생에게 피드백 전송:", feedbacks);
  };

  const handleSendToParent = () => {
    // API 호출 로직 추가
    console.log("학부모에게 피드백 전송:", feedbacks);
  };

  return (
    <FeedbackContainer>
      <FeedbackHeader>피드백 내역</FeedbackHeader>
      <Line />
      {selectedStudent || !(identity == "teacher") ? (
        <>
          <GradeSelect value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
          </GradeSelect>

          <FeedbackContentContainer>
            <ContentBox identity={identity}>
              <ContentTitle>성적</ContentTitle>
              <ContentForm
                value={feedbacks.academic}
                onChange={handleChange("academic")}
                disabled={!isEditing}
                placeholder={isEditing ? "성적에 대한 피드백을 입력하세요" : ""}
                identity={identity}
              />
            </ContentBox>

            <ContentBox identity={identity}>
              <ContentTitle>행동</ContentTitle>
              <ContentForm
                value={feedbacks.behavior}
                onChange={handleChange("behavior")}
                disabled={!isEditing}
                placeholder={isEditing ? "행동에 대한 피드백을 입력하세요" : ""}
                identity={identity}
              />
            </ContentBox>

            <ContentBox identity={identity}>
              <ContentTitle>출결</ContentTitle>
              <ContentForm
                value={feedbacks.attendance}
                onChange={handleChange("attendance")}
                disabled={!isEditing}
                placeholder={isEditing ? "출결에 대한 피드백을 입력하세요" : ""}
                identity={identity}
              />
            </ContentBox>

            <ContentBox identity={identity}>
              <ContentTitle>태도</ContentTitle>
              <ContentForm
                value={feedbacks.attitude}
                onChange={handleChange("attitude")}
                disabled={!isEditing}
                placeholder={isEditing ? "태도에 대한 피드백을 입력하세요" : ""}
                identity={identity}
              />
            </ContentBox>
          </FeedbackContentContainer>

          {identity === "teacher" && (
            <ButtonContainer>
              <div>
                <SendButton onClick={handleSendToStudent} disabled={isEditing}>
                  학생 전송
                </SendButton>
                <SendButton onClick={handleSendToParent} disabled={isEditing}>
                  학부모 전송
                </SendButton>
              </div>
              <EditButton onClick={toggleEditMode}>
                {isEditing ? "저장" : "수정"}
              </EditButton>
            </ButtonContainer>
          )}
        </>
      ) : (
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      )}
    </FeedbackContainer>
  );
};

export default FeedbackPage;
