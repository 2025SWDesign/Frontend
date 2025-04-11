import React from "react";
import {
  Description,
  DescriptionArea,
  FeedbackArea,
  FeedbackContent,
  FeedbackTitle,
  Header,
  Line,
  MainContainer,
  TitleArea,
} from "./FeedbackReport.styled";

interface Student {
  name: string;
  grade: number;
  class: number;
  number: number;
  img: string;
}
interface FeedbackReportProps {
  student: Student;
  grade: string;
}

const FeedbackReport: React.FC<FeedbackReportProps> = ({ student, grade }) => {
  return (
    <MainContainer>
      <Header>
        <p>
          {student.grade}학년 {student.class}반 {student.number}번
        </p>
        <TitleArea>
          <h1>{student.name} 학생</h1>
          <p>상담 내역 보고서</p>
        </TitleArea>
      </Header>
      <DescriptionArea>
        <Description>{grade}학년 피드백 내역</Description>
        <Line />
      </DescriptionArea>
      <FeedbackArea>
        <FeedbackTitle>성적</FeedbackTitle>
        <FeedbackContent>
          Lorem ipsum dolor sit amet consectetur. Pharetra urna mauris vel elit
          diam tortor porta. Faucibus dui amet tellus adipiscing. Eget sit massa
          ullamcorper lectus in vel purus vel. Non auctor tellus ac ut eu mattis
          laoreet. Pellentesque arcu metus elementum orci sit tellus elit.
          Turpis nulla egestas eget lacus in etiam. Ultricies vitae pulvinar
          augue pulvinar ut vulputate at nisl non. Lorem in at curabitur ipsum
          hac malesuada. Est massa quis facilisi egestas amet rhoncus donec
          egestas elementum.
        </FeedbackContent>
      </FeedbackArea>
      <FeedbackArea>
        <FeedbackTitle>행동</FeedbackTitle>
        <FeedbackContent>
          Lorem ipsum dolor sit amet consectetur. Pharetra urna mauris vel elit
          diam tortor porta. Faucibus dui amet tellus adipiscing. Eget sit massa
          ullamcorper lectus in vel purus vel. Non auctor tellus ac ut eu mattis
          laoreet. Pellentesque arcu metus elementum orci sit tellus elit.
          Turpis nulla egestas eget lacus in etiam. Ultricies vitae pulvinar
          augue pulvinar ut vulputate at nisl non. Lorem in at curabitur ipsum
          hac malesuada. Est massa quis facilisi egestas amet rhoncus donec
          egestas elementum.
        </FeedbackContent>
      </FeedbackArea>
      <FeedbackArea>
        <FeedbackTitle>출결</FeedbackTitle>
        <FeedbackContent>
          Lorem ipsum dolor sit amet consectetur. Pharetra urna mauris vel elit
          diam tortor porta. Faucibus dui amet tellus adipiscing. Eget sit massa
          ullamcorper lectus in vel purus vel. Non auctor tellus ac ut eu mattis
          laoreet. Pellentesque arcu metus elementum orci sit tellus elit.
          Turpis nulla egestas eget lacus in etiam. Ultricies vitae pulvinar
          augue pulvinar ut vulputate at nisl non. Lorem in at curabitur ipsum
          hac malesuada. Est massa quis facilisi egestas amet rhoncus donec
          egestas elementum.
        </FeedbackContent>
      </FeedbackArea>
      <FeedbackArea>
        <FeedbackTitle>태도</FeedbackTitle>
        <FeedbackContent>
          Lorem ipsum dolor sit amet consectetur. Pharetra urna mauris vel elit
          diam tortor porta. Faucibus dui amet tellus adipiscing. Eget sit massa
          ullamcorper lectus in vel purus vel. Non auctor tellus ac ut eu mattis
          laoreet. Pellentesque arcu metus elementum orci sit tellus elit.
          Turpis nulla egestas eget lacus in etiam. Ultricies vitae pulvinar
          augue pulvinar ut vulputate at nisl non. Lorem in at curabitur ipsum
          hac malesuada. Est massa quis facilisi egestas amet rhoncus donec
          egestas elementum.
        </FeedbackContent>
      </FeedbackArea>
    </MainContainer>
  );
};

export default FeedbackReport;
