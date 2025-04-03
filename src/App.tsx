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

const App: React.FC = () => {
  type IdentityType = "student" | "parent" | "teacher";
  const [identity, setIdentity] = useState<IdentityType>("student");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout identity={identity}>
              <MainPage identity={identity} />
              <button onClick={() => setIdentity("student")}>학생</button>
              <button onClick={() => setIdentity("parent")}>학부모</button>
              <button onClick={() => setIdentity("teacher")}>교사</button>
            </MainLayout>
          }
        />
        <Route path="/sign" element={<SignInPage />} />
        <Route
          path="/student-info"
          element={
            <MainLayout identity={identity}>
              <StudentInfo />
            </MainLayout>
          }
        />
        <Route
          path="/counseling"
          element={
            <MainLayout identity={identity}>
              <CounselingPage identity={identity} />
            </MainLayout>
          }
        />
        <Route
          path="/counseling/write"
          element={
            <MainLayout identity={identity}>
              <CounselingWritePage />
            </MainLayout>
          }
        />
        <Route
          path="/feedback"
          element={
            <MainLayout identity={identity}>
              <FeedbackPage identity={identity} />
            </MainLayout>
          }
        />
        <Route
          path="/student-manage"
          element={
            <MainLayout identity={identity}>
              <StudentManagementPage identity={identity} />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
