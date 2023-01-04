import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { updateDeviceForOnesignal } from 'src/api/otherService';
import CommunityIcon from 'src/assets/svg/community.svg';
import DiaryIcon from 'src/assets/svg/diary.svg';
import HomeIcon from 'src/assets/svg/home.svg';
import MoreIcon from 'src/assets/svg/more.svg';
import NotificationBadge from 'src/assets/svg/notificationBadge.svg';
import WellnessIcon from 'src/assets/svg/wellness.svg';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { globalStyle } from 'src/constants/global.style';
import { BottomRouteNames } from 'src/constants/routeName';
import { useAppDispatch, useAppSelector1 } from 'src/hooks/reducer';
import CommunityStackNavigator from './CommunityStackNavigator';
import DiaryStackNavigator from './DiaryStackNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import MoreStackNavigator from './MoreStackNavigator';
import WellnessNavigator from './WellnessNavigator';

const Tab = createBottomTabNavigator();

const BottomStackNavigator = () => {
    const { Navigator, Screen } = Tab;

    const {
        communityReducer: { postCount },
    } = useAppSelector1();

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        dispatch({ type: 'GET_NOTIFICATION_SETTINGS' });
        dispatch({ type: 'NOTIFICATION_LIST' });
        dispatch({ type: 'WELLNESS_TYPE' });
        dispatch({ type: 'GET_COMMUNITY_COUNT' });
    };

    const getOneSignalPlayerId = async () => {
        try {
            let res = await OneSignal.getDeviceState();
            const data = {
                player_id: res?.userId,
                device_token: res?.pushToken,
                device_type: Platform.OS,
            };
            const oneSignalRes = updateDeviceForOnesignal(data);
        } catch (err) {
            console.error('one signal player id err', err);
        }
    };

    useEffect(() => {
        if (Platform.OS === 'ios') {
            //Prompt for push on iOS
            OneSignal.promptForPushNotificationsWithUserResponse(
                (response) => {}
            );
        }
        getOneSignalPlayerId();
    }, []);

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: [styles.bottomTab, null],
            }}
        >
            <Screen
                options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <>
                            <HomeIcon
                                fill={
                                    focused
                                        ? colors.AquamarineBlue
                                        : colors.regentBlue
                                }
                            />
                        </>
                    ),
                }}
                name={BottomRouteNames.HOMESTACK}
                component={HomeStackNavigator}
            />
            <Screen
                options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <WellnessIcon
                            fill={
                                focused ? colors.Carnation : colors.regentBlue
                            }
                        />
                    ),
                }}
                name={BottomRouteNames.WELNESSSTACK}
                component={WellnessNavigator}
            />
            <Screen
                options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <>
                            {postCount ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: Platform.select({
                                            android: 15,
                                            ios: 20,
                                        }),
                                        top: Platform.select({
                                            android: 10,
                                            ios: 0,
                                        }),
                                        zIndex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <NotificationBadge
                                        height={20}
                                        width={20}
                                        style={{ position: 'absolute' }}
                                    />
                                    <Text
                                        style={{
                                            fontSize:
                                                postCount > 999
                                                    ? 6
                                                    : postCount > 99
                                                    ? 8
                                                    : 10,
                                            color: colors.defaultWhite,
                                        }}
                                    >
                                        {postCount}
                                    </Text>
                                </View>
                            ) : null}
                            <CommunityIcon
                                fill={
                                    focused
                                        ? colors.PuertoRico
                                        : colors.regentBlue
                                }
                            />
                        </>
                    ),
                }}
                name={BottomRouteNames.COMMUNITY_STACK}
                component={CommunityStackNavigator}
            />
            <Screen
                options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <DiaryIcon
                            fill={
                                focused ? colors.Candlelight : colors.regentBlue
                            }
                        />
                    ),
                }}
                name={BottomRouteNames.DIARYSTACK}
                component={DiaryStackNavigator}
            />
            <Screen
                options={{
                    tabBarIcon: ({ focused }: { focused: boolean }) => (
                        <MoreIcon
                            style={{ marginLeft: -20 }}
                            fill={focused ? colors.Illusion : colors.regentBlue}
                        />
                    ),
                }}
                name={BottomRouteNames.MORESTACK}
                component={MoreStackNavigator}
            />
        </Navigator>
    );
};

export default BottomStackNavigator;

const styles = StyleSheet.create({
    bottomTab: {
        height: SCREEN_HEIGHT * 0.09,
        ...globalStyle.topRadius,
        position: 'absolute',
    },
});
