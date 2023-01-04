import axios from 'axios';
import { getIpAddress } from 'react-native-device-info';
import { axiosInstance } from './axiosInstance';

const CancelToken = axios.CancelToken;
let communityNameToken = null;

export const communityGuidelinesUpdate = async () => {
    const ip: any = await getIpAddress().then((ip) => ip);
    return axiosInstance
        .post(
            'user/community-type/guide-line',
            {},
            {
                headers: {
                    ip: ip,
                },
            }
        )
        .then((res) => res?.data);
};

export const getCommunityType = (page: number, name: string) => {
    if (communityNameToken !== null) communityNameToken();
    return axiosInstance
        .get('community-type', {
            params: { page, name },
            cancelToken: new CancelToken((token) => {
                communityNameToken = token;
            }),
        })
        .then((res) => res?.data);
};
export const communityStatus = (data) =>
    axiosInstance
        .post('user/community-type/add', data)
        .then((res) => res?.data);

export const getPosts = (data, page) =>
    axiosInstance
        .post('post', data, { params: { page } })
        .then((res) => res?.data);

export const getComments = (data, page) =>
    axiosInstance
        .post('post/get-comment', data, { params: { page } })
        .then((res) => res?.data);

export const addPosts = (data) =>
    axiosInstance.post('post/add', data).then((res) => res?.data);

export const editPosts = (data) =>
    axiosInstance.post('post/update', data).then((res) => res?.data);

export const deletePosts = (data) =>
    axiosInstance.post('post/delete', data).then((res) => res?.data);

export const likePost = (data) =>
    axiosInstance.post('post/like', data).then((res) => res?.data);

export const savePost = (data) =>
    axiosInstance.post('post/save', data).then((res) => res?.data);

export const supportPost = (data) =>
    axiosInstance.post('post/support', data).then((res) => res?.data);

export const commentPost = (data) =>
    axiosInstance.post('post/comment', data).then((res) => res?.data);

export const getReplies = (data, page) =>
    axiosInstance
        .post('post/get-all-reply', data, { params: { page } })
        .then((res) => res?.data);

export const CommunityNameSearch = (data) => {
    if (communityNameToken !== null) communityNameToken();
    return axiosInstance
        .post('community-type/search', data, {
            cancelToken: new CancelToken((token) => {
                communityNameToken = token;
            }),
        })
        .then((res) => res?.data);
};

export const getUserPost = (data, page) =>
    axiosInstance
        .post('profile/friend-post', data, { params: { page } })
        .then((res) => res?.data);

export const getCommunityCount = () =>
    axiosInstance.get('community-type/today-count').then((res) => res?.data);

export const deletePostComment = (data) =>
    axiosInstance.post('post/delete-comment', data).then((res) => res?.data);

export const updatePostComment = (data) =>
    axiosInstance.post('post/update-comment', data).then((res) => res?.data);
