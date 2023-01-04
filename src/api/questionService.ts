import { axiosInstance } from './axiosInstance';

export const getQuestions = (data: any) =>
  axiosInstance.post('onboarding-queston', data).then((res) => res?.data);
