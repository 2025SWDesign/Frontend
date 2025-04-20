import React from "react";
import { useAuthStore } from "../stores/authStore";

const MainPage: React.FC = () => {
  const role = useAuthStore((state) => state.role);
  return (
    <div>
      <div>{role}</div>
    </div>
  );
};

export default MainPage;
