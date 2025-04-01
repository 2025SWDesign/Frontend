import styled from "styled-components";

export const CounselingWriteContainer = styled.div``;

export const CounselingWriteHeader = styled.p`
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

export const Container = styled.div`
  padding: 0 0 0 3rem;
`;

export const Header = styled.div`
  margin-top: 1rem;
  width: 85rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
`;

export const TitleInput = styled.input`
  width: 63rem;
  padding: 0.75rem 1rem;
  font-size: 1.25rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  outline: none;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #146c94;
  }
`;

export const PrivacySection = styled.div`
  padding-left: 2rem;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  padding-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: Inter;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
`;

export const Checkbox = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

export const ContentArea = styled.textarea`
  width: 82rem;
  height: 33.8125rem;
  padding: 0.625rem 0.75rem;
  color: #fff;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  line-height: normal;
  border: 0.0625rem solid #ddd;
  border-radius: 0.5rem;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    border-color: #146c94;
  }
`;

export const ButtonGroup = styled.div`
  width: 84rem;
  display: flex;  
  justify-content: space-between;
  margin-top: 0.5rem;
`;

export const Button = styled.button`
  padding: 0.4rem 2.5rem;
  background-color: #146c94;
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0d5270;
  }
`;
