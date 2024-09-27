import { useState } from "react";
import styled from "styled-components";
import { createBus } from "../../api/Bus";
import Alert from "../Alert";
import { FaPlus } from "react-icons/fa";
const Div = styled.div`
  @keyframes opacityIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.7;
    }
  }
  @keyframes fadeIn {
    from {
      top: 0;
      opacity: 0.5;
    }
    to {
      top: 50%;
      opacity: 1;
    }
  }
  .container {
    position: fixed;
    /* top: 50%; */
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    display: flex;
    flex-direction: row-reverse;
    animation: fadeIn 0.5s forwards;
    .xbox {
      position: fixed;
      cursor: pointer;
      width: fit-content;
      font-size: 25px;
      margin-right: 10px;
      margin-top: 10px;
    }
    .contents-container {
      border: 2px solid #f4f4f4;
      border-radius: 10px;
      background-color: white;
      height: 90vh;
      width: 50vw;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      h1 {
        display: block;
        margin-bottom: 35px;
        font-weight: bold;
        font-size: 35px;
      }
      .content-container {
        /* background-color: green; */
        margin-bottom: 20px;
        width: 45vw; // 주의
        /* width: 900px; */
        line-height: 30px;
        label {
          display: block;
          margin-bottom: 10px;
          width: 150px;
          /* flex-shrink: 0; */
          font-weight: bold;
        }
        input {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          border: 1px solid lightgrey;
          background-color: #f4f4f4;
        }
        .content-detail {
          width: 100%;
          max-width: 100%; // 기억하기
          min-width: 0; // 기억하기
          &:nth-of-type(1) {
            margin-right: 20px;
          }
        }
      }
      .child-with-flex {
        display: flex;
      }
      .button-container {
        display: flex;
        justify-content: center;
        width: 45vw;
        font-weight: bold;
        .submit {
          background-color: #239be6;
          height: 50px;
          width: 100px;
          border-radius: 5px;
          text-align: center;
          line-height: 50px; // same height with container
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            background-color: skyblue;
          }
        }
        .cancel {
          background-color: lightgrey;
          height: 50px;
          width: 100px;
          border-radius: 5px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          &:hover {
            background-color: #f4f4f4;
          }
        }
      }
    }
  }
  .background {
    background-color: black;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    z-index: 10;
    animation: opacityIn 0.2s forwards;
  }
  .add {
    background-color: #239be6;
    color: white;
    font-weight: bold;
    width: 150px;
    height: 30px;
  }
`;
const BusAdd = () => {
  const [newBus, setNewBus] = useState({});
  const [alertstate, setAlertState] = useState(""); // alert state
  const [boolean, setBoolean] = useState(""); // open || close component

  const submit = async () => {
    try {
      await createBus(newBus);
      setAlertState("create-success");
    } catch {
      setAlertState("create-error");
    }
  };
  return (
    <Div>
      <Alert alertType={alertstate} />
      <div className="add" onClick={() => setBoolean(true)}>
        <FaPlus /> 버스 추가하기
      </div>
      {boolean ? (
        <>
          <div className="background"></div>
          <div className="container">
            <div className=" xbox" onClick={() => setBoolean(false)}>
              X
            </div>
            <div className="contents-container ">
              <h1>Bus Registration Form</h1>
              <div className="content-container">
                <label for="busNumber">Vehicle Number</label>
                <input
                  type="text"
                  id="busNumber"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="content-container">
                <label for="vehicleName">Vehicle Name</label>
                <input
                  type="text"
                  id="vehicleName"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busVehicleName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="content-container child-with-flex">
                <div className="content-detail">
                  <label for="vehicleRow">Vehicle Row</label>
                  <input
                    type="text"
                    id="vehicleRow"
                    onChange={(e) =>
                      setNewBus((prev) => ({
                        ...prev,
                        busVehicleRow: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="content-detail">
                  <label for="vehicleColumn">Vehicle Column</label>
                  <input
                    type="text"
                    id="vehicleColumn"
                    onChange={(e) =>
                      setNewBus((prev) => ({
                        ...prev,
                        busVehicleColumn: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="content-container">
                <label for="driver">Driver</label>
                <input
                  type="text"
                  id="driver"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busDriver: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="content-container">
                <label for="subDriver">Sub Driver</label>
                <input
                  type="text"
                  id="subDriver"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busSubDriver: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="content-container">
                <label for="assistant">Assistant</label>
                <input
                  type="text"
                  id="assistant"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busHelper: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="content-container">
                <label for="subAssistant">Sub Assistant</label>
                <input
                  type="text"
                  id="subAssistant"
                  onChange={(e) =>
                    setNewBus((prev) => ({
                      ...prev,
                      busSubHelper: e.target.value,
                    }))
                  }
                />
              </div>
              {/* <div className="content-container">
          <label id="subAssistant">Sub Assistant</label>
          <input type="text" id="subAssistant"/>
        </div> 현재는 미정 차량 사진이 올라갈수도있음*/}
              <div className="button-container">
                <div className="submit" onClick={submit}>
                  Submit
                </div>
                <div className="cancel" onClick={() => setBoolean(false)}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Div>
  );
};
export default BusAdd;
/*
bus_number INT,
    bus_vehicle_name VARCHAR(20),
	bus_driver VARCHAR(20), -- 메인 기사
    bus_sub_driver VARCHAR(20), -- 대체 기사
    bus_helper VARCHAR(20), -- 메인 공익
    bus_sub_helper VARCHAR(20) -- 공익 없을때 대체 선생님
*/
