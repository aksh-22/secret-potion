import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import colors from 'src/constants/colors';
import { CommunityRouteNames } from 'src/constants/routeName';
import { useAppSelector1 } from 'src/hooks/reducer';
import CommingSoon from 'src/screens/community/CommingSoon';
import Community from 'src/screens/community/Community';
import CommunityMessage from 'src/screens/community/CommunityMessage';
import CommunityPage from 'src/screens/community/CommunityPage';
import PostPage from 'src/screens/community/PostPage';
import Report from 'src/screens/community/Report';
import WritePost from 'src/screens/community/WritePost';
import NotificationPostPage from 'src/screens/notificationScreens/NotificationPostPage';
import { CommunityStackParamList } from './types/navigation';

const Stack = createStackNavigator<CommunityStackParamList>();

const CommunityStackNavigator = ({ navigation }) => {
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
            {/* <Screen name={CommunityRouteNames.COMMUNITY} component={CommingSoon} /> */}
            {!user?.guide_line && (
                <Screen
                    name={CommunityRouteNames.COMMUNITY_Message}
                    component={CommunityMessage}
                />
            )}
            <Screen
                name={CommunityRouteNames.COMMUNITY}
                component={Community}
            />
            <Screen
                name={CommunityRouteNames.COMMUNITY_PAGE}
                component={CommunityPage}
            />

            <Screen
                name={CommunityRouteNames.REPORT_ABUSIVE}
                component={Report}
                options={{
                    ...TransitionPresets.ScaleFromCenterAndroid,
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                }}
            />
            <Screen name={CommunityRouteNames.POST_PAGE} component={PostPage} />
            {/* <Screen
        name={CommunityRouteNames.NOTIFICATION_POST_PAGE}
        component={NotificationPostPage}
      /> */}
        </Navigator>
    );
};

export default CommunityStackNavigator;
