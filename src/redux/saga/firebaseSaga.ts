import { takeLatest } from 'redux-saga/effects';
import { firebaseLogin, uploadImage } from 'src/api/firebaseService';

type actionPayload = {
  payload: {
    token: string;
    callback: () => void;
    errorCallBack: () => void;
  };
  type: string;
};

function* onFirebaseLogin({ payload }: actionPayload) {
  const { callback, token, errorCallBack } = payload;
  try {
    const loginFb: any = yield firebaseLogin(token);
    callback && callback();
  } catch (err) {
    console.error('error on firebase login', err);
    // callback();
    errorCallBack && errorCallBack();
  }
}

type imagePayload = {
  payload: {
    data: any;
    callback: (val: any) => void;
    errorCallBack: () => void;
  };
  type: string;
};

function* onUploadImage({ payload }: imagePayload) {
  const { callback, data, errorCallBack } = payload;
  try {
    const imageLink: any = yield uploadImage(data);
    callback && callback(imageLink);
  } catch (err) {
    console.error('error on image upload', err);
    // callback();
    errorCallBack && errorCallBack();
  }
}

export function* firebaseSagaWatcher() {
  yield takeLatest('FIREBASE_LOGIN', onFirebaseLogin);
  yield takeLatest('UPLOAD_IMAGE', onUploadImage);
}
