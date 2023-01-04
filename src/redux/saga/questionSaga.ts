import { put, takeLatest } from 'redux-saga/effects';
import { getQuestions } from 'src/api/questionService';
import { BottomRouteNames, WellnessRouteNames } from 'src/constants/routeName';
import { useSagaSelector } from 'src/hooks/reducer';
import { navigate } from 'src/utils/navigationRef';
import { updateShouldWellness, updateUser } from '../reducer/userReducer';

type actionPayload = {
    payload: {
        data: any;
        callback: (data?: any) => void;
        errorCallback: () => void;
    };
    type: string;
};

function* onQuestion({ payload }: actionPayload) {
    const { callback, errorCallback, data } = payload;
    const {
        userReducer: { user },
    } = yield useSagaSelector();
    try {
        const res: { data: any; token?: any } = yield getQuestions(
            data && data
        );
        if (res?.data?.question) {
            callback && callback(res?.data?.question);
        } else {
            let a = { ...user, onboarding_question: true };
            if (a?.id) {
                yield put(updateUser(a));
            }
            if (res?.data?.lastreply) {
                yield put(updateShouldWellness(true));
                navigate(WellnessRouteNames.WELLNESS_QUESTION);
            }
            // callback && callback(res?.data?.question);
        }
        // yield put(updateNewUser(false));
    } catch (err: any) {
        console.error('error on onQuestion(authSaga)', err.response.data);
        errorCallback && errorCallback();
    }
}

export function* questionSagaWatcher() {
    yield takeLatest('QUESTIONS', onQuestion);
}
