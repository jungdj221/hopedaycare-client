import { useState } from "react";
import styled from "styled-components";
import BusList from "../components/bus/BusList";
import BusUpdateList from "../components/bus/BusUpdateList";
const Div = styled.div`
  .management-container {
    .bus-list-container {
      display: flex;
    }
  }
`;
const BusManagement = () => {
  const [index, setIndex] = useState("busList");
  const [index02, setIndex02] = useState("update");
  return (
    <Div>
      <div className="management-container">
        <div className="bus-list-container">
          <div
            className="bus"
            onClick={() => {
              setIndex("busList");
              setIndex02("update");
            }}
          >
            버스
          </div>
          {index02 === "update" ? (
            <>
              <button
                className="update-busList"
                onClick={() => {
                  setIndex02("complete");
                  setIndex("busUpdateList");
                }}
              >
                버스 수정
              </button>
            </>
          ) : (
            <>
              <button
                className="update-busList"
                onClick={() => {
                  setIndex02("update");
                  setIndex("busList");
                }}
              >
                버스 수정 완료
              </button>
            </>
          )}
        </div>
        {index === "busList" ? (
          <>
            <BusList />
          </>
        ) : (
          <>
            <BusUpdateList />
          </>
        )}
      </div>
    </Div>
  );
};
export default BusManagement;
