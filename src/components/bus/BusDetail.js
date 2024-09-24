import { useState, useEffect } from "react";
import styled from "styled-components";
import { getBusDetail } from "../../api/Bus";
import { useParams } from "react-router-dom";
import Alert from "../Alert";
import Loading from "../Loading";
const Div = styled.div`
  .contents-container {
    .main-container {
      display: flex;
      flex-direction: row;
      border-left: 1px solid black;
      .passenger-seats-container {
        background-color: #f4f4f4;
        flex: 1.5;
      }
      .passenger-info-container {
        background-color: grey;
        flex: 1;
        border-left: 1px solid black;
      }
    }
  }
`;
const BusDetail = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState({});
  const [alertState, setAlertState] = useState(""); // alert state
  const [loading, setLoading] = useState(false);

  const busAPI = async (no) => {
    try {
      setLoading(true);
      const response = await getBusDetail(no);
      setBus(response.data);
      console.log(response.data);
    } catch {
      setAlertState("error");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (Object.keys(bus).length === 0) {
      busAPI(busId);
    }
    // eslint-disable-next-line
  }, [busId]);
  return (
    <Div>
      <Alert alertType={alertState} />
      <div className="contents-container">
        <div className="main-container">
          <div className="passenger-seats-container">ff</div>
          <div className="passenger-info-container">ff</div>
        </div>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {bus === "" ? (
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
    </Div>
  );
};
export default BusDetail;
