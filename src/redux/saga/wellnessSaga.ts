import { put, takeLatest } from 'redux-saga/effects';
import {
    activityStatus,
    addSchedule,
    byDateSchedule,
    deleteSchedule,
    getAllActivity,
    getBadgesList,
    getSchedule,
    getWellnessHome,
    getWellnessQuestionDetails,
    getWellnessQuestions,
    submitWellness,
    updateSchedule,
    wellnessActivity,
    wellnessType,
} from 'src/api/wellnessService';
import { useSagaSelector } from 'src/hooks/reducer';
import { updateShouldWellness, updateUser } from '../reducer/userReducer';
import { updateWellnessTypes } from '../reducer/wellnessReducer';

type actionPayload = {
    payload: {
        data: any;
        callback: (data?: any, next?: boolean, bonus?: any) => void;
        errorCallback: () => void;
        finallyCallback: () => void;
        id?: number;
        page?: number;
    };
    type: string;
};

function* onWellnessQuestion({ payload }: actionPayload) {
    const { callback, errorCallback } = payload;
    const {
        userReducer: { user },
    } = yield useSagaSelector();
    try {
        const res: { data: any; meta?: any } = yield getWellnessQuestions();
        callback && callback(res?.data?.wellness);
    } catch (err: any) {
        console.error(
            'error on wellness question(wellness saga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onWellnessQuestionDetail({ payload }: actionPayload) {
    const { callback, errorCallback, id } = payload;
    const {
        userReducer: { user },
    } = yield useSagaSelector();
    try {
        const res: { data: any; meta?: any } = yield getWellnessQuestionDetails(
            id
        );
        callback && callback(res?.data?.wellness);
    } catch (err: any) {
        console.error(
            'error on wellness question detail(wellness saga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onSubmitWellness({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { user },
    } = yield useSagaSelector();
    try {
        const res: { data: any; meta?: any } = yield submitWellness(data);
        if (res?.data?.user) {
            yield put(updateUser(res?.data?.user));
        }
        yield put(updateShouldWellness(false));
        // RootNavigation.dispatch(WellnessRouteNames.WELLNESS);
        callback && callback();
    } catch (err: any) {
        console.error(
            'error on submit wellness (wellness saga)',
            err.response.data
        );
        errorCallback && errorCallback();
    }
}

function* onGetWellness({ payload }: actionPayload) {
    const { callback, errorCallback, data, finallyCallback } = payload;
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield getWellnessHome();

            callback && callback(res?.data);
        } catch (err: any) {
            console.error(
                'error on get wellness (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        } finally {
            finallyCallback && finallyCallback();
        }
    }
}

function* onAddSchedule({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield addSchedule(data);

            callback && callback(res?.data?.data);
        } catch (err: any) {
            console.error(
                'error on get onAddSchedule (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onUpdateSchedule({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield updateSchedule(data);

            callback && callback(res?.data?.data);
        } catch (err: any) {
            console.error(
                'error on get onUpdateSchedule (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onDeleteSchedule({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield deleteSchedule(data);

            callback && callback(res?.data?.data);
        } catch (err: any) {
            console.error(
                'error on get onDeleteSchedule (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}
function* onGetSchedule({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield getSchedule(data);

            callback && callback(res?.data?.schedule);
        } catch (err: any) {
            console.error(
                'error on get onGetSchedule (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onWellnessType({ payload }: actionPayload) {
    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield wellnessType();

            yield put(updateWellnessTypes(res?.data?.wellness));
            payload?.callback && payload.callback();
        } catch (err: any) {
            console.error(
                'error on get onWellnessType (wellness saga)',
                err.response.data
            );
            payload.errorCallback && payload.errorCallback();
        }
    }
}

function* onWellnessActivity({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield wellnessActivity(
                data,
                page
            );
            callback &&
                callback(
                    res?.data,
                    res?.meta?.current_page < res?.meta?.total_page
                );
        } catch (err: any) {
            console.error(
                'error on get onWellnessActivity (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onGetAllActivity({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield getAllActivity(
                data,
                page
            );
            callback &&
                callback(
                    res?.data?.activity,
                    res?.meta?.current_page < res?.meta?.total_page
                );
        } catch (err: any) {
            console.error(
                'error on get onGetAllActivity (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onGetAllActivityByDate({ payload }: actionPayload) {
    const { callback, errorCallback, data, page } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield byDateSchedule(
                data,
                page
            );
            callback &&
                callback(
                    res?.data?.activity,
                    res?.meta?.current_page < res?.meta?.total_page
                );
        } catch (err: any) {
            console.error(
                'error on get onGetAllActivityByDate (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        }
    }
}

function* onGetBadgesList({ payload }: actionPayload) {
    const { callback, errorCallback, data, page, finallyCallback } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield getBadgesList(
                data,
                page
            );
            callback &&
                callback(
                    res?.data?.badge,
                    res?.meta?.current_page < res?.meta?.total_page,
                    res?.data?.bonus
                );
        } catch (err: any) {
            console.error(
                'error on get onGetBadgesList (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        } finally {
            finallyCallback && finallyCallback();
        }
    }
}

function* onActivityStatusUpdate({ payload }: actionPayload) {
    const { callback, errorCallback, data, finallyCallback } = payload;

    const {
        userReducer: { token },
    } = yield useSagaSelector();
    if (token) {
        try {
            const res: { data: any; meta?: any } = yield activityStatus(data);
            callback && callback(res?.data);
        } catch (err: any) {
            console.error(
                'error on get onActivityStatusUpdate (wellness saga)',
                err.response.data
            );
            errorCallback && errorCallback();
        } finally {
            finallyCallback && finallyCallback();
        }
    }
}

export function* wellnessSagaWatcher() {
    yield takeLatest('GET_WELLNESS_QUESTIONS', onWellnessQuestion);
    yield takeLatest('GET_WELLNESS_QUESTIONS_DETAIL', onWellnessQuestionDetail);
    yield takeLatest('SUBMIT_WELLNESS', onSubmitWellness);
    yield takeLatest('GET_WELLNESS', onGetWellness);
    yield takeLatest('ADD_SCHEDULE', onAddSchedule);
    yield takeLatest('BADGES_LIST', onGetBadgesList);
    yield takeLatest('UPDATE_SCHEDULE', onUpdateSchedule);
    yield takeLatest('DELETE_SCHEDULE', onDeleteSchedule);
    yield takeLatest('GET_SCHEDULE', onGetSchedule);
    yield takeLatest('WELLNESS_TYPE', onWellnessType);
    yield takeLatest('WELLNESS_ACTIVITY', onWellnessActivity);
    yield takeLatest('GET_ALL_ACTIVITY', onGetAllActivity);
    yield takeLatest('GET_ALL_ACTIVITY_BT_DATE', onGetAllActivityByDate);
    yield takeLatest('ACTIVITY_STATUS_UPDATE', onActivityStatusUpdate);
}
