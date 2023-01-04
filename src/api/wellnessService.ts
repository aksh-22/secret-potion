import { axiosInstance } from './axiosInstance';

export const getWellnessQuestions = () =>
  axiosInstance.get('wellness').then((res) => res?.data);

export const submitWellness = (data: any) =>
  axiosInstance.post('wellness/update', data).then((res) => res?.data);

export const getWellnessHome = () =>
  axiosInstance.get('wellness/home').then((res) => res?.data);

export const getWellnessQuestionDetails = (id: number) =>
  axiosInstance.get(`wellness/${id}`).then((res) => res?.data);

export const addSchedule = (data: any) =>
  axiosInstance.post('activity/schedule', data).then((res) => res?.data);

export const updateSchedule = (data: any) =>
  axiosInstance.post('activity/update', data).then((res) => res?.data);

export const deleteSchedule = (data: any) =>
  axiosInstance.post('activity/delete', data).then((res) => res?.data);

export const byDateSchedule = (data: any, page: any) =>
  axiosInstance.post('activity/by-date', data, { params: { page } }).then((res) => res?.data);

export const activityStatus = (data: any) =>
  axiosInstance.post('activity/status', data).then((res) => res?.data);

export const wellnessType = () =>
  axiosInstance.post('wellness/wellnessType').then((res) => res?.data);

export const wellnessActivity = (data: any, page: number) =>
  axiosInstance.post('activity', data, { params: { page } }).then((res) => res?.data);

export const getSchedule = (data: any) =>
  axiosInstance.post('activity/schedule/edit', data).then((res) => res?.data);

export const getAllActivity = (data: any, page: number) =>
  axiosInstance.post('activity/list', data, { params: { page } }).then((res) => res?.data);

export const getBadgesList = (data: any, page: number) =>
  axiosInstance.post('badge', data, { params: { page } }).then((res) => res?.data);
