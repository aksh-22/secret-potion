import { put, takeLatest } from 'redux-saga/effects';
import {
  acceptRequest,
  cancelRequest,
  declineRequest,
  getConnection,
  getReceiveRequest,
  getSendRequest,
  removeFriend,
  sendRequest,
} from 'src/api/connectionService';
import { useSagaSelector } from 'src/hooks/reducer';
import { updateCommunityPosts, updateMyPosts, updateReflectionListData } from '../reducer/postReducer';

type actionPayload = {
  payload: {
    data?: any;
    index?: number;
    callback?: (data?: any, next?: boolean) => void;
    errorCallback?: () => void;
    id?: number;
    shouldUpdateStorage?: boolean;
    page?: number;
    apiType?: string;
  };
  type: string;
};

function* onGetConnections({ payload }: actionPayload) {
  const { callback, errorCallback, page } = payload;
  try {
    const res: { data: any; meta?: any } = yield getConnection(page);
    callback &&
      callback(res?.data, res?.meta?.current_page < res?.meta?.total_page);
  } catch (err: any) {
    console.error(
      'error on onGetConnections(connectionSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onGetSendRequests({ payload }: actionPayload) {
  const { callback, errorCallback, page } = payload;
  try {
    const res: { data: any; meta?: any } = yield getSendRequest(page);
    callback &&
      callback(res?.data, res?.meta?.current_page < res?.meta?.total_page);
  } catch (err: any) {
    console.error(
      'error on onGetSendRequests(connectionSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onGetReceiveRequests({ payload }: actionPayload) {
  const { callback, errorCallback, page } = payload;
  try {
    const res: { data: any; meta?: any } = yield getReceiveRequest(page);
    callback &&
      callback(res?.data, res?.meta?.current_page < res?.meta?.total_page);
  } catch (err: any) {
    console.error(
      'error on onGetReceiveRequests(connectionSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onSendRequests({ payload }: actionPayload) {
  const { callback, errorCallback, data, index, shouldUpdateStorage, apiType } =
    payload;
  let temp = [];
  if (shouldUpdateStorage) {
    if (apiType === 'profile') {
      const {
        postReducer: { myPosts },
      } = yield useSagaSelector();
      temp = [...myPosts];
    } else if (apiType === 'reflection') {
      const {
        postReducer: { reflectionListData },
      } = yield useSagaSelector();
      temp = [...reflectionListData];
    } else {
      const {
        postReducer: { communityPost },
      } = yield useSagaSelector();
      temp = [...communityPost];
    }
  }

  try {
    const res: { data: any; token?: any } = yield sendRequest(data);
    temp[index] = res?.data?.post;
    if (shouldUpdateStorage) {
      if (apiType === 'profile') {
        yield put(updateMyPosts(temp));
      } else if (apiType === 'reflection') {
        yield put(updateReflectionListData(temp));
      } else {
        yield put(updateCommunityPosts(temp));
      }
    }
    callback && callback(res?.data);
  } catch (err: any) {
    console.error('error on onSendRequests(connectionSaga)', err.response.data);
    if (err.response.data?.data?.post) {
      if (shouldUpdateStorage) {
        temp[index] = err.response.data?.data?.post;
        yield put(updateCommunityPosts(temp));
      }
    }
    errorCallback && errorCallback();
  }
}

function* onCancelRequests({ payload }: actionPayload) {
  const { callback, errorCallback, data, index, shouldUpdateStorage, apiType } =
    payload;
  let temp = [];
  if (shouldUpdateStorage) {
    if (apiType === 'profile') {
      const {
        postReducer: { myPosts },
      } = yield useSagaSelector();
      temp = [...myPosts];
    } else if (apiType === 'reflection') {
      const {
        postReducer: { reflectionListData },
      } = yield useSagaSelector();
      temp = [...reflectionListData];
    } else {
      const {
        postReducer: { communityPost },
      } = yield useSagaSelector();
      temp = [...communityPost];
    }
  }

  try {
    const res: { data: any; token?: any } = yield cancelRequest(data);
    temp[index] = res?.data?.post;
    if (shouldUpdateStorage) {
      if (apiType === 'profile') {
        yield put(updateMyPosts(temp));
      } else if (apiType === 'reflection') {
        yield put(updateReflectionListData(temp));
      } else {
        yield put(updateCommunityPosts(temp));
      }
    }
    callback && callback(res?.data);
  } catch (err: any) {
    console.error(
      'error on onCancelRequests(connectionSaga)',
      err.response.data
    );
    if (err.response.data?.data?.post) {
      if (shouldUpdateStorage) {
        temp[index] = err.response.data?.data?.post;
        yield put(updateCommunityPosts(temp));
      }
    }
    errorCallback && errorCallback();
  }
}

function* onDeclineRequests({ payload }: actionPayload) {
  const { callback, errorCallback, data } = payload;
  try {
    const res: { data: any; token?: any } = yield declineRequest(data);
    callback && callback(res?.data);
  } catch (err: any) {
    console.error(
      'error on onDeclineRequests(connectionSaga)',
      err.response.data
    );
    errorCallback && errorCallback();
  }
}

function* onRemoveFriend({ payload }: actionPayload) {
  const { callback, errorCallback, data } = payload;
  try {
    const res: { data: any; token?: any } = yield removeFriend(data);
    callback && callback();
  } catch (err: any) {
    console.error('error on onRemoveFriend(connectionSaga)', err.response.data);
    errorCallback && errorCallback();
  }
}

function* onAcceptRequests({ payload }: actionPayload) {
  const { callback, errorCallback, data, index, shouldUpdateStorage, apiType } =
    payload;
  let temp = [];
  if (shouldUpdateStorage) {
    if (apiType === 'profile') {
      const {
        postReducer: { myPosts },
      } = yield useSagaSelector();
      temp = [...myPosts];
    } else if (apiType === 'reflection') {
      const {
        postReducer: { reflectionListData },
      } = yield useSagaSelector();
      temp = [...reflectionListData];
    } else {
      const {
        postReducer: { communityPost },
      } = yield useSagaSelector();
      temp = [...communityPost];
    }
  }

  try {
    const res: { data: any; token?: any } = yield acceptRequest(data);
    temp[index] = res?.data?.post;
    if (shouldUpdateStorage) {
      if (apiType === 'profile') {
        yield put(updateMyPosts(temp));
      } else if (apiType === 'reflection') {
        yield put(updateReflectionListData(temp));
      } else {
        yield put(updateCommunityPosts(temp));
      }
    }
    callback && callback(res?.data);
  } catch (err: any) {
    console.error(
      'error on onAcceptRequests(connectionSaga)',
      err.response.data
    );
    if (err.response.data?.data?.post) {
      if (shouldUpdateStorage) {
        temp[index] = err.response.data?.data?.post;
        yield put(updateCommunityPosts(temp));
      }
    }
    errorCallback && errorCallback();
  }
}

export function* connectionSagaWatcher() {
  yield takeLatest('GET_CONNECTION', onGetConnections);
  yield takeLatest('GET_SEND_REQUEST', onGetSendRequests);
  yield takeLatest('GET_RECEIVE_REQUEST', onGetReceiveRequests);
  yield takeLatest('SEND_REQUEST', onSendRequests);
  yield takeLatest('ACCEPT_REQUEST', onAcceptRequests);
  yield takeLatest('REMOVE_FRIEND', onRemoveFriend);
  yield takeLatest('CANCEL_REQUEST', onCancelRequests);
  yield takeLatest('DECLINE_REQUEST', onDeclineRequests);
}
