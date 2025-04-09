import styled from "styled-components";

export const StdInfoContainer = styled.div``;

export const StdInfoHeader = styled.p`
  color: #000;
  font-family: "Noto Sans";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: bold;
  display: flex;
  margin: 1rem 0 1rem 3rem;
`;
export const Line = styled.div`
  width: 90rem;
  height: 0.0625rem;
  border-bottom: 1px solid black;
  width: 100%;
`;

export const StdInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const GuideMessage = styled.div`
  height: 42.75rem;
  display: flex;

  justify-content: center;
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 20.3rem;
`;

export const Table = styled.table`
  margin-left: 3rem;
  width: 46rem;
  border-collapse: collapse;
`;

export const TableRow = styled.tr``;

export const HeaderCell = styled.td`
  width: 20%;
  background-color: #146c94;
  color: white;
  padding: 0.75rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
  font-weight: bold;
`;

export const DataCell = styled.td`
  width: 80%;
  padding: 0.2rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
`;
