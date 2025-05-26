import styled from "styled-components";
import { media } from "../styles/media";

export const MainContainer = styled.div`
  width: 61.5rem;
  min-height: 55.625rem;
  height: auto;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.mobile} {
    width: 100%;
  }
`;

export const Header = styled.header`
  width: 54rem;
  height: 5.1rem;
  margin-top: 2.25rem;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: #fff;

  display: flex;
  flex-direction: column;
  color: #000;
  text-align: center;
  font-family: "Inter";
  padding: 2rem 0 2rem 3rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: start;
  p {
    margin: 0;
  }
  ${media.mobile} {
    width: 22rem;
    height: 4rem;
  }
`;

export const TitleArea = styled.div`
  display: flex;
  color: #000;
  text-align: center;
  font-family: "Inter";
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
  }
  p {
    font-size: 2.5rem;
    font-weight: 400;
    margin: 0 1rem;
  }

  ${media.mobile} {
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1.5rem;
    }
  }
`;

export const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
export const Description = styled.div`
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2.5rem;
`;

export const Line = styled.div`
  width: 57rem;
  height: 0.0625rem;
  border-bottom: 0.0625rem solid black;
  margin-bottom: 1.4rem;
  ${media.mobile} {
    width: 25rem;
  }
`;

export const GradeTable = styled.div`
  border-radius: 0.5rem;

  table {
    width: 57rem;
    border: 1px solid #b9b9b9;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    table-layout: fixed;
  }

  tr {
    height: 2rem;
  }

  th,
  td {
    border: 1px solid #b9b9b9;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
  }

  th {
    background: #146c94;
    color: #fff;
  }

  table tr:first-child th:first-child {
    border-top-left-radius: 0.5rem;
  }

  table tr:first-child th:last-child {
    border-top-right-radius: 0.5rem;
  }

  table tr:last-child td:first-child {
    border-bottom-left-radius: 0.5rem;
  }

  table tr:last-child td:last-child {
    border-bottom-right-radius: 0.5rem;
  }
  ${media.mobile} {
    table {
      width: 24.5rem;
      border: 1px solid #b9b9b9;
      border-collapse: separate;
      border-spacing: 0;
      border-radius: 0.5rem;
      overflow: hidden;
      table-layout: fixed;
    }
  }
`;

export const ChartBox = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.mobile} {
    margin-top: 0.5rem;
  }
`;
