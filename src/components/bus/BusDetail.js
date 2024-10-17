import { useState, useEffect } from "react";
import styled from "styled-components";
import { getBusDetail, viewAllPassengers } from "../../api/Bus";
import { useParams } from "react-router-dom";
import Alert from "../Alert";
import Loading from "../Loading";
import seatImg from "../../assets/image.png";
const Div = styled.div`
  .contents-container {
    .main-container {
      display: flex;
      flex-direction: row;
      border-left: 1px solid black;
      .left {
        background-color: #f4f4f4;
        flex: 1.5;
        .passenger-seats-container {
          display: grid;
          align-items: center;
          justify-items: center;
          .passengers-container {
            width: 100%;
            height: 100%;
            border: 1px solid black;
            display: flex;
            .passenger {
              position: relative;
              img {
                /* position: absolute; */
                width: 100%;
                height: 100%;
              }
              .passenger-name {
                position: absolute;
                z-index: 20;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: white;
                border: 1px solid black;
                width: 40%;
                height: 50px;
                font-size: 25px;
                line-height: 50px;
                text-align: center;
              }
              .bg-opacity {
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 10;
                background-color: white;
                opacity: 0.7;
              }
              .select-box {
                position: absolute;
                z-index: 30;
                left: 100%;
                transform: translateX(-100%);
              }
            }
          }
        }
      }

      .right {
        background-color: grey;
        flex: 1;
        border-left: 1px solid black;
        .passenger-info-container {
        }
      }
    }
  }
`;
const BusDetail = () => {
  const { busId } = useParams();
  const [bus, setBus] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [alertState, setAlertState] = useState(""); // alert state
  const [loading, setLoading] = useState(false);

  const pickUpInfoAPI = async (no) => {
    try {
      setLoading(true);
      const responseV = await getBusDetail(no); //grid를 위한 row column 값
      const responseP = await viewAllPassengers(no); // 승객정보
      setBus(responseV.data);
      setPassengers(responseP.data);
    } catch {
      setAlertState("error");
    }
    setLoading(false);
    // console.log(bus);
  };
  // const seatsLength = () => {
  //   setTotalSeats(bus.row * bus.column);
  // };
  // const seats = Array.from({ length: totalSeats }, (_, index) => index);

  useEffect(() => {
    if (passengers.length === 0) {
      pickUpInfoAPI(busId);
      console.log("useEffect 작동");
    }
    // eslint-disable-next-line
  }, [busId]);
  return (
    <Div>
      <Alert alertType={alertState} />
      <div className="contents-container">
        <div className="main-container">
          <div className="left">
            <div className="add-seat">passenger information</div>
            <div
              className="passenger-seats-container"
              style={{
                gridTemplateColumns: `repeat(${bus.busColumn},1fr)`,
                gridTemplateRows: `repeat(${bus.busRow},1fr)`,
              }}
            >
              {passengers.map((passenger, index) => (
                <div key={index} className="passengers-container">
                  <div className="passenger">
                    <div className="passenger-name">
                      {passenger.busPassengerName}
                    </div>
                    <div className="bg-opacity"></div>
                    <select className="select-box">
                      <option value="">-----</option>
                      <option value="empty">좌석 없음</option>
                      <option value="unsigned">미정</option>
                      <option value="sign">좌석 있음</option>
                    </select>
                    <img src={seatImg} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right">
            <div className="add-info">
              additional information about the passenger
            </div>
            <div className="passenger-info-container"></div>
          </div>
        </div>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {passengers.length === 0 ? (
            <>
              <div>
                탑승객정보를 불러올 수 없습니다. 잠시 후, 다시 시도해주세요.
              </div>
            </>
          ) : bus === "" ? (
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
