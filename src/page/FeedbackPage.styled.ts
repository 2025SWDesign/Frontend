import styled from "styled-components";

interface FeedbackPageProps {
  identity: string;
}

export const FeedbackContainer = styled.div``;

export const FeedbackHeader = styled.p`
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
  margin-bottom: 1rem;
`;

export const FeedbackContentContainer = styled.div`
  width: 82rem;
  height: 37rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  margin-left: 3rem;
`;

export const ContentBox = styled.div<FeedbackPageProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;

  ${(props) => props.identity !== "teacher" && `
    margin-bottom: 0.6rem;
  `}
`;

export const ContentTitle = styled.div`
  width: 100%;
  height: 1rem;
  flex-shrink: 0;
  background-color: #146c94;
  padding: 0.75rem 1rem;
  color: #fff;
  font-family: Inter;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: 40%;
`;

export const ContentForm = styled.textarea<FeedbackPageProps>`
  width: 100%;
  height: 4.4rem;
  padding: 1rem;
  border: none;
  resize: none;
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 1.3rem */
  line-height: 1.5;
  outline: none;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    width: 8px;
    display: block; /* 스크롤바 강제 표시 */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  &:disabled {
    background-color: #ffffff;
    cursor: not-allowed;
  }

  ${(props) => props.identity !== "teacher" && `
    height: 5rem;
  `}
`;
export const ButtonContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 84rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  & > div {
    display: flex;
    gap: 1rem;
  }
`;

export const SendButton = styled.button`
  height: 2.5rem;
  background-color: #146c94;
  border-radius: 0.625rem;
  color: white;
  padding: 0rem 1.5rem;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #9db2bf;
    cursor: not-allowed;
  }
`;

export const EditButton = styled.button`
  height: 2.5rem;
  width: 8rem;
  background-color: #146c94;
  border-radius: 0.625rem;
  color: white;
  padding: 0rem 1.5rem;
  border: none;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
