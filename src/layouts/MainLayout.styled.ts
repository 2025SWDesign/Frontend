import styled from "styled-components";

export const LayoutWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  min-width: 100vh;
`;

export const Header = styled.header`
  width: 115rem;
  height: 7.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  img {
    margin-left: 2rem;
    width: 17.5rem;
    height: 6.125rem;
  }
`;
export const UserArea = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  p {
    color: #000;
    text-align: center;
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 700;
  }
  svg {
    margin: 0.25rem 0 0 0.75rem;
  }
`;

export const UserTriangle = styled.div`
  z-index: 100;
  transform: translate(1.2rem, 3rem);
  position: absolute;
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1.25rem solid #b9b9b9;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const UserIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

export const UserDropdownMenu = styled.div`
  width: 15rem;
  height: 9.25rem;
  margin: 4.2rem 0 0 -5.5rem;
  z-index: 100;
  position: absolute;
  background: #b9b9b9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const DropdownFlexContainer = styled.div`
  width: 14.5rem;
  height: 6.75rem;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    margin: 0;
  }

  p {
    margin: 0;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const UserDropdownButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const UserDropdownItem = styled.button`
  width: 7.25rem;
  height: 2.125rem;
  background: #146c94;
  border: solid #fff;

  color: #fff;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 700;

  &:hover {
    background: #004260;
  }
`;

export const NotificationArea = styled.div`
  margin-left: 1rem;
`;

export const NoteTriangle = styled.div`
  z-index: 100;
  transform: translate(0.4rem, 0.3rem);
  position: absolute;
  width: 0;
  height: 0;
  border-left: 1rem solid transparent;
  border-right: 1rem solid transparent;
  border-bottom: 1.25rem solid #b9b9b9;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const NoteDropdownMenu = styled.div`
  width: 21.25rem;
  height: 13rem;
  margin: 1.5rem 0 0 -17rem;
  padding: 0.25rem 0 0.25rem 0;
  z-index: 100;
  position: absolute;
  background: #b9b9b9;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  > div {
    width: 20.5rem;
    min-height: 12.5rem;
    background: white;
    overflow-x: hidden;
    overflow-y: scroll;
  }
`;

export const NotificationItem = styled.div`
  width: 20.75rem;
  height: 3rem;
  border: 1px solid #b9b9b9;
  background: #fff;
  display: flex;
  flex-direction: row;
  > svg {
    margin: 0.5rem;
    width: 2rem;
    height: 2rem;
  }
  div {
    display: flex;
    flex-direction: column;
    height: 2rem;
  }
`;

export const NotificationTitle = styled.div`
  color: #004260;
  font-family: "Inter";
  font-size: 1rem;
  font-weight: 700;
`;

export const NotificationText = styled.div`
  color: #000;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 400;
`;

export const MainContainer = styled.div`
  width: 115rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: #e5e5e5;
`;

export const SideBar = styled.aside`
  width: 21.75rem;
  height: 57rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StudentImg = styled.img`
  margin-top: 5.5rem;
  width: 17rem;
  height: 22rem;
`;

export const StudentClass = styled.p`
  margin: 2rem 0 0 0;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 2rem;
  font-weight: 700;
`;

export const StudentName = styled.p`
  margin: 1rem 0 -1.5rem 0;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const SearchBox = styled.div`
  width: 20rem;
  height: 2.5rem;
  border-radius: 0.625rem;
  margin: 5.5rem 0 0 0;
  background: #329ac9;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  }
  input {
    background: none;
    border: none;
    outline: none;
    overflow: auto;
    color: #fff;
    text-align: center;
    font-family: "Inter";
    font-size: 1rem;
    &::placeholder {
      color: white;
    }
  }
`;

export const StudentList = styled.div`
  margin-top: 1.5rem;
  max-height: 10rem;
  width: 20rem;
  overflow-y: scroll;

  table {
    width: 20rem;
    border: 1px solid #b9b9b9;
    border-collapse: collapse;
    tr {
      height: 2rem;
    }
    th,
    td {
      border-bottom: 1px solid #b9b9b9;
      text-align: center;
      font-family: "Inter";
      font-size: 0.75rem;
    }
    thead {
      position: sticky;
      top: 0px;
      margin: 0;
    }
    th {
      background: #004260;
      color: #fff;
    }
    th:first-child {
      background: #004260;
      color: #fff;
    }

    th:last-child {
      background: #004260;
      color: #fff;
    }

    td {
      background: white;
    }

    td:first-child {
      font-weight: 700;
    }
  }
`;

export const MainArea = styled.main`
  height: 57rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TabArea = styled.div`
  height: 3.75rem;
  display: flex;
  flex-direction: row;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  width: 13.75rem;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  border: 1px solid #fff;

  display: flex;
  align-items: center;
  justify-content: space-around;

  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#004260" : "#146C94")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#004260" : "#146C94")};
  }

  svg {
    margin: 0rem -1rem 0 0.75rem;
  }
  p {
    flex: 1;
    color: #fff;
    text-align: center;
    font-family: "Inter";
    font-size: 1.25rem;
    font-weight: 700;
  }
`;

export const PageArea = styled.div`
  width: 90rem;
  height: 50rem;
  border-radius: 1.25rem;
  background-color: white;
`;
