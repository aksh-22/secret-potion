import { put, takeLatest } from 'redux-saga/effects';
import {
  changePassword,
  forgotPassword,
  forgotPasswordVerify,
  login,
  logout,
  resendEmail,
  signUp,
  verifyEmail,
} from 'src/api/authService';
import { AuthRouteNames } from 'src/constants/routeName';
import { auth } from 'src/firebase';
import * as RootNavigation from 'src/utils/navigationRef';
import {
  updateDiaryMessage,
  updateNewUser,
  updateUser,
  updateUserResetToken,
  updateUserToken,
} from '../reducer/userReducer';

type actionPayload = {
  payload: {
    data: any;
    callback: (data?: any) => void;
    errorCallback: () => void;
    finallyCallback: () => void;
  };
  type: string;
};

function* onLogin({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield login(data);
    yield put({
      type: 'FIREBASE_LOGIN',
      payload: {
        token: res?.data?.firebase,
      },
    });
    callback && callback(res);
    yield put(updateNewUser(false));
    yield put(updateUser(res?.data?.user));
    if (res?.data?.user?.diary) {
      yield put(updateDiaryMessage(false));
    }
    yield put(updateUserToken(res?.token));
  } catch (err: any) {
    console.error('error on onLogin(authSaga)', err.response.data);
    if (err.response.status === 509) {
      RootNavigation.navigate(AuthRouteNames.OTP, { email: data?.email });
    }
    errorCallback && errorCallback();
  }
}

function* onSignUp({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield signUp(data);
    yield put(updateUserResetToken(undefined));
    callback && callback();
  } catch (err: any) {
    console.error('error on onSignUp(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onVerifyEmail({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield verifyEmail(data);
    yield put({
      type: 'FIREBASE_LOGIN',
      payload: {
        token: res?.data?.firebase,
      },
    });
    if (res?.token) {
      yield put(updateUserToken(res?.token));
    }
    if (res?.data?.user) {
      yield put(updateUser(res?.data?.user));
    }
    callback && callback(res);
  } catch (err: any) {
    console.error('error on verifyEmail(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onForgotPasswordVerifyEmail({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield forgotPasswordVerify(data);
    yield put(updateUserResetToken(res?.token));
    callback && callback(res);
  } catch (err: any) {
    console.error(
      'error on forgotPasswordVerifyEmail(authSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onForgotPassword({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield forgotPassword(data);
    yield put(updateUserResetToken(undefined));
    callback && callback(res);
  } catch (err: any) {
    console.error(
      'error on forgotPasswordVerifyEmail(authSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onResendEmail({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield resendEmail(data);
    callback && callback();
  } catch (err: any) {
    console.error('error on verifyEmail(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onLogout({ payload }: actionPayload) {
  const { callback, finallyCallback } = payload;

  try {
    yield logout();
    yield auth.signOut();
    callback && callback();
  } catch (error: any) {
    console.error('error on logout(authSaga)', error.response.data);
  } finally {
    yield put({
      type: 'CLEAR_REDUX',
    });
    finallyCallback && finallyCallback()
  }
}

function* onChangePassword({ payload }: actionPayload) {
  const { callback, data, errorCallback } = payload;
  try {
    const res: { data: any; token?: any } = yield changePassword(data);
    callback && callback();
  } catch (err: any) {
    console.error('error on changePassword(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

export function* authSagaWatcher() {
  yield takeLatest('LOGIN_ACTION', onLogin);
  yield takeLatest('SIGNUP_ACTION', onSignUp);
  yield takeLatest('VERIFY_EMAIL', onVerifyEmail);
  yield takeLatest('FORGOT_PASSWORD', onForgotPassword);
  yield takeLatest('CHANGE_PASSWORD', onChangePassword);
  yield takeLatest('FORGOT_PASSWORD_VERIFY_EMAIL', onForgotPasswordVerifyEmail);
  yield takeLatest('RESEND_EMAIL', onResendEmail);
  yield takeLatest('USER_LOGOUT', onLogout);
}
