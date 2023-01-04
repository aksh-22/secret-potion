import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diaryDetailType } from 'typings/diaryDetail';
import { NType } from 'typings/notificationListType';

type TUserType = 'manager' | 'cohost' | 'cleaner' | null;
interface IUser {
    communityPost: postType[];
    myPosts: postType[];
    reflectionListData: postType[];
    notificationList: NType[];
    reflection: {};
    chatCount: number;
    diaryData: diaryDetailType[];
}

const initialState: IUser = {
    communityPost: [],
    myPosts: [],
    notificationList: [],
    reflection: {},
    reflectionListData: [],
    chatCount: 0,
    diaryData: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updateCommunityPosts(state, action: PayloadAction<any>) {
            state.communityPost = action.payload;
        },
        reduceCommunityPostsCommentCount(state, action: PayloadAction<any>) {
            state.communityPost[action.payload?.index].total_comment =
                action.payload?.count;
        },
        reduceReflectionPostsCommentCount(state, action: PayloadAction<any>) {
            state.reflectionListData[action.payload?.index].total_comment =
                action.payload?.count;
        },
        deleteCommunityPostComment(state, action: PayloadAction<any>) {
            state.reflectionListData[action.payload?.index].total_comment =
                action.payload?.count;
        },
        deleteReflectionPostComment(state, action: PayloadAction<any>) {
            state.reflectionListData[action.payload?.index].total_comment =
                action.payload?.count;
        },

        updateMyPosts(state, action: PayloadAction<any>) {
            state.myPosts = action.payload;
        },
        updateReflectionListData(state, action: PayloadAction<any>) {
            state.reflectionListData = action.payload;
        },
        updateNotificationList(state, action: PayloadAction<any>) {
            state.notificationList = action.payload;
        },
        updateReflection(state, action: PayloadAction<any>) {
            state.reflection = action.payload;
        },
        updateUserCount(state, action: PayloadAction<number>) {
            state.chatCount = action.payload;
        },
        updateDiaryData(state, action: PayloadAction<any>) {
            state.diaryData = action.payload;
        },
        updateDiary(state, action: PayloadAction<any>) {
            const temp = [...state.diaryData];
            temp[action.payload.index] = action.payload.data;
            state.diaryData = temp;
        },
        addDiaryData(state, action: PayloadAction<any>) {
            state.diaryData = [action.payload, ...state.diaryData];
        },
        deleteDiaryData(state, action: PayloadAction<any>) {
            const temp = [...state.diaryData];
            temp.splice(action.payload.index, 1);
            state.diaryData = temp;
        },
    },
});

export const {
    updateCommunityPosts,
    updateMyPosts,
    updateNotificationList,
    updateReflection,
    updateReflectionListData,
    updateUserCount,
    updateDiaryData,
    addDiaryData,
    updateDiary,
    deleteDiaryData,
    reduceCommunityPostsCommentCount,
    reduceReflectionPostsCommentCount,
    deleteCommunityPostComment,
    deleteReflectionPostComment,
} = postSlice.actions;
export default postSlice.reducer;
