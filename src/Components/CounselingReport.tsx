import React from "react";
import {
  CouncelingArea,
  CouncelingContent,
  CouncelingTitle,
  Description,
  DescriptionArea,
  Header,
  Line,
  MainContainer,
  TitleArea,
} from "./CounselingReport.styled";

interface Student {
  name: string;
  grade: number;
  class: number;
  number: number;
  img: string;
}
interface CouncelingReportProps {
  student: Student;
}

const CouncelingReport: React.FC<CouncelingReportProps> = ({ student }) => {
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
        <Description>O월 O일자 상담 내역</Description>
        <Line />
      </DescriptionArea>
      <CouncelingArea>
        <CouncelingTitle>
          <h3>제목: OOO</h3>
          <p>담당자: ooo</p>
        </CouncelingTitle>
        <CouncelingContent>
          Lorem ipsum dolor sit amet consectetur. Risus blandit enim diam
          pellentesque et sodales sem facilisi lacus. Id tincidunt nec lorem
          tincidunt porttitor. Vel pulvinar sociis varius fermentum pellentesque
          neque mauris. Eu nisl volutpat ut gravida sagittis odio at. Faucibus
          purus habitasse turpis proin leo viverra vitae blandit. Nisl velit
          morbi viverra ut interdum. Mi fringilla nisi volutpat egestas id
          tortor. Risus purus sit neque orci. Eu rhoncus porta mattis phasellus
          et elit elit. Diam lorem in malesuada vestibulum. Auctor hac
          sollicitudin donec justo interdum suscipit sed fames. Sem sit purus
          elementum mattis felis arcu turpis mi. Viverra cras et a et proin
          viverra magna vestibulum. Porttitor tempor volutpat neque vivamus.
          Quam lorem massa dictum adipiscing gravida ut nisl. Malesuada dapibus
          dignissim dui sed at et. Blandit enim ultricies et id mattis
          consectetur ut metus. Tristique posuere nunc at vitae ultricies quis
          velit quis sit. Egestas ut ultrices enim viverra morbi maecenas tortor
          elementum. Feugiat vestibulum risus ac nibh lectus elit integer mi
          est. Ut in sed volutpat ut nunc pulvinar hendrerit vulputate. Augue
          massa malesuada nunc mauris pulvinar velit neque risus phasellus.
        </CouncelingContent>
      </CouncelingArea>
    </MainContainer>
  );
};

export default CouncelingReport;
