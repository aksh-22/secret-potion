import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { axiosInstance } from './axiosInstance';
const CancelToken = axios.CancelToken;
let memberListCancelToken = null;

export const firebaseLogin = (token) => {
  return auth()
    .signInWithCustomToken(token)
    .then((res) => res);
};

export const uploadImage = (data) => {
  return axiosInstance
    .post(`/upload`, data)
    .then((res) => res?.data?.data?.image);
};
