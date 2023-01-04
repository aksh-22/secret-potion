import { axiosInstance } from './axiosInstance';

export const getSettings = () =>
  axiosInstance.get('notification-option').then((res) => res?.data);

export const updateNotificationSettings = (id: number) =>
  axiosInstance
    .post(`notification-option/check?notification_id=${id}`)
    .then((res) => res?.data);
