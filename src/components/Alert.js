import styled from "styled-components";
import { IoInformationCircleOutline } from "react-icons/io5"; //inform blue
import { CiWarning, CiCircleCheck } from "react-icons/ci"; // warning yellow , check green
import { VscError } from "react-icons/vsc"; // fail red
import { useEffect, useState } from "react";
const Div = styled.div`
  @keyframes fadeOut {
    0% {
      top: -70px;
      opacity: 1;
    }
    5% {
      top: 5px;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .fade-out {
    animation: fadeOut 5s ease-in;
    top: 5px;
  }
  .state-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* border: 2px solid black; */
    border-radius: 20px;
    width: 500px;
    height: 70px;
    overflow: hidden;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background-color: white;
    .contents-container {
      display: flex;
      justify-content: flex-start;
      .content {
        .title {
        }
        .cancel {
          width: 10px;
        }
      }
      .icon {
        font-size: 40px;
      }
    }
    .cancel {
      &:hover {
        cursor: pointer;
      }
    }
  }
  /* .state-container::before {
    content: "";
    width: 7px;
    height: 70px;
    background-color: red;
  } */
  .error {
    border: 2px solid red;
    border-left: 7px solid red;
    .icon {
      color: red;
    }
  }

  .warning {
    border: 2px solid yellow;
    .icon {
      color: yellow;
    }
  }

  .info {
    border: 2px solid blue;
    .icon {
      color: blue;
    }
  }

  .success {
    border: 2px solid green;
    .icon {
      color: green;
    }
  }
`;
const Alert = ({ alertType }) => {
  let newData = alertType;
  // const [newData, setNewData] = useState(alertType);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    type: "",
    sort: "",
  });
  const [boolean, setBoolean] = useState(false);
  if (boolean) {
    setTimeout(() => {
      setBoolean(false);
      setAlert({
        title: "",
        message: "",
        type: "",
        sort: "",
      });
      // setNewData("");
      console.log("이거 작동됨");
    }, 4900);
  }
  useEffect(() => {
    switch (newData) {
      case "info":
        setAlert({
          title: "알림",
          message: "확인하지 않은 알림이 있습니다.",
          type: "info",
          sort: "info",
        });
        setBoolean(true);
        break;
      case "create-success":
        setAlert({
          title: "추가 성공",
          message: "성공적으로 정보추가가 완료되었습니다.",
          type: "success",
          sort: "success",
        });
        setBoolean(true);
        break;
      case "update-success":
        setAlert({
          title: "수정 성공",
          message: "성공적으로 수정이 완료되었습니다.",
          type: "update-success",
          sort: "success",
        });
        setBoolean(true);
        break;
      case "delete-success":
        setAlert({
          title: "삭제 성공",
          message: "성공적으로 삭제가 완료되었습니다.",
          type: "update-success",
          sort: "success",
        });
        setBoolean(true);
        break;
      case "warning":
        setAlert({
          title: "재확인 요청",
          message: "정해진 글 형식을 맞춰주세요.",
          type: "warning",
          sort: "warning",
        });
        setBoolean(true);
        break;
      case "error":
        setAlert({
          title: "에러 발생",
          message: "문제가 발생하였습니다. 잠시후 다시 시도해 주세요",
          type: "error",
          sort: "error",
        });
        setBoolean(true);
        break;
      case "create-error":
        setAlert({
          title: "에러 발생",
          message:
            "저장과정에서 문제가 발생하였습니다. 잠시후 다시 시도해 주세요",
          type: "create-error",
          sort: "error",
        });
        setBoolean(true);
        break;
      case "network-error":
        setAlert({
          title: "네트워크 에러",
          message: "네트워크 문제가 발생하였습니다. 잠시후 다시 시도해 주세요",
          type: "network-error",
          sort: "error",
        });
        setBoolean(true);
        break;
      default:
        setAlert({
          title: "",
          message: "",
          type: "",
          sort: "",
        });
        setBoolean(false);
    }
    // console.log("alert 작동확인");
  }, [newData]);
  return (
    <>
      {alert.type === "" || boolean === false ? (
        <></>
      ) : (
        <>
          <Div>
            <div
              className={`state-container fade-out ${
                alert.sort === "info"
                  ? "info"
                  : alert.sort === "success"
                  ? "success"
                  : alert.sort === "warning"
                  ? "warning"
                  : "error"
              }`}
            >
              <div className="contents-container">
                <div className="icon">
                  {alert.sort === "info" ? (
                    <IoInformationCircleOutline />
                  ) : alert.sort === "success" ? (
                    <CiCircleCheck />
                  ) : alert.sort === "warning" ? (
                    <CiWarning />
                  ) : (
                    <VscError />
                  )}
                </div>
                <div className="content">
                  <div className="title">{alert.title}</div>
                  <div className="message">{alert.message}</div>
                </div>
              </div>
              <div className="cancel" onClick={() => setBoolean(false)}>
                X
              </div>
            </div>
          </Div>
        </>
      )}
    </>
  );
};
export default Alert;
