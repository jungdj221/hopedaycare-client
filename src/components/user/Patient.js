import { useState, useEffect } from "react";
import styled from "styled-components";
import { viewAllPatient } from "../../api/User";
import Alert from "../Alert";
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
const Patient = () => {
  const [patientList, setPatientList] = useState([]);
  const [alertState, setAlertState] = useState("");

  const patientAPI = async () => {
    try {
      const response = await viewAllPatient();
      setPatientList(response.data);
    } catch {
      setAlertState("network-error");
    }
  };

  // only for first rendering
  useEffect(() => {
    if (patientList.length === 0) {
      // try {
      console.log("patient api 소환술!!!");
      patientAPI();
      // } catch {
      // setAlertState("network-error");
      // }
    }
  }, [patientList]);
  return (
    <Div>
      <div className="alert-container">
        <Alert alertType={alertState} />
      </div>
      <div className="contents-container">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>입소 여부</th>
              <th>이름</th>
              <th>정보</th>
              <th>졸업 날짜</th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((patient, index) => (
              <tr
                key={index}
                className={`hover-effect ${
                  patient.patientStatus === "N" ? "disable" : ""
                }`}
              >
                <td>{index}</td>
                <td>{patient.patientStatus}</td>
                <td>{patient.patientName}</td>
                <td>{patient.patientInfo}</td>
                <td>{patient.patientGraduationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Div>
  );
};
export default Patient;
