import { useState, useEffect } from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { viewAllPatient, updatePatient } from "../../api/User";
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
  const [boolean, setBoolean] = useState(false);
  const [editPatient, setEditPatient] = useState({});

  const updatePatientInfo = async (data) => {
    try {
      await updatePatient(data);
    } catch {
      alert("뭔가 잘못되었어요");
    }
    patientAPI();
  };
  const cancelUpdate = () => {
    setBoolean(false);
  };

  const patientAPI = async () => {
    const response = await viewAllPatient();
    setPatientList(response.data);
    console.log(response.data);
  };

  // only for first rendering
  useEffect(() => {
    if (patientList.length === 0) {
      console.log("patient api 소환술!!!");
      patientAPI();
    }
  }, [patientList]);
  return (
    <Div>
      <div className="contents-container">
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>입소 여부</th>
              <th>이름</th>
              <th>정보</th>
              <th>졸업 날짜</th>
              <th>
                <BsThreeDotsVertical />
              </th>
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
                {boolean & (editPatient.patientId === patient.patientId) ? (
                  // 정보 수정
                  <>
                    <td>
                      <input
                        value={editPatient.patientStatus}
                        onChange={(e) =>
                          setEditPatient((prev) => ({
                            ...prev,
                            patientStatus: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editPatient.patientName}
                        onChange={(e) =>
                          setEditPatient((prev) => ({
                            ...prev,
                            patientName: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editPatient.patientInfo}
                        onChange={(e) =>
                          setEditPatient((prev) => ({
                            ...prev,
                            patientInfo: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td>
                      <input
                        value={editPatient.patientGraduationDate}
                        onChange={(e) =>
                          setEditPatient((prev) => ({
                            ...prev,
                            patientGraduationDate: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(false);
                          updatePatientInfo(editPatient);
                        }}
                      >
                        수정 완료
                      </button>
                      <button onClick={cancelUpdate}>취소</button>
                    </td>
                  </>
                ) : (
                  // 일반 보기
                  <>
                    <td>{patient.patientStatus}</td>
                    <td>{patient.patientName}</td>
                    <td>{patient.patientInfo}</td>
                    <td>{patient.patientGraduationDate}</td>
                    <td className="updateInfo">
                      <button
                        onClick={() => {
                          setBoolean(true);
                          setEditPatient(patient);
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
export default Patient;
