import styled from "styled-components";
import { media } from "../styles/media";

export const CounselingContainer = styled.div``;

export const CounselingHeader = styled.p`
  color: #000;
  font-family: "Noto Sans";
  font-size: 2.25rem;
  font-style: normal;
  font-weight: bold;
  display: flex;
  margin: 1rem 0 1rem 3rem;
  ${media.mobile} {
    margin-left: 10.5rem;
    font-size: 1.3rem;
  }
`;

export const Line = styled.div`
  width: 90rem;
  height: 0.0625rem;
  border-bottom: 0.0625rem solid black;
`;

export const BoardTable = styled.table`
  width: 82.25rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border-collapse: collapse;
  margin: 1.25rem auto;
  font-size: 1rem;

  ${media.mobile} {
    width: 97%;
    margin-top : 0.5rem;
`;

export const TableHeader = styled.th<{ width?: string }>`
  background-color: #146c94;
  color: white;
  padding: 0.75rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
  font-weight: bold;
  width: ${(props) => props.width || "auto"};

  &.hideOnMobile {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

export const TableCell = styled.td<{ isBold?: boolean }>`
  padding: 0.2rem;
  border: 0.0625rem solid #ddd;
  text-align: center;
  font-weight: ${(props) => (props.isBold ? "bold" : "normal")};

   &.hideOnMobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  ${media.mobile} {
    font-size: 0.875rem;
    height: 2.5rem;
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

  ${media.mobile} {
    margin-top: 3.5rem;
  }
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

  ${media.mobile} {
    font-size: 0.7rem;
    margin-left: 0.5rem;
  }
`;

export const SearchInput = styled.input`
  width: 16.25rem;
  height: 2.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem 0rem 0rem 0.625rem;
  border: 1px solid #000;
  background: #fff;
  font-size: 1.3rem;
  padding-left: 1rem;

  &::placeholder {
    color: #424242;
    text-align: center;
    font-family: "Inter";
    font-size: 1rem;
    font-weight: 700;
  }

  ${media.mobile} {
    height: 2.2rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    width: 14.5rem;

    &::placeholder {
      font-size: 0.8rem;
    }
  }
`;

export const SearchButton = styled.button`
  width: 3.75rem;
  height: 2.9rem;
  flex-shrink: 0;
  border: none;
  border-radius: 0rem 0.625rem 0.625rem 0rem;
  background: #004260;
  background-size: 2rem 2rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }

  ${media.mobile} {
    width: 3.5rem;
    height: 2.5rem;
  }
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

export const GuideMessage = styled.div`
  height: 42.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: "Noto Sans";
  font-size: 1.5rem;
  font-weight: 400;
`;

export const DateSection = styled.div`
  display: flex;
  align-items: center;
`;

export const DateInput = styled.input`
  width: 13rem;
  margin-right: 0.5rem;
  height: 2.9rem;
  color: #424242;
  text-align: center;
  font-family: "Inter";
  font-size: 1rem;
  font-weight: 700;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  outline: none;

  &:focus {
    border-color: #146c94;
  }
`;
