import axios from "axios";

// schedule 기본루트
const instance = axios.create({
  baseURL: "http://localhost:8080/api/schedule/",
});

// 당일 공기압 리스트 - list
export const viewAllMassageList = async () => {
  return await instance.get("air-massage");
};
// 공기압 리스트 추가 - list
export const createAirMassage = async (data) => {
  return await instance.post("air-massage", data);
};

// 공기압 리스트 수정 - list
export const updateAirMassage = async (data) => {
  return await instance.put("air-massage", data);
};

// 공기압 리스트 삭제 - list
export const deleteAirMassage = async (data) => {
  return await instance.delete("air-massage", data);
};

// 당일 적외선 리스트 - list
export const viewAllTherapyList = async () => {
  return await instance.get("infrared-therapy");
};

// 적외선 리스트 추가 - list
export const createInfraredTherapy = async (data) => {
  return await instance.post("infrared-therapy", data);
};

// 적외선 리스트 수정 - list
export const updateInfraredTherapy = async (data) => {
  return await instance.put("infrared-therapy", data);
};

// 적외선 리스트 삭제 - list
export const deleteInfraredTherapy = async (data) => {
  return await instance.delete("infrared-therapy", data);
};

// -------------------------------------

// 시간표 전체 - list
export const viewAllSchedule = async () => {
  return await instance.get("classSchedule");
};

// 시간표 추가 - list
export const createSchedule = async (data) => {
  return await instance.post("classSchedule", data);
};

// 시간표 수정 - list 인데 상횡 따라서 vo 로 바뀔수도
export const updateSchedule = async (data) => {
  return await instance.put("classSchedule", data);
};

// 시간표 삭제 - int scheduleId
export const deleteSchedule = async (no) => {
  return await instance.delete(`classSchedule/${no}`);
};
