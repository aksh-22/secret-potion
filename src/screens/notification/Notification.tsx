import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList, RefreshControl, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import PressableText from 'src/components/PressableText';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { updateNotificationBadge } from 'src/redux/reducer/userReducer';
import { NType } from 'typings/notificationListType';

import NotificationBox from './NotificationBox';

type Props = {};

const Notification = (props: Props) => {
    const notificationList = useAppSelector(
        (state) => state?.postReducer?.notificationList
    );

    const [page, setPage] = useState(1);
    const [shouldNext, setShouldNext] = useState(true);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isReadLoading, setIsReadLoading] = useState(false);

    const dispatch = useDispatch();

    const { navigate, replace, canGoBack, goBack, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        getData(1);
    }, []);

    React.useEffect(() => {
        const unsubscribe = addListener('focus', () => {
            // do something
            dispatch(updateNotificationBadge(false));
        });

        return unsubscribe;
    }, [addListener]);

    useEffect(() => {
        const backAction = () => {
            if (canGoBack()) {
                goBack();
            } else {
                replace(RootStackName.BOTTOMTAB);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const getData = (page) => {
        setIsLoading(true);
        dispatch({
            type: 'NOTIFICATION_LIST',
            payload: {
                page,
                callback: (next) => {
                    !next && setShouldNext(false);
                    setRefreshLoading(false);
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setRefreshLoading(false);
                    setIsLoading(false);
                },
            },
        });
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getData(1);
        setPage(1);
        setShouldNext(true);
    };

    const onEndReached = () => {
        if (shouldNext && !isLoading) {
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const markAllAsRead = () => {
        setIsReadLoading(true);
        dispatch({
            type: 'MARK_READ_NOTIFICATION',
            payload: {
                data: {
                    type: 'all',
                },
                callback: () => {
                    setIsReadLoading(false);
                    onRefresh();
                },
                errorCallBack: () => {
                    setIsReadLoading(false);
                },
            },
        });
    };

    const renderItem = ({ item, index }: { item: NType; index: number }) => {
        return <NotificationBox index={index} item={item} />;
    };

    return (
        <ContainerTabWithoutScroll
            isBack
            message={false}
            bell={false}
            headerHeading='Notification'
            statusBarColor={colors.background}
            headerStyle={{ backgroundColor: colors.background }}
            backBtnPress={() => {
                if (!canGoBack()) {
                    replace(RootStackName.BOTTOMTAB);
                } else {
                    goBack();
                }
            }}
        >
            <PressableText
                wrapperStyle={{
                    padding: 10,
                    alignSelf: 'flex-end',
                    paddingHorizontal: 30,
                }}
                isLoading={isReadLoading}
                textStyle={{ color: colors.blueTextColor }}
                onTextPress={markAllAsRead}
            >
                Mark all as read
            </PressableText>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 20,
                    paddingBottom: 50,
                }}
                keyExtractor={(item: any, index) => item.notification_id}
                renderItem={renderItem}
                data={notificationList}
                onEndReached={onEndReached}
                ListEmptyComponent={
                    isLoading ? (
                        <PostShimmer
                            style={{ height: 50, marginTop: 10, width: '100%' }}
                            count={10}
                        />
                    ) : (
                        <EmptyPlaceholder text='No notification found' />
                    )
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshLoading}
                        onRefresh={onRefresh}
                        tintColor={colors.regentBlue}
                        colors={[colors.regentBlue, colors.red]}
                        title='Pull to refresh'
                        titleColor={colors.regentBlue}
                    />
                }
                ListFooterComponent={
                    isLoading && (
                        <PostShimmer
                            style={{ height: 50, marginTop: 10, width: '100%' }}
                            count={10}
                        />
                    )
                }
            />
        </ContainerTabWithoutScroll>
    );
};

export default Notification;
