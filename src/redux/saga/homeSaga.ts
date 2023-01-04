import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    addPostsReflection,
    commentReflection,
    deletePostsReflection,
    deleteReflectionComment,
    editPostsReflection,
    getCheckIn,
    getCommentsReflection,
    getReflection,
    getReflectionDateList,
    getReflectionList,
    getRepliesReflection,
    getSingleReflection,
    likePostReflection,
    savePostReflection,
    supportPostReflection,
    updateMood,
    updateReflectionComment,
} from 'src/api/homeService';
import { useSagaSelector } from 'src/hooks/reducer';
import { getMoodData } from '../../api/homeService';
import {
    updateReflection,
    updateReflectionListData,
} from '../reducer/postReducer';
import { updateMoodData } from '../reducer/userReducer';

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
    };
    type: string;
};

function* onGetCheckIn({ payload }: actionPayload) {
    const { callback, data, errorCallback } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();

    try {
        if (token) {
            const res: { data: any } = yield getCheckIn(data);
            yield put(updateMoodData(res?.data?.mood));
            // yield put({ type: 'GET_REFLECTION' });
            callback && callback(res?.data?.mood);
        }
    } catch (err: any) {
        console.error('error on onCheckInData(homeSaga)', err.response.data);
        errorCallback && errorCallback();
    } finally {
        errorCallback && errorCallback();
    }
}

function* onUpdateMood({ payload }: actionPayload) {
    const { callback, data, errorCallback, finallyCallback } = payload;
    try {
        const res: { data: any } = yield updateMood(data);
        yield put(updateMoodData(res?.data?.mood));
        callback && callback(res?.data);
    } catch (err: any) {
        console.error('error on onUpdateMood(homeSaga)', err.response.data);
        errorCallback && errorCallback();
    } finally {
        finallyCallback && finallyCallback();
    }
}

function* onGetMoodData({ payload }: actionPayload) {
    const { callback, data, errorCallback } = payload;

    try {
        const res: { data: any } = yield getMoodData(data);
        callback && callback(res?.data);
    } catch (err: any) {
        console.error('error on onGetMoodData(homeSaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetReflection({ payload }: actionPayload) {
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta: any } = yield getReflection();
            yield put(updateReflection(res?.data?.question));
            payload?.callback &&
                payload?.callback(
                    res?.meta?.current_page < res?.meta?.total_page
                );
        } catch (err: any) {
            console.error(
                'error on onGetReflection(homeSaga)',
                err.response.data
            );
            payload?.errorCallback && payload?.errorCallback();
        }
    }
}

