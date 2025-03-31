import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./page/MainPage";
import StudentInfo from "./page/StudentInfoPage";

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
      </Routes>
    </Router>
  );
};

export default App;
