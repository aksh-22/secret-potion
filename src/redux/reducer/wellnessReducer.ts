import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { wellnessType } from 'typings/wellnessType';

interface IWellness {
    wellnessTypes: wellnessType[];

}

const initialState: IWellness = {
    wellnessTypes: [],
};

const wellnessSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updateWellnessTypes(state, action: PayloadAction<any>) {
            state.wellnessTypes = action.payload;
        },
    },
});

export const {
    updateWellnessTypes,
} = wellnessSlice.actions;
export default wellnessSlice.reducer;
