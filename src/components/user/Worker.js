import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { updateWorker, viewAllWorker } from "../../api/User";
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
  const [boolean, setBoolean] = useState(false);
  const [editWorker, setEditWorker] = useState({});

  const updateWorkerInfo = async (data) => {
    try {
      await updateWorker(data);
    } catch {
      alert("뭔가 잘못되었어요");
    }
    workerAPI();
  };

  const cancelUpdate = () => {
    setBoolean(false);
  };

  const workerAPI = async () => {
    const response = await viewAllWorker();
    setWorkerList(response.data);
    // console.log(response.data);
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
      <div className="contents-container">
        <table>
          <thead>
            <tr>
              {/* <th>체크박스</th> */}
              <th>번호</th>
              <th>이름</th>
              <th>정보</th>
              <th>하는 일</th>
              <th>
                <BsThreeDotsVertical />
              </th>
            </tr>
          </thead>

          <tbody>
            {/* {workerList.length === 0 ? (<><div>불러올 정보가 없습니다.</div></>):(<></>)} */}
            {workerList.map((worker, index) => (
              <tr
                key={index}
                className={`hover-effect ${
                  worker.patientStatus === "N" ? "disable" : ""
                }`}
              >
                {/* <td className="checkbox">
                  <input type="checkbox" id="checkbox" />
                </td> */}
                <td>{index}</td>
                {boolean & (editWorker.workerId === worker.workerId) ? (
                  // 정보 수정
                  <>
                    <td>
                      <input
                        value={editWorker.workerName}
                        onChange={(e) =>
                          setEditWorker((prev) => ({
                            ...prev,
                            workerName: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editWorker.workerInfo}
                        onChange={(e) =>
                          setEditWorker((prev) => ({
                            ...prev,
                            workerInfo: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editWorker.workerRoll}
                        onChange={(e) =>
                          setEditWorker((prev) => ({
                            ...prev,
                            workerRoll: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(false);
                          updateWorkerInfo(editWorker);
                        }}
                      >
                        수정 완료
                      </button>
                      <button onClick={cancelUpdate}>취소</button>
                    </td>
                  </>
                ) : (
                  // 일반보기
                  <>
                    <td>{worker.workerName}</td>
                    <td>{worker.workerInfo}</td>
                    <td>{worker.workerRoll}</td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(true);
                          setEditWorker(worker);
                        }}
                      >
                        정보 수정
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Div>
  );
};
export default Worker;
