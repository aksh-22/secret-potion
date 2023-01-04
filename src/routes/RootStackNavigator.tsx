import crashlytics from '@react-native-firebase/crashlytics';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import AppUpdateBox from 'src/components/AppUpdateBox';
import {
    CommunityRouteNames,
    RootStackName,
    WellnessRouteNames,
} from 'src/constants/routeName';
import { useAppSelector1 } from 'src/hooks/reducer';
import Intro from 'src/screens/auth/intro/Intro';
import Welcome from 'src/screens/auth/welcome/Welcome';
import ChatMenu from 'src/screens/chat/ChatMenu';
import ChatScreen from 'src/screens/chat/ChatScreen';
import CheckToken from 'src/screens/CheckToken';
import WritePost from 'src/screens/community/WritePost';
import About from 'src/screens/more/about/About';
import FAQ from 'src/screens/more/faq/FAQ';
import HelpAndSupport from 'src/screens/more/helpAndSupport/HelpAndSupport';
import Invite from 'src/screens/more/invite/Invite';
import Library from 'src/screens/more/library/Library';
import LibraryDetails from 'src/screens/more/library/LibraryDetails';
import EditProfile from 'src/screens/more/profile/EditProfile';
import OtherProfile from 'src/screens/more/profile/OtherProfile';
import Profile from 'src/screens/more/profile/Profile';
import ReportUser from 'src/screens/more/profile/ReportUser';
import PasswordSettings from 'src/screens/more/settings/PasswordSettings';
import Notification from 'src/screens/notification/Notification';
import NotificationPostPage from 'src/screens/notificationScreens/NotificationPostPage';
import Splash from 'src/screens/splash/Splash';
import WellnessQuestion from 'src/screens/wellness/WellnessQuestion';
import WellnessQuestionUpdate from 'src/screens/wellness/WellnessQuestionUpdate';
import AuthStackNavigator from './AuthStackNavigator';
import BottomStackNavigator from './BottomStackNavigator';
import QuestionStackNavigator from './QuestionStackNavigator';
import { RootStackParamList } from './types/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
    const { Navigator, Screen } = RootStack;

    const [init, setInit] = useState(true);

    const {
        userReducer: { token, user, checkToken },
        appReducer: { initialAppLaunch, remoteConfigData },
    } = useAppSelector1();
    const currentAppVersion = remoteConfigData?.currentAppVersion;

    const latestAppVersion = remoteConfigData?.build_version;

    const showUpdate =
        parseInt(latestAppVersion?.split('.')?.join('')) >
        parseInt(currentAppVersion?.split('.')?.join(''));

    useEffect(() => {
        if (Platform.OS === 'ios') {
            OneSignal.promptForPushNotificationsWithUserResponse((response) => {
                console.log('Prompt response:', response);
            });
        }
    }, []);

    useEffect(() => {
        const id = user?.id + '';
        Promise.all([
            crashlytics().setUserId('1'),
            crashlytics().setAttributes({
                name: user?.fname,
                email: user?.email,
                username: user?.user_name,
                id,
            }),
        ]);
    }, []);

    return (
        <>
            {(showUpdate || remoteConfigData?.is_maintenance) && (
                <AppUpdateBox remoteConfigData={remoteConfigData} />
            )}
            <Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {init && (
                    <Screen name={RootStackName.SPLASH}>
                        {(props) => (
                            <Splash
                                {...props}
                                onAnimationFinish={() => {
                                    setInit(false);
                                }}
                            />
                        )}
                    </Screen>
                )}
                {checkToken ? (
                    <Screen
                        name={RootStackName.CHECK_TOKEN}
                        component={CheckToken}
                    />
                ) : !token ? (
                    <>
                        {initialAppLaunch ? (
                            <Screen
                                name={RootStackName.INTRO}
                                component={Intro}
                            />
                        ) : null}
                        <Screen
                            name={RootStackName.AUTH}
                            component={AuthStackNavigator}
                        />
                    </>
                ) : (
                    <>
                        {!user?.onboarding_question ? (
                            <>
                                <Screen
                                    name={RootStackName.WELCOME}
                                    component={Welcome}
                                />
                                <Screen
                                    name={RootStackName.QUESTIONSSTACK}
                                    component={QuestionStackNavigator}
                                />
                            </>
                        ) : (
                            <>
                                <Screen
                                    name={RootStackName.BOTTOMTAB}
                                    component={BottomStackNavigator}
                                />
                                <Screen
                                    name={
                                        RootStackName.WELLNESS_QUESTION_UPDATE
                                    }
                                    component={WellnessQuestionUpdate}
                                />
                                <Screen
                                    name={RootStackName.PASSWORD}
                                    component={PasswordSettings}
                                />
                                <Screen
                                    name={RootStackName.INVITE}
                                    component={Invite}
                                />
                                <Screen
                                    name={RootStackName.HELP_AND_SUPPORT}
                                    component={HelpAndSupport}
                                />
                                <Screen
                                    name={RootStackName.LIBRARY}
                                    component={Library}
                                />
                                <Screen
                                    name={RootStackName.LIBRARY_DETAILS}
                                    component={LibraryDetails}
                                />
                                <Screen
                                    name={RootStackName.ABOUT}
                                    component={About}
                                />
                                <Screen
                                    name={RootStackName.FAQ}
                                    component={FAQ}
                                />
                                <Screen
                                    name={RootStackName.PROFILE}
                                    component={Profile}
                                />
                                <Screen
                                    name={RootStackName.OTHER_PROFILE}
                                    component={OtherProfile}
                                />
                                <Screen
                                    name={RootStackName.REPORT_USER}
                                    component={ReportUser}
                                />
                                <Screen
                                    name={RootStackName.EDIT_PROFILE}
                                    component={EditProfile}
                                />
                                <Screen
                                    name={WellnessRouteNames.WELLNESS_QUESTION}
                                    component={WellnessQuestion}
                                />
                                <Screen
                                    name={CommunityRouteNames.WRITE_POST}
                                    component={WritePost}
                                />
                                <Screen
                                    name={RootStackName.CHAT_MENU}
                                    component={ChatMenu}
                                />
                                <Screen
                                    name={RootStackName.CHAT_SCREEN}
                                    component={ChatScreen}
                                />
                                <Screen
                                    name={RootStackName.NOTIFICATION}
                                    component={Notification}
                                />
                                <Screen
                                    name={
                                        CommunityRouteNames.NOTIFICATION_POST_PAGE
                                    }
                                    component={NotificationPostPage}
                                />
                            </>
                        )}
                    </>
                )}
            </Navigator>
        </>
    );
};

export default RootStackNavigator;

// question saga || wellness || wellness question update || range slider
