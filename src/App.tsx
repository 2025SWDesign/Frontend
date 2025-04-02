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
  const [identity] = useState("student"); // "student" or "teacher"

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <MainPage />
            </MainLayout>
          }
        />
        <Route path="/sign" element={<SignInPage />} />
        <Route
          path="/student-info"
          element={
            <MainLayout>
              <StudentInfo />
            </MainLayout>
          }
        />
        <Route
          path="/counseling"
          element={
            <MainLayout>
              <CounselingPage identity={identity} />
            </MainLayout>
          }
        />
        <Route
          path="/counseling/write"
          element={
            <MainLayout>
              <CounselingWritePage />
            </MainLayout>
          }
        />
        <Route
          path="/feedback"
          element={
            <MainLayout>
              <FeedbackPage identity={identity} />
            </MainLayout>
          }
        />
        <Route
          path="/student-manage"
          element={
            <MainLayout>
              <StudentManagementPage identity={identity} />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
