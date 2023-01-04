import {call, delay, put, race, take} from 'redux-saga/effects';
import {checkNetworkService} from 'src/api/networkCheck';
import {isNetworkConnected} from '../reducer/networkReducer';

function* networkPollSaga() {
  while (true) {
    try {
      yield checkNetworkService();
      yield put(isNetworkConnected(true));
      yield put({
        type: 'STOP_NETWORKING_POLLING',
      });
    } catch (err) {
      yield delay(5000);
    }
  }
}

export function* networkingPollingWatcher() {
  while (true) {
    yield take('START_NETWORKING_POLLING');
    yield race([call(networkPollSaga), take('STOP_NETWORKING_POLLING')]);
  }
}
