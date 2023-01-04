import { configureStore, AnyAction } from '@reduxjs/toolkit';
import rootReducer from './reducer/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import createSagaMiddleWare from 'redux-saga';

const persistConfig = {
    key: 'secretPotion',
    storage: AsyncStorage,
};
export const sagaMiddleware = createSagaMiddleWare();
const root_reducer = (state: any, action: AnyAction) => {
    let reduxState = state;
    if (action.type === 'CLEAR_REDUX') {
        for (let [key, value] of Object.entries(reduxState)) {
            if (key === 'appReducer') {
                reduxState[key] = value;
            } else {
                reduxState[key] = undefined;
            }
        }
        state = reduxState;
    }

    return rootReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, root_reducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
        sagaMiddleware,
    ],
});

export default store;
