import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    addPosts,
    commentPost,
    communityGuidelinesUpdate,
    communityStatus,
    deletePostComment,
    deletePosts,
    editPosts,
    getComments,
    getCommunityCount,
    getCommunityType,
    getPosts,
    getReplies,
    getUserPost,
    likePost,
    savePost,
    supportPost,
    updatePostComment,
} from 'src/api/communityService';
import { useSagaSelector } from 'src/hooks/reducer';
import { updatePostCount } from '../reducer/communityReducer';
import { updateCommunityPosts, updateMyPosts } from '../reducer/postReducer';
import { updateUser } from '../reducer/userReducer';

type actionPayload = {
    payload: {
        data: any;
        page?: number | undefined | null | any;
        callback: (data?: any, next?: boolean) => void;
        errorCallback: () => void;
        finallyCallback: () => void;
        index?: number;
        singlePost?: boolean;
        apiType?: string;
        name?: string;
    };
    type: string;
};

function* onUpdateCommunityGuidelines({ payload }: actionPayload) {
    const { callback, errorCallback } = payload;

    try {
        const res: { data: any; token?: any } =
            yield communityGuidelinesUpdate();
        callback && callback();
    } catch (err: any) {
        console.error(
            'error on onUpdateCommunityGuidelines(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetCommunityType({ payload }: actionPayload) {
    const { callback, errorCallback, page, name } = payload;

    try {
        const res: { data: any; meta?: any } = yield getCommunityType(
            page,
            name
        );
        if (res) {
            yield put(updatePostCount(res?.data?.total_count));
            callback &&
                callback(
                    res?.data?.communityTypes,
                    res?.meta?.current_page < res?.meta?.total_page
                );
        }
    } catch (err: any) {
        console.error(
            'error on onGetCommunityType(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    } finally {
        errorCallback && errorCallback();
    }
}

function* onStatusChanged({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;

    try {
        const res: { data: any; meta?: any } = yield communityStatus(data);
        callback && callback(res?.data);
    } catch (err: any) {
        console.error(
            'error on onStatusChanged(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetPosts({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, page } = payload;

    let temp = [];
    // if (index) {
    const {
        postReducer: { communityPost },
    } = yield useSagaSelector();
    temp = [...communityPost];
    // }
    try {
        const res: { data: any; meta?: any } = yield getPosts(data, page);
        // if (index) {
        if (!data?.post_id) {
            if (res?.meta?.current_page === 1) {
                yield put(updateCommunityPosts(res?.data?.posts));
            } else {
                temp = [...temp, ...res?.data?.posts];
                yield put(updateCommunityPosts(temp));
            }
        } else {
            temp[index] = res?.data?.posts;
            yield put(updateCommunityPosts(temp));
        }
        // }
        callback &&
            callback(
                res?.meta?.current_page < res?.meta?.total_page,
                res?.data?.posts
            );
        // if (index) {
        // } else {
        //   callback && callback(res?.data?.posts);
        // }
    } catch (err: any) {
        console.error('error on onGetPosts(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetUserPosts({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;
    let temp = [];
    const {
        postReducer: { myPosts },
    } = yield useSagaSelector();
    if (myPosts) temp = [...myPosts];
    try {
        const res: { data: any; meta?: any } = yield getUserPost(data, page);
        if (res?.meta?.current_page === 1) {
            yield put(updateMyPosts(res?.data?.posts));
        } else {
            temp = [...temp, ...res?.data?.posts];
            yield put(updateMyPosts(temp));
        }
        callback && callback(res?.meta?.current_page < res?.meta?.total_page);
    } catch (err: any) {
        console.error(
            'error on onGetUserPosts(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetComments({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    try {
        const res: { data: any; meta?: any } = yield getComments(data, page);
        // yield put(updateCommunityPosts(res?.data?.posts));
        callback &&
            callback(
                res?.data?.comments,
                res?.meta?.current_page < res?.meta?.total_page
            );
    } catch (err: any) {
        console.error(
            'error on onGetComments(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetReplies({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    try {
        const res: { data: any; meta?: any } = yield getReplies(data, page);
        callback &&
            callback(
                res?.data?.reply,
                res?.meta?.current_page < res?.meta?.total_page
            );
    } catch (err: any) {
        console.error(
            'error on onGetReplies(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onAddPosts({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;

    const {
        postReducer: { communityPost },
    } = yield useSagaSelector();

    const {
        postReducer: { myPosts },
    } = yield useSagaSelector();
    let temp = [...communityPost];
    let temp2 = [...myPosts];

    try {
        const res: { data: any; meta?: any } = yield addPosts(data);
        temp.unshift(res?.data?.post);
        temp2.unshift(res?.data?.post);
        yield put(updateCommunityPosts(temp));
        yield put(updateMyPosts(temp2));
        callback && callback();
    } catch (err: any) {
        console.error('error on onAddPosts(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onEditPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];

    if (apiType === 'profile') {
        const {
            postReducer: { myPosts },
        } = yield useSagaSelector();
        temp = [...myPosts];
    } else {
        const {
            postReducer: { communityPost },
        } = yield useSagaSelector();
        temp = [...communityPost];
    }

    try {
        const res: { data: any; meta?: any } = yield editPosts(data);
        temp[index] = res?.data?.post;
        if (apiType === 'profile') {
            yield put(updateMyPosts(temp));
        } else {
            yield put(updateCommunityPosts(temp));
        }
        callback && callback();
    } catch (err: any) {
        console.error('error on onEditPost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onDeletePost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];
    if (apiType === 'profile') {
        const {
            postReducer: { myPosts },
        } = yield useSagaSelector();
        temp = [...myPosts];
    } else {
        const {
            postReducer: { communityPost },
        } = yield useSagaSelector();
        temp = [...communityPost];
    }
    temp.splice(index, 1);
    if (apiType === 'profile') {
        yield put(updateMyPosts(temp));
    } else {
        yield put(updateCommunityPosts(temp));
    }

    try {
        const res: { data: any; meta?: any } = yield deletePosts(data);
        callback && callback();
    } catch (err: any) {
        console.error(
            'error on onDeletePost(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onLikePost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];

    if (apiType === 'profile') {
        const {
            postReducer: { myPosts },
        } = yield useSagaSelector();
        temp = [...myPosts];
    } else {
        const {
            postReducer: { communityPost },
        } = yield useSagaSelector();
        temp = [...communityPost];
    }

    try {
        const res: { data: any; meta?: any } = yield likePost(data);
        callback && callback(res?.data);
        temp[index] = res?.data?.post;
        if (apiType === 'profile') {
            yield put(updateMyPosts(temp));
        } else {
            yield put(updateCommunityPosts(temp));
        }
    } catch (err: any) {
        console.error('error on onLikePost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onSupportPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];

    if (apiType === 'profile') {
        const {
            postReducer: { myPosts },
        } = yield useSagaSelector();
        temp = [...myPosts];
    } else {
        const {
            postReducer: { communityPost },
        } = yield useSagaSelector();
        temp = [...communityPost];
    }
    try {
        const res: { data: any; meta?: any } = yield supportPost(data);
        callback && callback(res?.data?.post);
        temp[index] = res?.data?.post;
        if (apiType === 'profile') {
            yield put(updateMyPosts(temp));
        } else {
            yield put(updateCommunityPosts(temp));
        }
    } catch (err: any) {
        console.error(
            'error on onSupportPost(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onSavePost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];

    if (apiType === 'profile') {
        const {
            postReducer: { myPosts },
        } = yield useSagaSelector();
        temp = [...myPosts];
    } else {
        const {
            postReducer: { communityPost },
        } = yield useSagaSelector();
        temp = [...communityPost];
    }
    try {
        const res: { data: any; meta?: any } = yield savePost(data);
        callback && callback(res?.data?.post);
        temp[index] = res?.data?.post;
        if (apiType === 'profile') {
            yield put(updateMyPosts(temp));
        } else {
            yield put(updateCommunityPosts(temp));
        }
    } catch (err: any) {
        console.error('error on onSavePost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onCommentPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    const {
        postReducer: { communityPost },
    } = yield useSagaSelector();
    let temp = [...communityPost];

    try {
        const res: { data: any; meta?: any } = yield commentPost(data);
        callback && callback(res?.data?.comments);
        temp[index] = res?.data?.post;
        yield put(updateCommunityPosts(temp));
    } catch (err: any) {
        console.error(
            'error on onCommentPost(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetCommunityCount({ payload }: actionPayload) {
    const {
        communityReducer: { postCount },
    } = yield useSagaSelector();

    try {
        const res: { data: any; meta?: any } = yield getCommunityCount();
        yield put(updatePostCount(res?.data?.total_count));
    } catch (err: any) {
        console.error(
            'error on onCommentPost(communitySaga)',
            err.response.data
        );
    }
}

function* onCommentDelete({ payload }: actionPayload) {
    const { callback, errorCallback, data, finallyCallback } = payload;
    // const {
    //     postReducer: { reflectionListData },
    // } = yield useSagaSelector();
    // let temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield deletePostComment(data);
        callback && callback(res?.data);
        // temp[index] = res?.data?.post;
        // yield put(updateReflectionListData(temp));
    } catch (err: any) {
        console.error(
            'error on onCommentDelete(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    } finally {
        finallyCallback && finallyCallback();
    }
}

function* onCommentUpdate({ payload }: actionPayload) {
    const { callback, errorCallback, data, finallyCallback } = payload;
    // const {
    //     postReducer: { reflectionListData },
    // } = yield useSagaSelector();
    // let temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield updatePostComment(data);
        callback && callback(res?.data);
        // temp[index] = res?.data?.post;
        // yield put(updateReflectionListData(temp));
    } catch (err: any) {
        console.error(
            'error on onCommentUpdate(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    } finally {
        finallyCallback && finallyCallback();
    }
}

export function* communitySagaWatcher() {
    yield takeLatest('GUIDELINE_UPDATE', onUpdateCommunityGuidelines);
    yield takeEvery('GET_COMMUNITY', onGetCommunityType);
    yield takeLatest('STATUS_CHANGE', onStatusChanged);
    yield takeLatest('GET_POSTS', onGetPosts);
    yield takeLatest('GET_USER_POSTS', onGetUserPosts);
    yield takeLatest('GET_COMMENTS', onGetComments);
    yield takeLatest('GET_REPLIES', onGetReplies);
    yield takeLatest('ADD_POSTS', onAddPosts);
    yield takeLatest('EDIT_POSTS', onEditPost);
    yield takeLatest('DELETE_POSTS', onDeletePost);
    yield takeEvery('LIKE_POSTS', onLikePost);
    yield takeEvery('SUPPORT_POSTS', onSupportPost);
    yield takeEvery('SAVE_POSTS', onSavePost);
    yield takeLatest('COMMENT_POSTS', onCommentPost);
    yield takeLatest('GET_COMMUNITY_COUNT', onGetCommunityCount);
    yield takeLatest('DELETE_COMMUNITY_COMMENT', onCommentDelete);
    yield takeLatest('UPDATE_COMMUNITY_COMMENT', onCommentUpdate);
}
