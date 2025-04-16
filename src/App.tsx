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
import ReportPage from "./page/ReportPage";
import { AuthProvider } from "./context/AuthProvider";

const App: React.FC = () => {
  type IdentityType = "student" | "parent" | "teacher";
  const [identity, setIdentity] = useState<IdentityType>("teacher");
  const [isHomeroom, setIsHomeroom] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [schoolId, setSchoolId] = useState(0);
  const [classId, setClassId] = useState(0);

  interface Student {
    studentId: number;
    name: string;
    grade: number;
    gradeClass: number;
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route
            path="/main"
            element={
              <MainLayout
                identity={identity}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
          <Route
            path="/"
            element={
              <MainLayout
                identity={identity}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
        
          <Route
            path="/student-info"
            element={
              <MainLayout
                identity={identity}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
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
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
              >
                <GradePage
                  identity={identity}
                  isHomeroom={isHomeroom}
                  selectedStudent={selectedStudent}
                />
              </MainLayout>
            }
          />
          <Route
            path="/report"
            element={
              <MainLayout
                identity={identity}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
                isHomeroom={isHomeroom}
                setIsHomeroom={setIsHomeroom}
                schoolId={schoolId}
                classId={classId}
              >
                <ReportPage
                  identity={identity}
                  selectedStudent={selectedStudent}
                />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
