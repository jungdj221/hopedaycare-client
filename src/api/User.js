import axios from "axios";

// user 기본루트
const instance = axios.create({
  baseURL: "http://localhost:8080/carecenter/api/user/",
});

// 어르신 명단 - vo
export const viewAllPatient = async () => {
  return await instance.get("patient");
};

// 어르신 추가 - vo
export const createPatient = async (data) => {
  return await instance.post("patient", data);
};

// 어르신 수정 - vo
export const updatePatient = async (data) => {
  return await instance.put("patient", data);
};

// 어르신 비활성화 - list<vo>
export const graduatePatient = async (data) => {
  return await instance.put("patient-graduate", data);
};

// 직원 명단 가져오기 - list<vo>
export const viewAllWorker = async () => {
  return await instance.get("worker");
};

// 직원 추가 - vo
export const createWorker = async (data) => {
  return await instance.post("worker", data);
};

// 직원 수정 - vo
export const updateWorker = async (data) => {
  return await instance.put("worker", data);
};

// 직원 삭제 - int wUserId
export const deleteWorker = async (no) => {
  return await instance.delete(`worker/${no}`);
};
