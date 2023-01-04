import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProps {
  initialAppLaunch: boolean;
  appUpdate: boolean;
  underMaintenance: boolean;
  storeUrl: string;
  remoteConfigData: object
}

const initialState: IProps = {
  initialAppLaunch: true,
  appUpdate: false,
  underMaintenance: false,
  storeUrl: '',
  remoteConfigData: {}
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInitialAppLaunch(state, action: PayloadAction<boolean>) {
      state.initialAppLaunch = action.payload;
    },
    setAppUpdate(state, action: PayloadAction<boolean>) {
      state.appUpdate = action.payload;
    },
    setUnderMaintenance(state, action: PayloadAction<boolean>) {
      state.underMaintenance = action.payload;
    },
    setStoreUrl(state, action: PayloadAction<string>) {
      state.storeUrl = action.payload;
    },
    setRemoteConfigData(state, action: PayloadAction<object>) {
      state.remoteConfigData = action.payload;
    },
  },
});

export const { setInitialAppLaunch, setAppUpdate, setUnderMaintenance, setStoreUrl, setRemoteConfigData } = appSlice.actions;
export default appSlice.reducer;
