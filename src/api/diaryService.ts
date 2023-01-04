import { axiosInstance } from './axiosInstance';

export const getDiary = (page: number, date) =>
  axiosInstance.get('diary', { params: { page, date } }).then((res) => res?.data);

export const getDiaryDetails = (index: number) =>
  axiosInstance.get(`diary/${index}`).then((res) => res?.data);

export const addDiary = (data: any) =>
  axiosInstance.post(`diary/add`, data).then((res) => res?.data);

export const updateDiaryDetails = (data: any, index: number) =>
  axiosInstance.post(`diary/update/${index}`, data).then((res) => res?.data);

export const deleteDiary = (index: number) =>
  axiosInstance.post(`diary/delete/${index}`).then((res) => res?.data);
