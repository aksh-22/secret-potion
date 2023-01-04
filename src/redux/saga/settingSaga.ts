import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getSettings,
  updateNotificationSettings,
} from 'src/api/settingsService';
import { updateNotificationSetting } from '../reducer/userReducer';

type actionPayload = {
  payload: {
    data?: any;
    callback?: (data?: any) => void;
    errorCallback?: () => void;
    id?: number;
  };
  type: string;
};

function* onGetNotificationSettings({ payload }: actionPayload) {
  try {
    const res: { data: any; token?: any } = yield getSettings();
    yield put(updateNotificationSetting(res?.data?.notificationOption));
    // callback && callback();
  } catch (err: any) {
    console.error(
      'error on onGetNotificationSettings(settingSaga)',
      err.response.data
    );
    // errorCallback && errorCallback();
  }
}

function* onUpdateNotificationSettings({ payload }: actionPayload) {
  const { callback, errorCallback, id } = payload;
  try {
    const res: { data: any; token?: any } = yield updateNotificationSettings(
      id
    );
    yield put(updateNotificationSetting(res?.data?.notificationOption));
    callback && callback();
  } catch (err: any) {
    console.error(
      'error on onGetNotificationSettings(settingSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

export function* settingSagaWatcher() {
  yield takeLatest('GET_NOTIFICATION_SETTINGS', onGetNotificationSettings);
  yield takeEvery('UPDATE_NOTIFICATION_SETTINGS', onUpdateNotificationSettings);
}
