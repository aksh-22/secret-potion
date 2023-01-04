import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  deleteUser,
  getOtherProfile,
  getProfile,
  updateProfile,
  userName
} from 'src/api/profileService';
import { auth } from 'src/firebase';
import { updateUser } from '../reducer/userReducer';

type actionPayload = {
  payload: {
    data: any;
    callback: (data?: any) => void;
    errorCallback: () => void;
    finallyCallback: () => void;
  };
  type: string;
};

function* onGetProfile({ payload }: actionPayload) {
  try {
    const res: { data: any; token?: any } = yield getProfile();
    if (res?.data?.user) {
      yield put(updateUser(res?.data?.user));
    }
    // callback && callback();
  } catch (err: any) {
    console.error('error on onQuestion(authSaga)', err.response.data);
    // errorCallback && errorCallback();
  }
}

function* onGetOtherProfile({ payload }: actionPayload) {
  const { data, callback, errorCallback } = payload;

  try {
    const res: { data: any; token?: any } = yield getOtherProfile(data);
    callback && callback(res?.data?.user);
  } catch (err: any) {
    console.error('error on onQuestion(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onDeleteUser({ payload }: actionPayload) {
  const { callback, errorCallback, finallyCallback } = payload;

  try {
    yield deleteUser();
    yield auth.signOut();
    callback && callback();
  } catch (err: any) {
    console.error('error on onQuestion(authSaga)', err.response.data);
    errorCallback && errorCallback();
  } finally {
    yield put({
      type: 'CLEAR_REDUX',
    });
    finallyCallback && finallyCallback()
  }
}

function* onUpdateProfile({ payload }: actionPayload) {
  const { callback, errorCallback, data } = payload;

  try {
    const res: { data: any; token?: any } = yield updateProfile(data);
    callback && callback(res?.data);
    if (res?.data?.profile) {
      yield put(updateUser(res?.data?.profile));
    }
  } catch (err: any) {
    console.error('error on onQuestion(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}


function* onCheckUsername({ payload }: actionPayload) {
  const { callback, errorCallback, data, finallyCallback } = payload;

  try {
    const res: { data: any; token?: any } = yield userName(data);
    callback && callback(res?.data);

  } catch (err: any) {
    console.error('error on onCheckUsername(authSaga)', err.response.data)

    errorCallback && errorCallback();
  } finally {
    finallyCallback && finallyCallback()
  }
}

export function* profileSagaWatcher() {
  yield takeLatest('GET_PROFILE', onGetProfile);
  yield takeLatest('GET_OTHER_PROFILE', onGetOtherProfile);
  yield takeLatest('UPDATE_PROFILE', onUpdateProfile);
  yield takeEvery('CHECK_USERNAME', onCheckUsername);
  yield takeEvery('DELETE_USER', onDeleteUser);
}
