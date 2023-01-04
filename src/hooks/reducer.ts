import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { select } from 'redux-saga/effects';
import { AppDispatch, RootState } from 'src/redux/reducer/rootReducer';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppSelector1 = () => useSelector((state: RootState) => state);
export const useSagaSelector = () => select((state) => state);
