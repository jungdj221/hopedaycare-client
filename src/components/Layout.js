import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
const Div = styled.div`
  .l-container {
    display: flex;
    justify-content: space-between;
    .l-logo {
      &:hover {
        cursor: pointer;
      }
    }
    .l-navigate-container {
      display: flex;
      .l-user,
      .l-bus,
      .l-schedule {
        &:hover {
          cursor: pointer;
          transition: all 0.5s;
          background-color: antiquewhite;
        }
      }
    }
  }
`;
const Layout = () => {
  const navigate = useNavigate();
  const redirection = (data) => {
    data === "home"
      ? navigate("/")
      : data === "user"
      ? navigate("user-management")
      : data === "bus"
      ? navigate("bus-management")
      : data === "schedule"
      ? navigate("schedule-management")
      : navigate("error");
  };
  return (
    <Div>
      <div className="l-container">
        <div className="l-logo" onClick={() => redirection("home")}>
          희망주야간센터
        </div>
        {/* 관리자 계정의 경우 userRole = admin */}
        <div className="l-navigate-container">
          <div className="l-user" onClick={() => redirection("user")}>
            직원관리
          </div>
          <div className="l-bus" onClick={() => redirection("bus")}>
            차량 픽업
          </div>
          <div className="l-schedule" onClick={() => redirection("schedule")}>
            당일 일정
          </div>
        </div>
        {/* 일반 유저의 경우 userRole = user*/}
      </div>
      <Outlet />
    </Div>
  );
};
export default Layout;
