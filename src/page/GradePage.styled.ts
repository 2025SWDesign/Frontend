import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    align-self: flex-start;
    color: #000;
    font-family: "Noto Sans";
    font-size: 2.25rem;
    font-style: normal;
    font-weight: bold;
    display: flex;
    margin: 1rem 0 1rem 3rem;
  }
`;

export const Line = styled.div`
  width: 90rem;
  height: 0.0625rem;
  border-bottom: 0.0625rem solid black;
`;

export const GradeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TableArea = styled.div`
  width: 57.5rem;
  height: 44.75rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 3rem;
`;

export const DropdownBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DropDown = styled.select<{ id?: string }>`
  margin: 1rem 0 1rem 0rem;
  width: 7.25rem;
  height: 2.75rem;
  padding: 0.6rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #000;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 37 37" fill="none"><path d="M18.4991 23.0864C18.2935 23.0864 18.0941 23.0479 17.9009 22.9708C17.7077 22.8937 17.5474 22.791 17.4199 22.6625L10.3283 15.5708C10.0456 15.2882 9.9043 14.9285 9.9043 14.4916C9.9043 14.0548 10.0456 13.6951 10.3283 13.4125C10.6109 13.1298 10.9706 12.9885 11.4074 12.9885C11.8442 12.9885 12.204 13.1298 12.4866 13.4125L18.4991 19.425L24.5116 13.4125C24.7942 13.1298 25.154 12.9885 25.5908 12.9885C26.0276 12.9885 26.3873 13.1298 26.6699 13.4125C26.9526 13.6951 27.0939 14.0548 27.0939 14.4916C27.0939 14.9285 26.9526 15.2882 26.6699 15.5708L19.5783 22.6625C19.4241 22.8167 19.2571 22.9261 19.0772 22.9909C18.8974 23.0556 18.7046 23.0875 18.4991 23.0864Z" fill="%23666666"/></svg>')
    no-repeat left 0.625rem center;
  background-color: white;

  text-align: center;
  color: #424242;
  font-family: "Noto Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;

  &:option {
    color: #424242;
    font-family: "Noto Sans";
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    margin-left: 1rem;
  }

  ${(props) => props.id === "semester" && `margin-left: 0.8rem;`}
`;

export const GradeTable = styled.div`
  border-radius: 0.5rem;

  table {
    width: 51.25rem;
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
`;

export const ScoreInput = styled.input`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  width: 16.25rem;
  height: 1.3rem;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  width: 10rem;
  height: 2.5rem;
  background: #e0e0e0;
  border-radius: 3.125rem;
  position: relative;
  margin-top: 1.5rem;
`;

export const ToggleButton = styled.div<{ $isPeriod: boolean }>`
  width: 5rem;
  height: 2.25rem;
  background: white;
  border-radius: 3.125rem;
  top: 0.1rem;
  position: absolute;
  left: ${({ $isPeriod }) => ($isPeriod ? "0.1rem" : "4.9rem")};
  transition: left 0.3s ease-in-out;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const OptionButton = styled.div<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: bold;
  color: ${({ $isActive }) => ($isActive ? "#000" : "#858585")};
  position: relative;
  z-index: 1;
  cursor: pointer;
`;

export const ButtonArea = styled.div`
  width: 51.25rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
`;

export const EditButton = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background: #146c94;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1.25rem;
  cursor: pointer;
`;

export const CancleButton = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background: #424242;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  margin: 1.25rem 0 0 0;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  width: 7.5rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  background: #329ac9;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 700;
  margin: 1.25rem 0 0 1rem;
  cursor: pointer;
`;

export const ChartArea = styled.div`
  width: 32.5rem;
  height: 44.75rem;
  border-left: 0.0625rem solid #000;
`;

export const ChartTitle = styled.div`
  align-self: flex-start;
  width: 30rem;
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  border-bottom: 1px solid black;
  padding: 1rem 0 1rem 1rem;
`;

export const ChartBox = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
