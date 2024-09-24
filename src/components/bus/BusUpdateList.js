import { useState, useEffect } from "react";
import styled from "styled-components";
import { updateBus, viewAllBus } from "../../api/Bus";
import Loading from "../Loading";
import Alert from "../Alert";
import { BsThreeDotsVertical } from "react-icons/bs";
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
      /* .disable {
        color: lightgrey;
      } */
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
const BusUpdateList = () => {
  const [busList, setBusList] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const [editBus, setEditBus] = useState({});
  const [alertState, setAlertState] = useState(""); // alert state
  const [loading, setLoading] = useState(false); // loading component popup

  const updateBusInfo = async (data) => {
    try {
      await updateBus(data);
    } catch {
      setAlertState("error");
    }
    setAlertState("update-success");
    busAPI();
  };

  const busAPI = async () => {
    try {
      setLoading(true); // loading
      const response = await viewAllBus();
      setBusList(response.data);
      setLoading(false); // loading
    } catch {
      setAlertState("network-error"); // alert state
      setLoading(false); // loading
    }
  };
  useEffect(() => {
    if (busList.length === 0) {
      busAPI();
    }
  }, [busList]);
  return (
    <Div>
      <Alert alertType={alertState} />
      <div className="contents-container">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>차량 번호</th>
              <th>차량 이름</th>
              <th>차량 고정 운전사</th>
              <th>차량 대체 운전사</th>
              <th>보조석 도우미</th>
              <th>보조석 대체 도우미</th>
              <th>
                <BsThreeDotsVertical />
              </th>
            </tr>
          </thead>
          <tbody>
            {busList.map((bus, index) => (
              <tr key={index} className="hover-effect">
                <td>{index + 1}</td>
                {boolean & (editBus.busId === bus.busId) ? (
                  <>
                    <td>
                      <input
                        value={editBus.busNumber}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busNumber: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editBus.busVehicleName}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busVehicleName: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editBus.busDriver}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busDriver: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editBus.busSubDriver}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busSubDriver: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editBus.busHelper}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busHelper: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editBus.busSubHelper}
                        onChange={(e) =>
                          setEditBus((prev) => ({
                            ...prev,
                            busSubHelper: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(false);
                          updateBusInfo(editBus);
                        }}
                      >
                        수정 완료
                      </button>
                      <button onClick={() => setBoolean(false)}>취소</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{bus.busNumber}</td>
                    <td>{bus.busVehicleName}</td>
                    <td>{bus.busDriver}</td>
                    <td>{bus.busSubDriver}</td>
                    <td>{bus.busHelper}</td>
                    <td>{bus.busSubHelper}</td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(true);
                          setEditBus(bus);
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
        {loading ? (
          <Loading />
        ) : (
          <>
            {busList.length === 0 ? (
              <>
                <div>
                  차량정보를 불러올 수 없습니다. 잠시 후, 다시 시도해주세요.
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
export default BusUpdateList;