function* onGetReflectionList({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    let temp = [];
    if (reflectionListData?.length) temp = [...reflectionListData];
    try {
        const res: { data: any; meta?: any } = yield getReflectionList(data);
        if (data?.post_id) {
            temp[index] = res?.data?.post;
            yield put(updateReflectionListData(temp));
        } else {
            if (res?.meta?.current_page === 1) {
                yield put(updateReflectionListData(res?.data?.posts));
            } else {
                temp = [...temp, ...res?.data?.posts];
                yield put(updateReflectionListData(temp));
            }
        }
        callback && callback(res?.meta?.current_page < res?.meta?.total_page);
    } catch (err: any) {
        console.error(
            'error on onGetReflectionList(homeSaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetSingleReflection({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;

    try {
        const res: { data: any; meta?: any } = yield getSingleReflection(data);
        callback && callback('', res?.data?.post);
    } catch (err: any) {
        console.error(
            'error on onGetSingleReflection(homeSaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetReflectionDateList({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, page } = payload;
    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    let temp = [];
    if (reflectionListData?.length) temp = [...reflectionListData];
    try {
        const res: { data: any; meta?: any } = yield getReflectionDateList(
            data,
            page
        );
        if (res?.meta?.current_page === 1) {
            yield put(updateReflectionListData(res?.data?.post));
        } else {
            temp = [...temp, ...res?.data?.post];
            yield put(updateReflectionListData(temp));
        }
        callback &&
            callback(
                res?.meta?.current_page < res?.meta?.total_page,
                res?.data?.question
            );
    } catch (err: any) {
        console.error(
            'error on onGetReflectionDateList(homeSaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onLikePost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    let temp = [];

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield likePostReflection(data);
        callback && callback(res?.data);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
    } catch (err: any) {
        console.error('error on onLikePost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onSupportPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    let temp = [];

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield supportPostReflection(
            data
        );
        callback && callback(res?.data?.post);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
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

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield savePostReflection(data);
        callback && callback(res?.data?.post);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
    } catch (err: any) {
        console.error('error on onSavePost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetComments({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    try {
        const res: { data: any; meta?: any } = yield getCommentsReflection(
            data,
            page
        );
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

function* onAddPosts({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;

    let temp = [];

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield addPostsReflection(data);
        temp.unshift(res?.data?.post);

        yield put(updateReflectionListData(temp));
        callback && callback();
    } catch (err: any) {
        console.error('error on onAddPosts(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onEditPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;

    let temp = [];

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];
    try {
        const res: { data: any; meta?: any } = yield editPostsReflection(data);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
        callback && callback();
    } catch (err: any) {
        console.error('error on onEditPost(communitySaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onDeletePost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    let temp = [];

    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    temp = [...reflectionListData];
    temp.splice(index, 1);
    yield put(updateReflectionListData(temp));

    try {
        const res: { data: any; meta?: any } = yield deletePostsReflection(
            data
        );
        callback && callback();
    } catch (err: any) {
        console.error(
            'error on onDeletePost(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetReplies({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    try {
        const res: { data: any; meta?: any } = yield getRepliesReflection(
            data,
            page
        );
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
    } finally {
        errorCallback && errorCallback();
    }
}

function* onCommentPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index, apiType } = payload;
    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    let temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield commentReflection(data);
        callback && callback(res?.data?.comments);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
    } catch (err: any) {
        console.error(
            'error on onCommentPost(communitySaga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onCommentDelete({ payload }: actionPayload) {
    const { callback, errorCallback, data, finallyCallback } = payload;
    // const {
    //     postReducer: { reflectionListData },
    // } = yield useSagaSelector();
    // let temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield deleteReflectionComment(
            data
        );
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
    const { callback, errorCallback, data, index, apiType, finallyCallback } =
        payload;
    // const {
    //     postReducer: { reflectionListData },
    // } = yield useSagaSelector();
    // let temp = [...reflectionListData];

    try {
        const res: { data: any; meta?: any } = yield updateReflectionComment(
            data
        );
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

export function* homeSagaWatcher() {
    yield takeLatest('GET_CHECKIN', onGetCheckIn);
    yield takeLatest('UPDATE_MOOD', onUpdateMood);
    yield takeLatest('GET_MOOD_DATA', onGetMoodData);
    yield takeLatest('GET_REFLECTION', onGetReflection);
    yield takeLatest('GET_REFLECTION_LIST', onGetReflectionList);
    yield takeLatest('GET_SINGLE_REFLECTION_LIST', onGetSingleReflection);
    yield takeLatest('GET_REFLECTION_DATE_LIST', onGetReflectionDateList);
    yield takeEvery('LIKE_REFLECTION', onLikePost);
    yield takeEvery('SUPPORT_REFLECTION', onSupportPost);
    yield takeEvery('SAVE_REFLECTION', onSavePost);
    yield takeLatest('GET_COMMENTS_REFLECTION', onGetComments);
    yield takeLatest('ADD_REFLECTION', onAddPosts);
    yield takeLatest('EDIT_REFLECTION', onEditPost);
    yield takeLatest('DELETE_POSTS_REFLECTION', onDeletePost);
    yield takeLatest('GET_REPLIES_REFLECTION', onGetReplies);
    yield takeLatest('COMMENT_REFLECTION', onCommentPost);
    yield takeLatest('DELETE_REFLECTION_COMMENT', onCommentDelete);
    yield takeLatest('UPDATE_REFLECTION_COMMENT', onCommentUpdate);
}
