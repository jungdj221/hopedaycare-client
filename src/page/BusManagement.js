import { useState, useEffect } from "react";
import styled from "styled-components";
import BusList from "../components/bus/BusList";
const Div = styled.div``;
const BusManagement = () => {
  const [index, setIndex] = useState("bus");
  const [index02, setIndex02] = useState("update");
  return (
    <Div>
      <div className="management-container">
        <div className="bus-list-container">
          <div className="bus" onClick={() => setIndex("bus")}>
            버스
          </div>
          {index02 === "update" ? (
            <>
              <div
                className="update-busList"
                onClick={() => setIndex02("complete")}
              >
                버스 수정
              </div>
            </>
          ) : (
            <>
              <div
                className="update-busList"
                onClick={() => setIndex02("update")}
              >
                버스 수정 완료
              </div>
            </>
          )}
        </div>
      </div>
    </Div>
  );
};
export default BusManagement;
