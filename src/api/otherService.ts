import axios from 'axios';
import { getIpAddress } from 'react-native-device-info';
import { axiosInstance } from './axiosInstance';

export const helpAndSupport = (data: any) =>
    axiosInstance.post('help-support', data).then((res) => res?.data);

export const aboutUs = () =>
    axiosInstance.get('custom-page').then((res) => res?.data);

export const faq = () => axiosInstance.get('faq').then((res) => res?.data);

export const library = () =>
    axiosInstance.get('library').then((res) => res?.data);

export const reportOption = () =>
    axiosInstance.get('report-option').then((res) => res?.data);

export const reportPost = (data) =>
    axiosInstance.post('post/report', data).then((res) => res?.data);

export const reportReflection = (data) =>
    axiosInstance.post('reflection/report', data).then((res) => res?.data);

export const markReadNotification = (data) =>
    axiosInstance.post('notification/read-mark', data).then((res) => res?.data);

export const getNotificationList = (page) =>
    axiosInstance
        .get('notification-list', { params: { page } })
        .then((res) => res?.data);

export const updateDeviceForOnesignal = async (player_id: {
    player_id: string;
    device_token: string;
    device_type?: string;
    device_model?: string;
}) => {
    const ip: any = await getIpAddress().then((ip) => ip);
    return axiosInstance
        .post('update-device', player_id, {
            headers: {
                ip: ip,
            },
        })
        .then((res) => res?.data);
};

export const notificationSend = (data) => {
    return axios
        .post('https://onesignal.com/api/v1/notifications', data)
        .then((res) => res);
};

export const removeOneSignal = (data) => {
    return axios.post('remove-one-signal-key', data).then((res) => res);
};
