import { axiosInstance } from './axiosInstance';

export const getConnection = (page) =>
  axiosInstance
    .get('request/connections', { params: { page } })
    .then((res) => res?.data);

export const getSendRequest = (page) =>
  axiosInstance
    .get('request/send-requests', { params: { page } })
    .then((res) => res?.data);

export const getReceiveRequest = (page) =>
  axiosInstance
    .get('request/receive-request', { params: { page } })
    .then((res) => res?.data);

export const acceptRequest = (data) =>
  axiosInstance.post('request/accept', data).then((res) => res?.data);

export const sendRequest = (data) =>
  axiosInstance.post('request/send', data).then((res) => res?.data);

export const cancelRequest = (data) =>
  axiosInstance.post('request/cancel', data).then((res) => res?.data);

export const declineRequest = (data) =>
  axiosInstance.post('request/decline', data).then((res) => res?.data);

export const removeFriend = (data) =>
  axiosInstance.post('request/remove-friend', data).then((res) => res?.data);
