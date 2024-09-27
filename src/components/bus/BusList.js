import { useState, useEffect } from "react";
import styled from "styled-components";
import { viewAllBus } from "../../api/Bus";
import Loading from "../Loading";
import Alert from "../Alert";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// import { FaPlus } from "react-icons/fa";
import BusAdd from "./BusAdd";
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
        background-color: #56b4c6;
      }
    }
  }
`;
const BusList = () => {
  const [busList, setBusList] = useState([]);
  const [alertState, setAlertState] = useState(""); // alert state
  const [loading, setLoading] = useState(false); // loading component popup
  const nevigate = useNavigate();
  const getDetail = (bus) => {
    nevigate(`bus/busId/${bus.busId}`);
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

      <BusAdd />

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
                <td>{bus.busNumber}</td>
                <td>{bus.busVehicleName}</td>
                <td>{bus.busDriver}</td>
                <td>{bus.busSubDriver}</td>
                <td>{bus.busHelper}</td>
                <td>{bus.busSubHelper}</td>
                <td>
                  <button onClick={() => getDetail(bus)}>상세보기</button>
                </td>
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
export default BusList;
