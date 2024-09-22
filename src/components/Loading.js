import styled from "styled-components";
const Div = styled.div`
  @keyframes infiniteRotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  position: relative;
  .effect-container {
    display: flex;
    flex-direction: column;
    width: 100px; // 받는 인자값 있을 수 있음
    height: 100px; // ""
    border-radius: 50px;
    overflow: hidden;
    position: relative;
    animation: infiniteRotation 1s linear infinite;
    &::before {
      content: "";
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      z-index: 20;
    }
    .outter-semi-circle {
      width: 100%;
      height: 100%;
      &:first-child {
        background-color: grey;
        opacity: 0.8;
      }
      &:last-child {
        background-color: white;
      }
    }
  }
  .pie-slice-container {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    z-index: 0;
    animation: infiniteRotation 1s infinite;
    .semi-top {
      width: 100%;
      height: 100%;
      display: flex;
      .quarter-slice {
        width: 100%;
        height: 100%;
        &:nth-child(1) {
          background-color: black;
          opacity: 0.8;
        }
        &:nth-child(2) {
          background-color: white;
          opacity: 0;
        }
      }
    }
    .semi-bottom {
      display: flex;
      width: 100%;
      height: 100%;
      .quarter-slice {
        width: 100%;
        height: 100%;
        &:first-child {
          background-color: white;
          opacity: 0;
        }
        &:last-child {
          background-color: white;
          opacity: 0;
        }
      }
    }
  }
`;
const Loading = () => {
  return (
    <Div>
      <div className="pie-slice-container">
        <div className="semi-top">
          <div className="quarter-slice"></div>
          <div className="quarter-slice"></div>
        </div>
        <div className="semi-bottom">
          <div className="quarter-slice"></div>
          <div className="quarter-slice"></div>
        </div>
      </div>
      <div className="effect-container">
        <div className="outter-semi-circle"></div>
        <div className="outter-semi-circle"></div>
        <div className="pie-circle"></div>
      </div>
    </Div>
  );
};
export default Loading;
