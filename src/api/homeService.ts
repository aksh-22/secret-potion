import { axiosInstance } from './axiosInstance';

export const getCheckIn = (data: any) =>
    axiosInstance.post('home', data).then((res) => res?.data);

export const updateMood = (data: any) =>
    axiosInstance.post('mood', data).then((res) => res?.data);

export const getMoodData = (data: any) =>
    axiosInstance.post('mood-data', data).then((res) => res?.data);

export const getReflection = () =>
    axiosInstance.get('reflection').then((res) => res?.data);

export const getReflectionList = (data: any) =>
    axiosInstance.post('reflection/get-post', data).then((res) => res?.data);

export const getSingleReflection = (data: any) =>
    axiosInstance
        .post('reflection/single-reflection-post', data)
        .then((res) => res?.data);

export const getReflectionDateList = (data: any, page: number) =>
    axiosInstance
        .post('reflection/single-reflection', data, { params: { page } })
        .then((res) => res?.data);

export const likePostReflection = (data) =>
    axiosInstance.post('reflection/like', data).then((res) => res?.data);

export const savePostReflection = (data) =>
    axiosInstance.post('reflection/save', data).then((res) => res?.data);

export const supportPostReflection = (data) =>
    axiosInstance.post('reflection/support', data).then((res) => res?.data);

export const getCommentsReflection = (data, page) =>
    axiosInstance
        .post('reflection/get-comment', data, { params: { page } })
        .then((res) => res?.data);

export const addPostsReflection = (data) =>
    axiosInstance.post('reflection/add', data).then((res) => res?.data);

export const editPostsReflection = (data) =>
    axiosInstance.post('reflection/update', data).then((res) => res?.data);

export const deletePostsReflection = (data) =>
    axiosInstance.post('reflection/delete', data).then((res) => res?.data);

export const deleteReflectionComment = (data) =>
    axiosInstance
        .post('reflection/delete-comment', data)
        .then((res) => res?.data);

export const updateReflectionComment = (data) =>
    axiosInstance
        .post('reflection/update-comment', data)
        .then((res) => res?.data);

export const commentReflection = (data) =>
    axiosInstance.post('reflection/comment', data).then((res) => res?.data);

export const getRepliesReflection = (data, page) =>
    axiosInstance
        .post('reflection/get-all-reply', data, { params: { page } })
        .then((res) => res?.data);
