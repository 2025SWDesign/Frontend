import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./page/MainPage";
import StudentInfo from "./page/StudentInfoPage";
import CounselingPage from "./page/CounselingPage";
import CounselingWritePage from "./page/CounselingWritePage";
import FeedbackPage from "./page/FeedbackPage";
import SignInPage from "./page/SignInPage";
import StudentManagementPage from "./page/StudentManagementPage";
import GradePage from "./page/GradePage";

const App: React.FC = () => {
  type IdentityType = "student" | "parent" | "teacher";
  const [identity, setIdentity] = useState<IdentityType>("teacher");
  const [isHomeroom, setIsHomeroom] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  interface Student {
    name: string;
    grade: number;
    class: number;
    number: number;
    img: string;
  }

  const renderHomeroomStatus = () => {
    if (isHomeroom) {
      return <div>담임</div>;
    }
    return null;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <MainPage identity={identity} />
              {renderHomeroomStatus()}
              <button onClick={() => setIdentity("student")}>학생</button>
              <button onClick={() => setIdentity("parent")}>학부모</button>
              <button onClick={() => setIdentity("teacher")}>교사</button>
              <button onClick={() => setIsHomeroom(!isHomeroom)}>담임</button>
            </MainLayout>
          }
        />
        <Route path="/sign" element={<SignInPage />} />
        <Route
          path="/student-info"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <StudentInfo
                identity={identity}
                isHomeroom={isHomeroom}
                selectedStudent={selectedStudent}
              />
            </MainLayout>
          }
        />
        <Route
          path="/counseling"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <CounselingPage
                identity={identity}
                isHomeroom={isHomeroom}
                selectedStudent={selectedStudent}
              />
            </MainLayout>
          }
        />
        <Route
          path="/counseling/write"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <CounselingWritePage />
            </MainLayout>
          }
        />
        <Route
          path="/feedback"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <FeedbackPage
                identity={identity}
                isHomeroom={isHomeroom}
                selectedStudent={selectedStudent}
              />
            </MainLayout>
          }
        />
        <Route
          path="/student-manage"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <StudentManagementPage
                identity={identity}
                isHomeroom={isHomeroom}
                selectedStudent={selectedStudent}
              />
            </MainLayout>
          }
        />
        <Route
          path="/grade"
          element={
            <MainLayout
              identity={identity}
              selectedStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
            >
              <GradePage
                identity={identity}
                isHomeroom={isHomeroom}
                selectedStudent={selectedStudent}
              />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
