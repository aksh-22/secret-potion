import { all, call, spawn } from 'redux-saga/effects';
import { authSagaWatcher } from './authSaga';
import { communitySagaWatcher } from './communitySaga';
import { connectionSagaWatcher } from './connectionSaga';
import { diarySagaWatcher } from './diarySaga';
import { firebaseSagaWatcher } from './firebaseSaga';
import { homeSagaWatcher } from './homeSaga';
import { networkingPollingWatcher } from './networkSaga';
import { otherSagaWatcher } from './otherSaga';
import { profileSagaWatcher } from './profileSaga';
import { questionSagaWatcher } from './questionSaga';
import { settingSagaWatcher } from './settingSaga';
import { wellnessSagaWatcher } from './wellnessSaga';
export default function* rootSaga() {
  const sagas = [
    networkingPollingWatcher,
    authSagaWatcher,
    diarySagaWatcher,
    questionSagaWatcher,
    profileSagaWatcher,
    homeSagaWatcher,
    wellnessSagaWatcher,
    settingSagaWatcher,
    otherSagaWatcher,
    connectionSagaWatcher,
    communitySagaWatcher,
    firebaseSagaWatcher,
  ]

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );


}
