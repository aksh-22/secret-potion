import OneSignal from 'react-native-onesignal';
import { axiosInstance } from './axiosInstance';

export const login = (data: any) => {
  return axiosInstance.post('login', data).then((res) => res?.data);
};

export const logout = async () => {
  let res = await OneSignal.getDeviceState();
  return axiosInstance.post('logout', {
    device_token: res?.pushToken,
    player_id: res?.userId,
  }).then((res) => res?.data);
};

export const signUp = (data: any) => {
  return axiosInstance.post('register', data).then((res) => res?.data);
};

export const verifyEmail = (data: any) => {
  return axiosInstance.post('verify-email', data).then((res) => res?.data);
};

export const forgotPasswordVerify = (data: any) => {
  return axiosInstance
    .post('forgot-password-verify', data)
    .then((res) => res?.data);
};

export const forgotPassword = (data: any) =>
  axiosInstance.post('forgot-password', data).then((res) => res?.data);

export const resendEmail = (data: any) => {
  return axiosInstance.post('resend-email', data).then((res) => res?.data);
};

export const changePassword = (data: any) => {
  return axiosInstance.post('change-password', data).then((res) => res?.data);
};
