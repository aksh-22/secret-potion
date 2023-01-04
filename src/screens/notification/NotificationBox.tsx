import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import NotificationBadge from 'src/assets/svg/notificationBadge.svg';
import colors from 'src/constants/colors';
import {
    BottomRouteNames,
    CommunityRouteNames,
    HomeRouteNames,
    RootStackName,
} from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { dateConvertor } from 'src/utils/dateConvertToTimezone';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { NType } from 'typings/notificationListType';
import { userProfileType } from 'typings/user';
import styles from './Notification.style';

type Props = {
    item: NType;
    index?: number;
};

const NotificationBox = ({ item, index }: Props) => {
    const dispatch = useDispatch();

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    const [isRead, setIsRead] = useState<boolean>();

    const [modifiedDate, setModifiedDate] = useState<any>();

    useEffect(() => {
        if (user) {
            const convertedTime = dateConvertor(
                item?.created_at,
                user?.time_zone
            );
            setModifiedDate(convertedTime);
            setIsRead(item?.is_read);
        }
    }, [item]);

    const { navigate, replace, canGoBack, goBack, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                {
                    backgroundColor: isRead ? '#fffcfc88' : colors.defaultWhite,
                },
            ]}
            onPress={() => {
                if (!isRead) {
                    setIsRead(true);
                    dispatch({
                        type: 'MARK_READ_NOTIFICATION',
                        payload: {
                            data: {
                                id: item?.notification_id,
                                type: 'single',
                            },
                            callback: () => {
                                setIsRead(true);
                            },
                            errorCallBack: () => {
                                setIsRead(false);
                            },
                        },
                    });
                }
                if (item?.type === 'post') {
                    // Linking.openURL(
                    //     `secretpotion://post_page/${item?.id}/${item?.community_name}/post`
                    // );
                    navigate(CommunityRouteNames.NOTIFICATION_POST_PAGE, {
                        name: item?.community_name,
                        id: item?.id,
                        type: 'post',
                    });
                } else if (item?.type === 'reflection') {
                    Linking.openURL(
                        `secretpotion://post_page/${item?.id}/${' '}/reflection`
                    );
                } else if (item?.type === 'mood') {
                    // Linking.openURL('secretpotion://checkin');
                    navigate(RootStackName.BOTTOMTAB, {
                        screen: BottomRouteNames.HOMESTACK,
                        params: {
                            screen: HomeRouteNames.CHECKIN,
                        },
                    });
                } else if (
                    item?.type === 'connection_request' ||
                    item?.type === 'connection_accept'
                ) {
                    Linking.openURL(`secretpotion://otherProfile/${item?.id}`);
                } else if (item?.type === 'add_reflection') {
                    Linking.openURL(
                        `secretpotion://add_reflection/${dateFormatForServer(
                            item?.created_at
                        )}`
                    );
                } else if (item?.type === 'wellness') {
                    const graph = item?.graph;
                    const date = item?.created_at;
                    let page = graph ? 1 : 1;
                    Linking.openURL(
                        `secretpotion://progress/${page}/${dateFormatForServer(
                            date
                        )}`
                    );
                }
            }}
        >
            <View style={styles.containerTop}>
                <Text style={styles.heading}>{item?.heading}</Text>
                <Text style={[styles.heading, { opacity: 0.5 }]}>
                    {moment(modifiedDate).calendar(null, {
                        lastDay: '[Yesterday]',
                        sameDay: 'hh:mm A',
                        nextDay: '[Tomorrow]',
                        lastWeek: 'dddd',
                        nextWeek: 'dddd',
                        sameElse: 'DD MMM yyyy',
                    })}
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    style={[
                        styles.heading,
                        { opacity: 0.5, marginTop: 5, flex: 0.99 },
                    ]}
                >
                    {item?.content}
                </Text>
                {!isRead && <NotificationBadge height={10} width={10} />}
            </View>
        </TouchableOpacity>
    );
};

export default NotificationBox;
