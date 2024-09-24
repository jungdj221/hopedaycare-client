import axios from "axios";

// bus 기본루트
const instance = axios.create({
  baseURL: "http://localhost:8080/carecenter/api/bus/",
});

// 버스 리스트 - list
export const viewAllBus = async () => {
  return await instance.get("bus-info");
};

// 버스 정보 추가 - vo
export const createBus = async (data) => {
  return await instance.post("bus-info", data);
};

// 버스 정보 수정 -  vo
export const updateBus = async (data) => {
  return await instance.put("bus-info", data);
};

// 버스 정보 삭제 - int busId
export const deleteBus = async (no) => {
  return await instance.delete(`bus-info/${no}`);
};

// 버스 detail
export const getBusDetail = async (no) => {
  return await instance.get(`bus-info/${no}`);
};

// ----------------------------

// 탑승객 명단 - list
export const viewAllPassenger = async () => {
  return await instance.get("bus-passenger");
};

// 탑승객 추가 - list
export const createPassenger = async (data) => {
  return await instance.post("bus-passenger", data);
};

// 탑승객 수정 - list
export const updatePassenger = async (data) => {
  return await instance.put("bus-passenger", data);
};

// 탑승객 삭제 - list
export const deletePassenger = async (data) => {
  return await instance.defaults("bus-passenger", data);
};
