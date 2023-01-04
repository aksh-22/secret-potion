import { put, takeLatest } from 'redux-saga/effects';
import {
  addDiary,
  deleteDiary,
  getDiary,
  getDiaryDetails,
  updateDiaryDetails
} from 'src/api/diaryService';
import { useSagaSelector } from 'src/hooks/reducer';
import { addDiaryData, deleteDiaryData, updateDiary, updateDiaryData } from '../reducer/postReducer';

type actionPayload = {
  payload: {
    data: any;
    page?: number | undefined | null | any;
    callback: (data?: any, next?: boolean) => void;
    errorCallback: () => void;
    finallyCallback: () => void;
    index?: number | any;
    diaryIndex?: any
  };
  type: string;
};

function* onGetDiary({ payload }: actionPayload) {
  const { callback, errorCallback, page, data } = payload;
  let temp = []
  // if (index) {
  const {
    postReducer: { diaryData },
  } = yield useSagaSelector();
  temp = [...diaryData];
  try {
    const res: { data: any; meta?: any } = yield getDiary(page, data.date);

    if (res?.meta?.current_page === 1) {
      yield put(updateDiaryData(res?.data?.diaries))
    } else {
      temp = [...temp, ...res?.data?.diaries];
      yield put(updateDiaryData(temp));
    }
    callback &&
      callback(
        res?.data?.diaries,
        res?.meta?.current_page < res?.meta?.total_page
      );
  } catch (err: any) {
    console.error('error on onGetDiary(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onGetDiaryDetails({ payload }: actionPayload) {
  const { callback, errorCallback, data } = payload;
  try {
    const res: { data: any } = yield getDiaryDetails(data?.index);
    callback && callback(res);
  } catch (err: any) {
    console.error('error on onGetDiaryDetails(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onUpdateDiaryDetails({ payload }: actionPayload) {
  const { callback, errorCallback, data, index, diaryIndex, finallyCallback } = payload;
  try {
    const res: { data: any } = yield updateDiaryDetails(data, diaryIndex);
    yield put(updateDiary({ index, data: res?.data?.diary }));
    callback && callback(res);
  } catch (err: any) {
    console.error('error on onupdateDiaryDetails(authSaga)', err.response.data);
    errorCallback && errorCallback();
  } finally {
    finallyCallback && finallyCallback()
  }
}

function* onDeleteDiary({ payload }: actionPayload) {
  const { callback, errorCallback, index, diaryIndex } = payload;
  try {
    const res: { data: any } = yield deleteDiary(diaryIndex);
    yield put(deleteDiaryData({ index }));

    callback && callback(res);
  } catch (err: any) {
    console.error('error on onDeleteDiaryDetails(authSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onAddDiary({ payload }: actionPayload) {
  const { callback, errorCallback, data, finallyCallback } = payload;

  const {
    postReducer: { diaryData },
  } = yield useSagaSelector();

  try {
    const res: { data: any } = yield addDiary(data);
    yield put(addDiaryData(res?.data?.diary));

    callback && callback();
  } catch (err: any) {
    console.error('error on onAddDiaryDetails(authSaga)', err.response.data);
    errorCallback && errorCallback();
  } finally {
    finallyCallback && finallyCallback()
  }
}

export function* diarySagaWatcher() {
  yield takeLatest('GET_DIARY', onGetDiary);
  yield takeLatest('GET_DIARY_DETAILS', onGetDiaryDetails);
  yield takeLatest('ADD_DIARY', onAddDiary);
  yield takeLatest('UPDATE_DIARY', onUpdateDiaryDetails);
  yield takeLatest('DELETE_DIARY', onDeleteDiary);
}
