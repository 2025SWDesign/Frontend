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
  ToggleButton,
  StudentInputArea,
  StudentInput,
  MiniInput,
} from "./SignInPage.styled";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface SignUpPayload {
  schoolName: string;
  name: string;
  password: string;
  passwordCheck: string;
  email: string;
  role: string;
  photo: string;
  subject?: string;
  student?: {
    create: {
      grade: number;
      classId: number;
      gradeClass: number;
      number: number;
    };
  };
}
const SignInPage: React.FC = () => {
  const [mode, setMode] = useState<"signIn" | "signUp" | "forgotPassword">(
    "signIn"
  );

  const [userType, setUserType] = useState("TEACHER");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schoolResults, setSchoolResults] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subject, setSubject] = useState("국어");

  const [studentGrade, setStudentGrade] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const allSchools = [
    "서울고등학교",
    "부산고등학교",
    "대구중학교",
    "인천중학교",
    "인천고등학교",
    "대전중학교",
    "울산중학교",
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

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (userType === "TEACHER" && !subject) {
      alert("담당 과목을 선택해주세요.");
      return;
    }

    if (userType === "STUDENT") {
      if (!studentGrade || !studentClass || !studentNumber) {
        alert("학년, 반, 번호를 모두 입력해주세요.");
        return;
      }
    }

    const payload: SignUpPayload = {
      schoolName: selectedSchool,
      name,
      email,
      password,
      passwordCheck: confirmPassword,
      role: userType,
      ...(userType === "TEACHER" && { subject }),
      ...(userType === "STUDENT" && {
        grade: Number(studentGrade),
        classId: Number(studentClass),
        number: Number(studentNumber),
        gradeClass: 1,
      }),
      photo: "",
    };

    try {
      console.log("STUDENT 최종 payload:", payload);
      await signUp(payload);
      alert("회원가입 성공!");
      setMode("signIn");
    } catch (err) {
      console.error("회원가입 실패", err);
      alert("회원가입 실패");
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    try {
      const response = await axios.post(`/api/v1/auth/sign-up`, payload);
      console.log("회원가입 성공:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("회원가입 실패:", error.response?.data || error.message);
      } else {
        console.error("예상치 못한 에러:", error);
      }
      throw error;
    }
  };

  const renderForm = () => {
    switch (mode) {
      case "signIn":
        return (
          <>
            <DropDown
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="TEACHER">교사</option>
              <option value="PARENT">학부모</option>
              <option value="STUDENT">학생</option>
            </DropDown>
            <InputText>아이디</InputText>
            <InputArea>
              <input placeholder="example@email.com" type="email" />
            </InputArea>
            <InputText>비밀번호</InputText>
            <InputArea>
              <input
                placeholder="비밀번호를 입력하세요"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ToggleButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputArea>
            <SignButton>
              <p>로그인</p>
            </SignButton>
          </>
        );
      case "signUp":
        return (
          <>
            <DropDown
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="TEACHER">교사</option>
              <option value="PARENT">학부모</option>
              <option value="STUDENT">학생</option>
            </DropDown>
            {userType === "TEACHER" && (
              <>
                <InputText>담당 과목</InputText>
                <DropDown
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="국어">국어</option>
                  <option value="영어">영어</option>
                  <option value="수학">수학</option>
                  <option value="과학">과학</option>
                  <option value="사회">사회</option>
                </DropDown>
              </>
            )}
            {userType === "STUDENT" && (
              <>
                <StudentInputArea>
                  <StudentInput>
                    <InputText>학년</InputText>
                    <MiniInput>
                      <input
                        type="number"
                        placeholder="예: 2"
                        value={studentGrade}
                        onChange={(e) => setStudentGrade(e.target.value)}
                      />
                    </MiniInput>
                  </StudentInput>
                  <StudentInput>
                    <InputText>반</InputText>
                    <MiniInput>
                      <input
                        type="number"
                        placeholder="예: 2"
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                      />
                    </MiniInput>
                  </StudentInput>
                  <StudentInput>
                    <InputText>번호</InputText>
                    <MiniInput>
                      <input
                        type="number"
                        placeholder="예: 10"
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                      />
                    </MiniInput>
                  </StudentInput>
                </StudentInputArea>
              </>
            )}
            <InputText>이름</InputText>
            <InputArea>
              <input
                placeholder="홍길동"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputArea>
            <InputText>학교명</InputText>
            <InputArea style={{ position: "relative" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
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
              <input
                placeholder="example@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputArea>
            <InputText>비밀번호</InputText>
            <InputArea>
              <input
                placeholder="사용할 비밀번호를 입력하세요"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ToggleButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputArea>
            <InputText>비밀번호 확인</InputText>
            <InputArea>
              <input
                placeholder="비밀번호 확인"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ToggleButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleButton>
            </InputArea>
            <SignButton onClick={handleSignUp}>
              <p>회원가입</p>
            </SignButton>
          </>
        );
      case "forgotPassword":
        return (
          <>
            <h1>비밀번호를 잊으셨나요?</h1>
            <InputText>이메일</InputText>
            <InputArea>
              <input
                placeholder="회원가입 시 등록한 이메일을 입력해주세요."
                type="email"
              />
            </InputArea>
            <SignButton>
              <p>비밀번호 재설정 메일 보내기</p>
            </SignButton>
          </>
        );
    }
  };

  const renderSecondaryArea = () => {
    switch (mode) {
      case "signIn":
        return (
          <SecondaryArea>
            <div>
              <p>비밀번호를 잊으셨나요?</p>
              <a onClick={() => setMode("forgotPassword")}>비밀번호 찾기</a>
            </div>
            <div>
              <p>아직 계정이 없으신가요?</p>
              <a onClick={() => setMode("signUp")}>회원가입</a>
            </div>
          </SecondaryArea>
        );
      case "signUp":
        return (
          <SecondaryArea>
            <div>
              <p>이미 계정이 있으신가요?</p>
              <a onClick={() => setMode("signIn")}>로그인 하기</a>
            </div>
          </SecondaryArea>
        );
      case "forgotPassword":
        return (
          <SecondaryArea>
            <div>
              <p>비밀번호가 기억나셨나요?</p>
              <a onClick={() => setMode("signIn")}>로그인 하기</a>
            </div>
          </SecondaryArea>
        );
    }
  };

  return (
    <div>
      <SplitScreen>
        <LeftCard>
          <WelcomeLogo src={Logo} />
        </LeftCard>
        <RightCard>
          <InnerContent>
            {renderForm()}
            <Line />
            {renderSecondaryArea()}
          </InnerContent>
        </RightCard>
      </SplitScreen>
    </div>
  );
};

export default SignInPage;
