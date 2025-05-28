import styled from "styled-components";
import { media } from "../styles/media";

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

  .logo-img {
    margin-left: 2rem;
    width: 17.5rem;
    height: 6.125rem;
  }
`;

export const LogoContainer = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const UserArea = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  z-index: 200;
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
  ${media.mobile} {
    p {
      font-size: 0.75rem;
    }
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
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

  ${media.mobile} {
    transform: translate(0.65rem, 1.5rem);
    border-left: 0.75rem solid transparent;
    border-right: 0.75rem solid transparent;
    border-bottom: 1rem solid #b9b9b9;
  }
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
  ${media.mobile} {
    width: 10.5rem;
    height: 6rem;
    margin: 2.4rem 0 0 -6rem;
  }
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

  ${media.mobile} {
    width: 10rem;
    height: 4rem;
    p {
      margin: 0;
      font-size: 0.75rem;
    }
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
  border: solid 1px #fff;

  color: #fff;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 700;

  &:hover {
    background: #004260;
  }

  ${media.mobile} {
    width: 5rem;
    height: 1.5rem;
    font-size: 0.5rem;
  }
`;

export const NotificationArea = styled.div`
  margin-left: 1rem;
  z-index: 200;
  ${media.mobile} {
    margin: 0.25rem 1.5rem 0 0.75rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const BellAlert = styled.div`
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  ${media.mobile} {
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const NotificationEmpty = styled.div`
  height: 13rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 700;
  ${media.mobile} {
    img {
      font-size: 0.5rem;
      height: 5rem;
    }
  }
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
  ${media.mobile} {
    transform: translate(-0.1rem, 0rem);
    border-left: 0.75rem solid transparent;
    border-right: 0.75rem solid transparent;
    border-bottom: 1rem solid #b9b9b9;
  }
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

  ${media.mobile} {
    width: 14rem;
    height: 8rem;
    margin: 1rem 0 0 -12rem;

    > div {
      width: 13.5rem;
      min-height: 7rem;
      background: white;
      overflow-x: hidden;
      overflow-y: scroll;
    }
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
  cursor: pointer;

  ${media.mobile} {
    width: 13.5rem;
    height: 2rem;

    > svg {
      margin: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
    }
    div {
      display: flex;
      flex-direction: column;
      height: 1rem;
    }
  }
`;

export const NotificationTitle = styled.div`
  color: #004260;
  font-family: "Inter";
  font-size: 1rem;
  font-weight: 700;
  ${media.mobile} {
    font-size: 0.75rem;
  }
`;

export const NotificationText = styled.div`
  color: #000;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 400;
  ${media.mobile} {
    font-size: 0.5rem;
  }
`;

export const MainContainer = styled.div`
  width: 115rem;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SideBar = styled.aside`
  width: 21.75rem;
  height: 57.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #000;
  background: #fff;
`;

export const StudentImg = styled.img`
  margin-top: 3rem;
  width: 12.5rem;
  height: 16.25rem;
  border-radius: 0.625rem;
  border: 1px solid #000;
  ${media.mobile} {
    width: 9.25rem;
    height: 12rem;
    margin: 0;
  }
`;

export const StudentClass = styled.p`
  margin: 1rem 0 0 0;
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 1.25rem;
  font-weight: 700;
  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const StudentName = styled.p`
  margin: 0.5rem 0 1rem 0;
  color: #000;
  text-align: center;
  font-family: "Inter";
  font-size: 2rem;
  font-weight: 700;
  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

export const SearchBox = styled.div`
  margin-top: 1rem;
  width: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  input {
    width: 16.75rem;
    height: 2.25rem;
    background: white;
    border: 1px solid black;
    border-radius: 0.625rem 0rem 0rem 0.625rem;
    overflow: auto;
    color: black;
    text-align: center;
    font-family: "Inter";
    font-weight: 700;
    font-size: 1rem;
    &::placeholder {
      font-weight: 400;
      color: #424242;
    }
  }
`;

export const SearchButton = styled.button`
  width: 3.25rem;
  height: 2.5rem;
  border-radius: 0rem 0.625rem 0.625rem 0rem;
  border: none;
  background: #004260;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StudentList = styled.div<{ $isStudentSelected: boolean }>`
  margin-top: 1rem;
  max-height: 50.5rem;
  ${({ $isStudentSelected }) => $isStudentSelected && `max-height: 23rem;`}
  overflow-y: scroll;
  overflow-x: none;
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
      background: #146c94;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TabArea = styled.div`
  height: 3.75rem;
  display: flex;
  flex-direction: row;
  ${media.mobile} {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-top: 1.7rem;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  width: 15.02rem;
  height: 3.75rem;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  border: 0.5px solid #000;

  display: flex;
  align-items: center;
  justify-content: space-around;

  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? "#004260" : "#146C94")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? "#004260" : "#146C94")};
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

  ${media.mobile} {
    display: flex;
    width: 100%;
    height: 4.75rem;
    border-radius: 0;
  }
`;

export const PageArea = styled.div`
  width: 90rem;
  height: 53.5rem;
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  border: 1px solid #000;
  background: #fff;
  
  ${media.mobile} {
    width: 25.75rem;
    height: 50rem;
    border: none;
    border-radius: 0rem;
    margin: -2rem;
  }
`;

export const ParentPageArea = styled.div`
  width: 112rem;
  height: 53.5rem;
  margin-left: 2rem;
  border-radius: 0rem 0rem 1.25rem 1.25rem;
  border: 1px solid #000;
  background: #fff;
`;

//모바일용
export const MobileLayoutWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

export const MobileHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 0 1.25rem;
  .logo-img {
    width: 10rem;
  }
`;

export const SidebarToggleButton = styled.button`
  background: none;
  transform: translate(-10rem, 1rem);
  border: none;
  cursor: pointer;
`;

export const SidebarCloseButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  align-self: flex-end;
  margin: 1rem 0.5rem 0 0;
`;

export const MobileSidebar = styled.div<{ $isOpen: boolean }>`
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: calc(100vh - 6rem);
  margin-top: 4.5rem;
  border-radius: 0rem 1.25rem 0rem 0rem;
  border: 1px black solid;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  align-items: center;

  bottom: 0;
  background-color: white;
  z-index: 100;
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateX(0)" : "translateX(-100%)"};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const MobileContentArea = styled.div``;
