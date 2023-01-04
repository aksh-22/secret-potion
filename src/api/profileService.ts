import axios from 'axios';
import { axiosInstance } from './axiosInstance';
const CancelToken = axios.CancelToken;
let usernameCancelToken = null;

export const getProfile = () =>
    axiosInstance.get('profile').then((res) => res?.data);

export const getOtherProfile = (data) =>
    axiosInstance.post('profile/other', data).then((res) => res?.data);

export const deleteUser = () =>
    axiosInstance.get('profile/delete-account').then((res) => res?.data);

export const reportUser = (data) =>
    axiosInstance.post('other-user/report-user', data).then((res) => res?.data);

export const userName = (data) => {
    if (usernameCancelToken !== null) usernameCancelToken();
    return axiosInstance
        .post('profile/user-name', data, {
            cancelToken: new CancelToken((token) => {
                usernameCancelToken = token;
            }),
        })
        .then((res) => res?.data);
};

export const updateProfile = (data: any) =>
    axiosInstance
        .post('profile/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data);
