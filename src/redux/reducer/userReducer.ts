import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { moodType } from 'typings/checkIn';
import { notificationType } from 'typings/notificationType';
import { userProfileType } from 'typings/user';

type TUserType = 'manager' | 'cohost' | 'cleaner' | null;

interface IUser {
    user: userProfileType;
    token: string;
    resetToken: string | undefined;
    userType: TUserType;
    chatCount: number;
    newUser: boolean;
    diaryMessage: boolean;
    moodData: moodType;
    shouldWellness: boolean;
    notificationSettings: notificationType[];
    notificationBadge: boolean;
    checkToken: boolean;
    appState: string;
    shouldReload: boolean;
}

const initialState: IUser = {
    user: {},
    token: '',
    resetToken: '',
    userType: null,
    chatCount: 0,
    newUser: true,
    diaryMessage: true,
    moodData: {},
    shouldWellness: false,
    notificationSettings: [],
    notificationBadge: false,
    appState: 'background',
    checkToken: false,
    shouldReload: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<object>) {
            state.user = action.payload;
        },
        // updateUserProfileData(state, action: PayloadAction<object>) {
        //   state.userProfile = action.payload;
        // },
        updateUserToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        updateUserResetToken(state, action: PayloadAction<string | undefined>) {
            state.resetToken = action.payload;
        },
        updateUserType(state, action: PayloadAction<TUserType>) {
            state.userType = action.payload;
        },
        updateUserCount(state, action: PayloadAction<number>) {
            state.chatCount = action.payload;
        },
        updateNewUser(state, action: PayloadAction<boolean>) {
            state.newUser = action.payload;
        },
        updateDiaryMessage(state, action: PayloadAction<boolean>) {
            state.diaryMessage = action.payload;
        },
        updateShouldWellness(state, action: PayloadAction<boolean>) {
            state.shouldWellness = action.payload;
        },
        updateMoodData(state, action: PayloadAction<moodType>) {
            state.moodData = action.payload;
        },
        updateNotificationSetting(state, action: PayloadAction<any>) {
            state.notificationSettings = action.payload;
        },
        updateNotificationBadge(state, action: PayloadAction<any>) {
            state.notificationBadge = action.payload;
        },
        updateAppState(state, action: PayloadAction<any>) {
            state.appState = action.payload;
        },
        updateCheckToken(state, action: PayloadAction<any>) {
            state.checkToken = action.payload;
        },
        updateShouldReload(state, action: PayloadAction<boolean>) {
            state.shouldReload = action.payload;
        },
    },
});

export const {
    updateUser,
    updateUserToken,
    updateUserType,
    updateUserCount,
    updateNewUser,
    updateUserResetToken,
    updateDiaryMessage,
    updateMoodData,
    updateShouldWellness,
    updateNotificationSetting,
    updateNotificationBadge,
    updateAppState,
    updateCheckToken,
    updateShouldReload,
} = userSlice.actions;
export default userSlice.reducer;
