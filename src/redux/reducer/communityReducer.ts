import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICommunity {
    postCount: number;
}

const initialState: ICommunity = {
    postCount: 0,
};

const communitySlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updatePostCount(state, action: PayloadAction<any>) {
            state.postCount = action.payload;
        },
        reducePostCount(state, action: PayloadAction<any>) {
            state.postCount = state.postCount - action.payload;
        },
        addPostCount(state, action: PayloadAction<any>) {
            state.postCount = state.postCount + action.payload;
        },
    },
});

export const { updatePostCount, reducePostCount, addPostCount } =
    communitySlice.actions;
export default communitySlice.reducer;
