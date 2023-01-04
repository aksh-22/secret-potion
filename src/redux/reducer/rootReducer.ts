import { combineReducers } from '@reduxjs/toolkit';
import store from '../store';
import userReducer from './userReducer';
import appReducer from './appReducer';
import postReducer from './postReducer';
import networkReducer from './networkReducer';
import wellnessReducer from './wellnessReducer';
import communityReducer from './communityReducer';

const rootReducer = combineReducers({
    userReducer,
    networkReducer,
    appReducer,
    postReducer,
    wellnessReducer,
    communityReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default rootReducer;
export type AppDispatch = typeof store.dispatch;
