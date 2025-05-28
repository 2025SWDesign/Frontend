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

export const CouncelingArea = styled.div`
  width: 57rem;
  height: 32rem;
  border-radius: 0.625rem;
  border: 1px solid #b9b9b9;
  ${media.mobile} {
    width: 25rem;
  }
`;

export const CouncelingTitle = styled.div`
  height: 2.75rem;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
  background: #146c94;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: "Inter";
  font-weight: 700;
  h3 {
    font-size: 1.25rem;
    margin: 0 0 0 1rem;
  }
  p {
    font-size: 1.25rem;
    margin: 0 1rem 0 0;
  }
  ${media.mobile} {
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const CouncelingContent = styled.div`
  padding: 1rem 1.5rem 1rem 1.5rem;
  color: #000;
  font-family: Inter;
  font-size: 1rem;
  font-weight: 400;
  ${media.mobile} {
    font-size: 0.75rem;
  }
`;
