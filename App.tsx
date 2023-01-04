import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { Fragment, useEffect } from 'react';
import { Linking } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { checkNetworkService } from 'src/api/networkCheck';
import MessageModal from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import {
    BottomRouteNames,
    CommunityRouteNames,
    HomeRouteNames,
    RootStackName,
    WellnessRouteNames,
} from 'src/constants/routeName';
import { useAppDispatch, useAppSelector } from 'src/hooks/reducer';
import useAppState from 'src/hooks/useAppState';
import { isNetworkConnected } from 'src/redux/reducer/networkReducer';
import {
    updateNotificationBadge,
    updateShouldReload,
    updateUser,
} from 'src/redux/reducer/userReducer';
import RemoteConfig from 'src/routes/RemoteConfig';
import RootStackNavigator from 'src/routes/RootStackNavigator';
import NoInternetConnectivity from 'src/screens/noInternetConnectivity/NoInternetConnectivity';
import { dateConvertor } from 'src/utils/dateConvertToTimezone';
import { isReadyRef, navigate, navigationRef } from 'src/utils/navigationRef';

const oneSignalAppId = 'db976a1c-cda0-46bc-8543-79c1c87519af';

const App = () => {
    const isNetConnected = useAppSelector(
        (state) => state.networkReducer.isNetConnected
    );

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const { user, token } = useAppSelector((state) => state?.userReducer);

    const { appState } = useAppState();

    useEffect(() => {
        checkNetworkConnection();
        //OneSignal Init Code
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId(oneSignalAppId);

        //END OneSignal Init Code

        //Method for handling notifications received while app in foreground
        OneSignal.setNotificationWillShowInForegroundHandler(
            (notificationReceivedEvent) => {
                if (token && !__DEV__) {
                    let notification: any =
                        notificationReceivedEvent.getNotification();
                    const type = notification?.additionalData?.type;
                    const notificationId =
                        notification?.additionalData?.notification_id;
                    if (type !== 'chat' && notificationId) {
                        const temp = user;
                        temp.unread_notification =
                            notification?.additionalData?.unread;
                        temp?.id && appDispatch(updateUser({ ...temp }));
                    }
                    // Complete with null means don't show a notification.
                    notificationReceivedEvent.complete(notification);
                    dispatch(updateNotificationBadge(true));
                }

                // }
            }
        );

        //Method for handling notifications opened
        OneSignal.setNotificationOpenedHandler((notification: any) => {
            if (token) {
                if (appState === 'active') {
                    appDispatch(updateShouldReload(false));
                }
                const type = notification?.notification?.additionalData?.type;
                console.log(
                    'notification',
                    JSON.stringify(
                        notification?.notification?.additionalData,
                        null,
                        2
                    )
                );

                const notificationId =
                    notification?.notification?.additionalData?.notification_id;

                if (type !== 'chat' && notificationId) {
                    dispatch({
                        type: 'MARK_READ_NOTIFICATION',
                        payload: {
                            data: {
                                id: notificationId,
                            },
                        },
                    });
                    dispatch(updateNotificationBadge(true));
                }

                if (type === 'mood') {
                    setTimeout(() => {
                        navigate(RootStackName.BOTTOMTAB, {
                            screen: BottomRouteNames.HOMESTACK,
                            params: {
                                screen: HomeRouteNames.CHECKIN,
                            },
                        });
                    }, 500);
                } else if (
                    type === 'connection_request' ||
                    type === 'connection_accept'
                ) {
                    const id = notification?.notification?.additionalData?.id;
                    Linking.openURL(`secretpotion://otherProfile/${id}`);
                    // dispatch(CommonActions.navigate({ name: HomeRouteNames?.CHECKIN }));
                    // navigate();
                } else if (type === 'post') {
                    const id = notification?.notification?.additionalData?.id;
                    const name =
                        notification?.notification?.additionalData
                            ?.community_name;
                    Linking.openURL(
                        `secretpotion://post_page/${id}/${name}/post`
                    );
                } else if (type === 'reflection') {
                    const id = notification?.notification?.additionalData?.id;

                    Linking.openURL(
                        `secretpotion://post_page/${id}/${' '}/reflection`
                    );
                } else if (type === 'add_reflection') {
                    Linking.openURL(
                        `secretpotion://add_reflection/${dateConvertor(
                            notification?.notification?.additionalData
                                ?.created_at,
                            user?.time_zone
                        )}`
                    );
                } else if (type === 'chat') {
                    const data = notification?.notification?.additionalData;

                    let url = `${data.image}`.split('/');

                    const pId = data?.playerId;
                    Linking.openURL(
                        `secretpotion://chat/${false}/${data?.name}/${url}/${
                            data?.channelId
                        }/${data?.myId}/${data?.myDbId}/${data?.otherUserID}/${
                            data?.otherUserDbID
                        }/${pId}/${true}`
                    );
                } else if (type === 'wellness') {
                    const graph =
                        notification?.notification?.additionalData?.graph;
                    const date =
                        notification?.notification?.additionalData?.created_at;
                    let page = graph ? 1 : 1;
                    Linking.openURL(
                        `secretpotion://progress/${page}/${dateConvertor(
                            date,
                            user?.time_zone
                        )}`
                    );
                }
            }
        });
    }, []);

    useEffect(() => {
        checkNetworkConnection();
        return () => {
            isReadyRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dispatch1 = useDispatch();

    const checkNetworkConnection = async () => {
        try {
            await checkNetworkService();
            dispatch1(isNetworkConnected(true));
        } catch (err) {}
    };
    return (
        <Fragment>
            <MessageModal>
                <NavigationContainer
                    ref={navigationRef}
                    linking={{
                        prefixes: ['secretpotion://'],

                        config: {
                            initialRouteName: RootStackName.BOTTOMTAB,
                            screens: {
                                [RootStackName.BOTTOMTAB]: {
                                    screens: {
                                        [BottomRouteNames.HOMESTACK]: {
                                            screen: {
                                                [HomeRouteNames.CHECKIN]:
                                                    'checkin',
                                            },
                                        },
                                        [BottomRouteNames.HOMESTACK]: {
                                            screens: {
                                                [HomeRouteNames.REFLECTION]:
                                                    'add_reflection/:date?',
                                            },
                                        },
                                        [BottomRouteNames.WELNESSSTACK]: {
                                            screens: {
                                                [WellnessRouteNames.PROGRESS]:
                                                    'progress/:init?/:date?',
                                            },
                                        },
                                    },
                                },
                                [RootStackName.OTHER_PROFILE]:
                                    'otherProfile/:id',
                                [CommunityRouteNames.NOTIFICATION_POST_PAGE]:
                                    'post_page/:id/:name/:type',
                                NotFound: '*',
                                [RootStackName.CHAT_SCREEN]:
                                    'chat/:is_newChat?/:name?/:image?/:channelId?/:myId?/:myDbId?/:otherUserID?/:otherUserDbID?/:playerId?/:changeImage',
                            },
                        },
                        subscribe(listener) {
                            const onReceiveURL = ({ url }: { url: string }) => {
                                // if (token?.length > 0 && url === 'secretpotion://bottomtab')
                                //   return;
                                listener(url);
                            };

                            const unsubscribe = Linking.addEventListener(
                                'url',
                                onReceiveURL
                            );

                            return () => {
                                unsubscribe.remove();
                            };
                        },
                    }}
                    theme={{
                        ...DefaultTheme,
                        colors: {
                            ...DefaultTheme.colors,
                            background: colors.defaultWhite,
                            text: colors.defaultWhite,
                        },
                    }}
                >
                    <RootStackNavigator />
                    <RemoteConfig />
                </NavigationContainer>

                {!isNetConnected && <NoInternetConnectivity />}
            </MessageModal>
        </Fragment>
    );
};

export default App;
