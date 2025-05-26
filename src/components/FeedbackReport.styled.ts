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

export const FeedbackArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 57rem;
  min-height: 10rem;
  border-radius: 0.25rem;
  border: 1px solid #b9b9b9;
  margin-bottom: 1.5rem;
  ${media.mobile} {
    width: 25rem;
  }
`;

export const FeedbackTitle = styled.div`
  height: 2rem;
  border-radius: 0.25rem 0.25rem 0rem 0rem;
  background: #146c94;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: "Inter";
  font-weight: 700;
  font-size: 1rem;
  padding: 0.25rem 0.25rem 0.25rem 0.7rem;
  ${media.mobile} {
    height: 1.5rem;
    font-size: 0.75rem;
  }
`;

export const FeedbackContent = styled.div`
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  ${media.mobile} {
    font-size: 0.75rem;
  }
`;
