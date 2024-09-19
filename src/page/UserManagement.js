import { useState } from "react";
import styled from "styled-components";
import Patient from "../components/user/Patient";
import Worker from "../components/user/Worker";
import PatientUpdateList from "../components/user/PatientUpdateList";
import WorkerUpdateList from "../components/user/WorkerUpdateList";
const Div = styled.div`
  .management-container {
    .user-list-container {
      display: flex;
      .user-worker,
      .user-patient {
        &:hover {
          background-color: #f4f4f4;
          cursor: pointer;
        }
      }
    }
  }
`;
const UserManagement = () => {
  const [index, setIndex] = useState("patient");
  const [index02, setIndex02] = useState("update");
  return (
    <Div>
      <div className="management-container">
        <div className="user-list-container">
          <div className="user-worker" onClick={() => setIndex("patient")}>
            어르신
          </div>
          <div
            className="user-patient"
            onClick={() => {
              setIndex("worker");
              setIndex02("update");
            }}
          >
            직원
          </div>
          {index02 === "update" ? (
            <>
              {index === "patient" ? (
                <>
                  <button
                    className="update-patientList"
                    onClick={() => {
                      setIndex("patientList");
                      setIndex02("complete");
                    }}
                  >
                    입소자정보 수정
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="update-patientList"
                    onClick={() => {
                      setIndex("workerList");
                      setIndex02("complete");
                    }}
                  >
                    직원정보 수정
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {index === "workerList" ? (
                <>
                  <button
                    className="update-patientList"
                    onClick={() => {
                      setIndex("worker");
                      setIndex02("update");
                    }}
                  >
                    직원 완료
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="update-patientList"
                    onClick={() => {
                      setIndex("patient");
                      setIndex02("update");
                    }}
                  >
                    입소자 완료
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {index === "patient" ? (
          // patient
          <>
            <div className="content-container">
              <Patient />
            </div>
          </>
        ) : index === "worker" ? (
          // worker
          <>
            <div className="content-container">
              <Worker />
            </div>
          </>
        ) : index === "patientList" ? (
          // patientList
          <>
            <PatientUpdateList />
          </>
        ) : (
          // workerList
          <>
            <WorkerUpdateList />
          </>
        )}
      </div>
    </Div>
  );
};
export default UserManagement;
