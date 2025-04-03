import React from "react";

interface MainPageProps {
  identity: string;
}

const MainPage: React.FC<MainPageProps> = ({ identity }) => {
  return (
    <div>
      <div>{identity}</div>
    </div>
  );
};

export default MainPage;
