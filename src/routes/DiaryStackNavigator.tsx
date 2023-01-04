import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { DiaryRouteNames } from 'src/constants/routeName';
import { useAppSelector1 } from 'src/hooks/reducer';
import Diary from 'src/screens/diary/Diary';
import DiaryDetails from 'src/screens/diary/DiaryDetails';
import FirstDiaryPage from 'src/screens/diary/FirstDiaryPage';
import { DiaryStackParamList } from './types/navigation';

const Stack = createStackNavigator<DiaryStackParamList>();

const DiaryStackNavigator = ({ navigation }) => {
    const { Navigator, Screen } = Stack;

    const {
        userReducer: { user, diaryMessage },
    } = useAppSelector1();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {diaryMessage && (
                <Screen
                    name={DiaryRouteNames.FIRSTDIARY}
                    component={FirstDiaryPage}
                />
            )}
            <Screen name={DiaryRouteNames.DIARYTAB} component={Diary} />
            <Screen
                name={DiaryRouteNames.DIARYDETAILS}
                component={DiaryDetails}
            />
        </Navigator>
    );
};

export default DiaryStackNavigator;
