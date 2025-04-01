import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./page/MainPage";
import StudentInfo from "./page/StudentInfoPage";
import CounselingPage from "./page/CounselingPage";
import CounselingWritePage from "./page/CounselingWritePage";
import FeedbackPage from "./page/FeedbackPage";
import StudentManagementPage from "./page/StudentManagementPage";

const App: React.FC = () => {
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
        <Route
          path="/studentInfo"
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
              <CounselingPage />
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
              <FeedbackPage />
            </MainLayout>
          } 
        />
        <Route
          path="/studentManagement"
          element={
            <MainLayout>
              <StudentManagementPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
