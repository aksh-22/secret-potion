import {axiosInstance} from './axiosInstance';

export const checkNetworkService = () => {
  return axiosInstance.get(``).then(res => res?.data);
};
