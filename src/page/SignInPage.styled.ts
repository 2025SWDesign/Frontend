import styled from "styled-components";

// SplitScreen: 전체 레이아웃
export const SplitScreen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftCard = styled.div`
  width: 57rem;
  height: 59.5rem;
  border-radius: 1.25rem 0rem 0rem 1.25rem;
  background: #004260;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.75rem;
  font-weight: 100;

  p {
    margin: 2rem 0;
    font-weight: normal;
  }
`;

export const WelcomeLogo = styled.img`
  width: 45.75rem;
  height: 25.5rem;
`;

export const RightCard = styled.div`
  width: 57rem;
  height: 59.5rem;
  border-radius: 0rem 1.25rem 1.25rem 0rem;
  background: #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InnerContent = styled.div`
  height: 100vh;
  width: 32.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    color: white;
    font-weight: bold;
    font-size: 3.5rem;
  }
`;

export const DropDown = styled.select`
  width: 32.5rem;
  height: 4.25rem;
  padding: 0.6rem;
  margin-right: 0.5rem;
  border-radius: 0.625rem;
  border: 0.0625rem solid #000;
  appearance: none;
  padding-left: 2rem;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none"><path d="M18.4991 23.0864C18.2935 23.0864 18.0941 23.0479 17.9009 22.9708C17.7077 22.8937 17.5474 22.791 17.4199 22.6625L10.3283 15.5708C10.0456 15.2882 9.9043 14.9285 9.9043 14.4916C9.9043 14.0548 10.0456 13.6951 10.3283 13.4125C10.6109 13.1298 10.9706 12.9885 11.4074 12.9885C11.8442 12.9885 12.204 13.1298 12.4866 13.4125L18.4991 19.425L24.5116 13.4125C24.7942 13.1298 25.154 12.9885 25.5908 12.9885C26.0276 12.9885 26.3873 13.1298 26.6699 13.4125C26.9526 13.6951 27.0939 14.0548 27.0939 14.4916C27.0939 14.9285 26.9526 15.2882 26.6699 15.5708L19.5783 22.6625C19.4241 22.8167 19.2571 22.9261 19.0772 22.9909C18.8974 23.0556 18.7046 23.0875 18.4991 23.0864Z" fill="%23666666"/></svg>')
    no-repeat left 0.625rem center;
  padding-left: 3rem;
  background-color: white;
  color: #424242;
  font-family: "Noto Sans";
  font-size: 1.5rem;
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
`;

export const InputText = styled.div`
  margin: 1rem 0 0.5rem 0.5rem;
  color: #000;
  align-self: flex-start;
  font-family: "Inter";
  font-size: 1.5rem;
  font-weight: 700;
`;

// InputArea: 입력 필드 스타일
export const InputArea = styled.div`
  width: 32.5rem;
  height: 4rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;

  input {
    border: none;
    width: 23.5rem;
    margin: 0 0.5rem 0 2.5rem;
    background-color: transparent;
    font-size: 1.5rem;
  }

  input:focus {
    outline: none;
  }
`;

export const SignButton = styled.button`
  width: 32.5rem;
  height: 4.875rem;
  border-radius: 1.25rem;
  background: #004260;
  margin: 2.75rem 0 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }
`;

export const Line = styled.div`
  width: 45rem;
  height: 0.0625rem;
  background: #424242;
  margin: 1rem;
`;
export const SecondaryArea = styled.div`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  color: white;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 1.5rem;
  }

  p {
    font-size: 1rem;
    margin: 0.25rem 0.5rem;
    color: black;
  }

  a {
    font-size: 1rem;
    margin: 0.1rem;
    color: #146c94;
    font-weight: 700;
    text-decoration: underline;
  }
`;
