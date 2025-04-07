import styled from "styled-components";
import searchButton from "/assets/img/searchButton.png";

export const CounselingContainer = styled.div``;

export const CounselingHeader = styled.p`
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
  border-bottom: 0.0625rem solid black;
`;

export const BoardTable = styled.table`
  width: 82.25rem;
  border-collapse: collapse;
  margin: 1.25rem auto;
  font-size: 1rem;
`;

export const TableHeader = styled.th<{ width?: string }>`
  background-color: #146c94;
  color: white;
  padding: 0.75rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
  font-weight: bold;
  width: ${props => props.width || "auto"};
`;

export const TableCell = styled.td<{ isBold?: boolean }>`
  padding: 0.2rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
  font-weight: ${props => props.isBold ? "bold" : "normal"};
`;

export const TableRow = styled.tr`
  background-color: white;
  &:hover {
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;

export const TitleCell = styled(TableCell)`
  text-align: center;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.25rem 0;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.3rem 0.6rem;
  margin: 0 0.2rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid #dfe3e8;
  background-color: white;
  text-align: center;
  font-family: "Noto Sans";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem;
  color: black;
  cursor: pointer;
  border-color: ${({ active }) => (active ? "#4200FF" : "#ddd")};
  border-width: ${({ active }) => (active ? "0.075rem" : "0.0625rem")};
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 9rem;
  width: 82.25rem;
  margin-left: auto;
  margin-right: auto;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchSelect = styled.select`
  padding: 0.6rem;
  margin-right: 0.5rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #000;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="black"><path d="M12 16l-6-6h12z"/></svg>')
    no-repeat left 0.625rem center;
  padding-left: 2rem;
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
  }
`;

export const SearchInput = styled.input`
  width: 16.25rem;
  height: 2.625rem;
  flex-shrink: 0;
  border: 0.0625rem solid #ddd;
  border-radius: 0.625rem;
  background-color: #329ac9;
  &::placeholder {
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const SearchButton = styled.button`
  width: 3.75rem;
  height: 2.925rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #004260 url(${searchButton}) no-repeat center;
  background-size: 2rem 2rem;
  color: white;
`;

export const WriteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #146c94;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  border-radius: 0.625rem;
`;

export const Comment = styled.div`
  width: 82.25rem;
  height: 5rem;
  margin: 1.25rem auto;
  font-family: "Noto Sans";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: bold;
  color: #000;
  text-align: center;
`;