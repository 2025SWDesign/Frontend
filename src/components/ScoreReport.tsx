import React from "react";
import {
  Description,
  DescriptionArea,
  Header,
  Line,
  MainContainer,
  TitleArea,
  ChartBox,
  GradeTable,
} from "./ScoreReport.styled";
import RadarChart from "./RadarChart";

interface Student {
  studentId: number;
  name: string;
  grade: number;
  gradeClass: number;
  number: number;
  img: string;
}

interface ScoreReportProps {
  student: Student;
  grade: string;
  semester: string;
  tableData: { subject: string; score: number; grade: number }[];
  chartData: { name: string; value: number }[];
}

const ScoreReport: React.FC<ScoreReportProps> = ({
  student,
  grade,
  semester,
  tableData,
  chartData,
}) => {
  const fullSemester = `${grade}학년 ${semester}학기`;
  return (
    <MainContainer>
      <Header>
        <p>
          {student.grade}학년 {student.gradeClass}반 {student.number}번
        </p>
        <TitleArea>
          <h1>{student.name} 학생</h1>
          <p>성적 분석 보고서</p>
        </TitleArea>
      </Header>
      <DescriptionArea>
        <Description>{fullSemester} 성적</Description>
        <Line />
      </DescriptionArea>
      <GradeTable>
        <table>
          <thead>
            <tr>
              <th>과목</th>
              <th>성적</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.subject}>
                <td>{row.subject}</td>
                <td>{row.score}</td>
                <td>{row.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GradeTable>
      <DescriptionArea>
        <Description>{fullSemester} 성적 통계</Description>
        <Line />
      </DescriptionArea>
      <ChartBox>
        <RadarChart data={chartData} />
      </ChartBox>
    </MainContainer>
  );
};

export default ScoreReport;
