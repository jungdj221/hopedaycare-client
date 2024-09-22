import { useState, useEffect } from "react";
import styled from "styled-components";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { viewAllWorker } from "../../api/User";
import Alert from "../Alert";
import Loading from "../Loading";
const Div = styled.div`
  .contents-container {
    table {
      th,
      td {
        text-align: center;
        vertical-align: middle;
        padding: 10px;
      }
      tr {
        border-bottom: 1px solid lightgrey;
      }
      .hover-effect:hover {
        background-color: #f4f4f4;
      }
      .disable {
        color: lightgrey;
      }
      .updateInfo {
        button {
          color: black !important;
          background-color: #f4f4f4;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;
const Worker = () => {
  const [workerList, setWorkerList] = useState([]);
  const [alertState, setAlertState] = useState(""); // alert state
  const [loading, setLoading] = useState(false); // loading component popup

  const workerAPI = async () => {
    try {
      setLoading(true); // loading
      const response = await viewAllWorker();
      setWorkerList(response.data);
      setLoading(false); // loading
    } catch {
      setAlertState("network-error");
      setLoading(false); // loading
    }
  };

  // only for first rendering
  useEffect(() => {
    if (workerList.length === 0) {
      console.log("worker api 소환술!!!");
      workerAPI();
    }
  }, [workerList]);
  return (
    <Div>
      <Alert alertType={alertState} />
      <div className="contents-container">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>정보</th>
              <th>하는 일</th>
            </tr>
          </thead>

          <tbody>
            {workerList.map((worker, index) => (
              <tr
                key={index}
                className={`hover-effect ${
                  worker.patientStatus === "N" ? "disable" : ""
                }`}
              >
                <td>{index}</td>
                <td>{worker.workerName}</td>
                <td>{worker.workerInfo}</td>
                <td>{worker.workerRoll}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading ? (
          <Loading />
        ) : (
          <>
            {workerList.length === 0 ? (
              <>
                <div>
                  직원정보를 불러올 수 없습니다. 잠시 후, 다시 시도해주세요.
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </Div>
  );
};
export default Worker;
