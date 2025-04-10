import React, { useState } from "react";
import Logo from "/assets/img/Logo_2w.png";
import {
  SplitScreen,
  LeftCard,
  WelcomeLogo,
  RightCard,
  InputArea,
  SignButton,
  SecondaryArea,
  InnerContent,
  DropDown,
  InputText,
  Line,
  SchoolList,
  SchoolItem,
} from "./SignInPage.styled";

const SignInPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("teacher");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolResults, setSchoolResults] = useState<string[]>([]);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  // Mock school data
  const allSchools = [
    "서울고등학교",
    "부산고등학교",
    "대구중학교",
    "인천초등학교",
    "광주고등학교",
    "대전중학교",
    "울산초등학교",
  ];

  const handleSchoolSearch = (query: string) => {
    setSchoolQuery(query);
    if (query.length > 0) {
      const filteredSchools = allSchools.filter((school) =>
        school.toLowerCase().includes(query.toLowerCase())
      );
      setSchoolResults(filteredSchools);
    } else {
      setSchoolResults([]);
    }
  };

  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setSchoolQuery(school);
    setSchoolResults([]); 
  };

  return (
    <div>
      <SplitScreen>
        <LeftCard>
          <WelcomeLogo src={Logo}></WelcomeLogo>
        </LeftCard>
        <RightCard>
          <InnerContent>
            <DropDown
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
              >
                <path
                  d="M18.4991 23.0864C18.2935 23.0864 18.0941 23.0479 17.9009 22.9708C17.7077 22.8937 17.5474 22.791 17.4199 22.6625L10.3283 15.5708C10.0456 15.2882 9.9043 14.9285 9.9043 14.4916C9.9043 14.0548 10.0456 13.6951 10.3283 13.4125C10.6109 13.1298 10.9706 12.9885 11.4074 12.9885C11.8442 12.9885 12.204 13.1298 12.4866 13.4125L18.4991 19.425L24.5116 13.4125C24.7942 13.1298 25.154 12.9885 25.5908 12.9885C26.0276 12.9885 26.3873 13.1298 26.6699 13.4125C26.9526 13.6951 27.0939 14.0548 27.0939 14.4916C27.0939 14.9285 26.9526 15.2882 26.6699 15.5708L19.5783 22.6625C19.4241 22.8167 19.2571 22.9261 19.0772 22.9909C18.8974 23.0556 18.7046 23.0875 18.4991 23.0864Z"
                  fill="#666666"
                />
              </svg>
              <option value="teacher">교사</option>
              <option value="parent">학부모</option>
              <option value="student">학생</option>
            </DropDown>
            {isSignUp ? (
              <>
                <InputText>이름</InputText>
                <InputArea>
                  <input placeholder="홍길동" type="text" />
                </InputArea>
              </>
            ) : null}
            <InputText>학교명</InputText>
            <InputArea style={{ position: "relative" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  left: "20",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                placeholder="학교명을 검색하세요"
                type="text"
                value={schoolQuery}
                onChange={(e) => handleSchoolSearch(e.target.value)}
                alt="학교명을 검색하세요"
                style={{ paddingLeft: "2rem" }} 
              />
              {schoolResults.length > 0 && (
                <SchoolList>
                  {schoolResults.map((school) => (
                    <SchoolItem
                      key={school}
                      onClick={() => handleSchoolSelect(school)}
                    >
                      {school}
                    </SchoolItem>
                  ))}
                </SchoolList>
              )}
            </InputArea>
            <InputText>아이디</InputText>
            <InputArea>
              <input placeholder="example@email.com" type="text" />
            </InputArea>
            <InputText>비밀번호</InputText>
            <InputArea>
              <input placeholder="영문+숫자" type="password" />
            </InputArea>

            {isSignUp ? (
              <>
                <InputText>비밀번호 확인</InputText>
                <InputArea>
                  <input placeholder="영문+숫자" type="password" />
                </InputArea>
              </>
            ) : null}

            <SignButton>
              <p>{isSignUp ? "회원가입" : "로그인"}</p>
            </SignButton>
            <Line />
            {isSignUp ? (
              <SecondaryArea>
                <div>
                  <p>이미 계정이 있으신가요? </p>
                  <a onClick={toggleSignUp}>로그인 하기</a>
                </div>
              </SecondaryArea>
            ) : (
              <SecondaryArea>
                <div>
                  <p> 비밀번호를 잊으셨나요? </p>
                  <a>비밀번호 찾기</a>
                </div>
                <div>
                  <p> 아직 계정이 없으신가요? </p>
                  <a onClick={toggleSignUp}>회원가입</a>
                </div>
              </SecondaryArea>
            )}
          </InnerContent>
        </RightCard>
      </SplitScreen>
    </div>
  );
};

export default SignInPage;
