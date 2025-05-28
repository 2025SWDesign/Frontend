import styled from "styled-components";
import { media } from "../styles/media";

export const SplitScreen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.mobile} {
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
  }
`;

export const LeftCard = styled.div`
  width: 57rem;
  height: 62.5rem;
  border-radius: 1.25rem;
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
  ${media.mobile} {
    height: 3.5rem;
    background: none;
  }
`;

export const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 2.5rem;
  font-weight: 700;
  ${media.mobile} {
    font-size: 2rem;
    margin: 0;
  }
`;

export const WelcomeLogo = styled.img`
  width: 45.75rem;
  height: 25.5rem;
  ${media.mobile} {
    width: 9rem;
    height: 3.25rem;
  }
`;

export const RightCard = styled.div`
  width: 57rem;
  height: 62.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.mobile} {
    width: 100%;
    max-height: calc(100vh - 3.5rem);
  }
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
  ${media.mobile} {
    width: 100%;
    height: auto;
  }
`;

export const DropDown = styled.select`
  width: 32.5rem;
  height: 3.75rem;
  padding: 0.6rem;
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

export const PasswordTitle = styled.h1`
  text-align: center;
  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

export const InputText = styled.div`
  margin: 1rem 0 0.5rem 0.5rem;
  color: #000;
  align-self: flex-start;
  font-family: "Inter";
  font-size: 1.25rem;
  font-weight: 700;
  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const InputArea = styled.div`
  width: 32.5rem;
  height: 3.75rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  border: solid 1px #424242;

  input {
    border: none;
    width: 30rem;
    margin: 0 0.5rem 0 2.5rem;
    background-color: transparent;
    font-size: 1.25rem;
  }

  input:focus {
    outline: none;
  }

  ${media.mobile} {
    width: 22rem;
    height: 2.75rem;
    input {
      border: none;
      width: 20rem;
      margin: 0 0.5rem 0 1.5rem;
      background-color: transparent;
      font-size: 1rem;
    }
  }
`;

export const StudentInputArea = styled.div`
  width: 32.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StudentInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1.8rem;
`;

export const MiniInput = styled.div`
  width: 9.5rem;
  height: 3.75rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  border: solid 1px #424242;

  input {
    display: flex;
    border: none;
    width: 13rem;
    margin: 0 0.5rem 0 1rem;
    background-color: transparent;
    font-size: 1.25rem;
  }

  input:focus {
    outline: none;
  }
`;

//자동 제출 방지용 button type 명시
export const ToggleButton = styled.button.attrs({ type: "button" })`
  background: none;
  border: none;
  margin-right: 1rem;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: #424242;
  }
  ${media.mobile} {
    margin-right: 0.75rem;
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

export const SignButton = styled.button`
  width: 32.5rem;
  height: 4.5rem;
  border-radius: 1.25rem;
  background: #004260;
  margin: 2.75rem 0 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
  }

  ${media.mobile} {
    width: 22rem;
    height: 3rem;
    margin-top: 2rem;
    border-radius: 0.75rem;
    p {
      font-size: 1rem;
    }
  }
`;

export const KakaoButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 22rem;
  height: 3.75rem;
  background: #fee500;
  border-radius: 0.75rem;
  padding: 0 1.5rem 0 1.5rem;
  margin-top: 4rem;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  div {
    width: 100%;
    display: flex;
    justify-content: center;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 400;
  }
  ${media.mobile} {
    width: 18.5rem;
    height: 3rem;
    margin-top: 3rem;
    div {
      font-size: 1rem;
    }
  }
`;

export const EmailButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 22rem;
  height: 3.75rem;
  border-radius: 0.75rem;
  border: 2px solid #b9b9b9;
  padding: 0 1.5rem 0 1.5rem;
  margin-bottom: 4rem;
  cursor: pointer;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    color: #000;
    text-align: center;
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 400;
  }
  ${media.mobile} {
    width: 18.5rem;
    height: 3rem;
    div {
      font-size: 1rem;
    }
  }
`;

export const Line = styled.hr`
  width: 100%;
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
  ${media.mobile} {
    p {
      font-size: 0.75rem;
    }
    a {
      font-size: 0.75rem;
    }
  }
`;

export const SchoolList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SchoolItem = styled.li`
  margin-left: 1rem;
  font-size: 1.15rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
