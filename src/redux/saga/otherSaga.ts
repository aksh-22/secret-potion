import { put, takeLatest } from 'redux-saga/effects';
import {
    aboutUs,
    faq,
    getNotificationList,
    helpAndSupport,
    library,
    markReadNotification,
    reportOption,
    reportPost,
    reportReflection,
} from 'src/api/otherService';
import { useSagaSelector } from 'src/hooks/reducer';
import {
    updateCommunityPosts,
    updateNotificationList,
    updateReflectionListData,
} from '../reducer/postReducer';
import { updateUser } from '../reducer/userReducer';

type actionPayload = {
    payload: {
        data: any;
        callback: (data?: any) => void;
        errorCallback: () => void;
        index?: number;
        page?: number;
    };
    type: string;
};

function* onHelpAndSupport({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    try {
        const res: { data: any; token?: any } = yield helpAndSupport(data);
        callback && callback();
    } catch (err: any) {
        console.error('error onHelpAndSupport(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetAboutUs({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    try {
        const res: { data: any; token?: any } = yield aboutUs();
        callback && callback(res?.data?.page);
    } catch (err: any) {
        console.error('error onHelpAndSupport(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetFAQ({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    try {
        const res: { data: any; token?: any } = yield faq();
        callback && callback(res?.data?.faq);
    } catch (err: any) {
        console.error('error onFAQ(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onMarkReadNotification({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;

    const {
        userReducer: { user },
    } = yield useSagaSelector();

    try {
        const res: { data: any; token?: any } = yield markReadNotification(
            data
        );
        const temp = { ...user };
        temp.unread_notification = res?.data?.count;
        if (temp?.id) {
            yield put(updateUser(temp));
        }
        callback && callback(res?.data);
    } catch (err: any) {
        console.error('error onFAQ(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetReportOption({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    try {
        const res: { data: any; token?: any } = yield reportOption();
        callback && callback(res?.data?.post_options);
    } catch (err: any) {
        console.error('error onGetReportOption(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onReportPost({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    const {
        postReducer: { communityPost },
    } = yield useSagaSelector();
    let temp = [...communityPost];

    try {
        const res: { data: any; token?: any } = yield reportPost(data);
        temp[index] = res?.data?.post;
        yield put(updateCommunityPosts(temp));
        callback && callback();
    } catch (err: any) {
        console.error('error onReportPost(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onReportReflection({ payload }: actionPayload) {
    const { callback, errorCallback, data, index } = payload;
    const {
        postReducer: { reflectionListData },
    } = yield useSagaSelector();
    let temp = [...reflectionListData];

    try {
        const res: { data: any; token?: any } = yield reportReflection(data);
        temp[index] = res?.data?.post;
        yield put(updateReflectionListData(temp));
        callback && callback();
    } catch (err: any) {
        console.error(
            'error onReportReflection(other saga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetLibrary({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    try {
        const res: { data: any; token?: any } = yield library();
        callback && callback(res?.data?.library);
    } catch (err: any) {
        console.error('error onLibrary(other saga)', err.response.data);
        errorCallback && errorCallback();
    }
}

function* onGetNotificationList({ payload }: actionPayload) {
    const {
        postReducer: { notificationList },
        userReducer: { user },
    } = yield useSagaSelector();

    let temp = [...notificationList];
    try {
        const res: { data: any; meta?: any } = yield getNotificationList(
            payload?.page
        );
        const tempUser = { ...user };
        tempUser.unread_notification = res?.data?.count;
        if (tempUser?.id) {
            yield put(updateUser(tempUser));
        }
        if (res?.meta?.current_page === 1) {
            temp = res?.data?.notification;
            yield put(updateNotificationList(temp));
        } else {
            temp = [...temp, ...res?.data?.notification];
            yield put(updateNotificationList(temp));
        }
        payload?.callback &&
            payload?.callback(res?.meta?.current_page < res?.meta?.total_page);
    } catch (err: any) {
        console.error('error onLibrary(other saga)', err.response.data);
        payload?.errorCallback && payload?.errorCallback();
    }
}

export function* otherSagaWatcher() {
    yield takeLatest('HELP_AND_SUPPORT', onHelpAndSupport);
    yield takeLatest('ABOUT_US', onGetAboutUs);
    yield takeLatest('FAQ', onGetFAQ);
    yield takeLatest('REPORT_OPTIONS', onGetReportOption);
    yield takeLatest('REPORT_POST', onReportPost);
    yield takeLatest('REPORT_REFLECTION', onReportReflection);
    yield takeLatest('LIBRARY', onGetLibrary);
    yield takeLatest('NOTIFICATION_LIST', onGetNotificationList);
    yield takeLatest('MARK_READ_NOTIFICATION', onMarkReadNotification);
}
