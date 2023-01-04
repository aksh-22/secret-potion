import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ChatBadge from 'src/assets/svg/chatBadge.svg';
import ImageComponent from 'src/components/imageComponent/ImageComponent';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { RootStackName } from 'src/constants/routeName';
import { auth, db } from 'src/firebase';
import { useAppSelector } from 'src/hooks/reducer';
import styles from './ChatMenu.style';

type Props = {};

const ChatCard = ({ item }) => {
    if (!item?.channelId) {
        return null;
    }

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    const user_db_id = useAppSelector((state) => state?.userReducer?.user?.id);

    const [userData, setUserData] = useState<any>();
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const otherUserId = item?.members?.filter((el) => el !== user_id);

    let count = item?.unseen[auth?.currentUser?.uid]?.count;
    const a = useEffect(() => {
        let userDetails = db
            .ref(
                `${__DEV__ ? '/Local' : '/Production'}/Users/${otherUserId[0]}`
            )
            .on('value', (snapshot) => {
                const usr = snapshot.val();
                setUserData(usr);
            });

        return () => db.ref(`/users/${otherUserId[0]}`).off();
    }, [item]);

    return (
        // <></>
        <TouchableOpacity
            onPress={() => {
                navigate(RootStackName.CHAT_SCREEN, {
                    is_newChat: false,
                    name: userData?.name,
                    image: userData?.image,
                    channelId: item?.channelId,
                    myId: user_id,
                    myDbId: user_db_id,
                    otherUserID: otherUserId[0],
                    playerId: userData?.playerId,
                    // is_newChat: true,
                    // name: item?.user_info?.name,
                    // image: item?.user_info?.profile_image,
                });
            }}
            style={{
                backgroundColor: colors.defaultWhite,
                marginHorizontal: 20,
                marginVertical: 10,
                borderRadius: 10,
            }}
        >
            <View>
                <View style={styles.card}>
                    <View style={styles.centerContainer}>
                        <View>
                            <ImageComponent
                                uri={userData?.image}
                                style={styles.image}
                            />
                            {/* {userData?.online && (
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: colors.green,
                    },
                  ]}
                />
              )} */}
                        </View>
                        <View
                            style={{
                                flex: 1,

                                paddingLeft: 16,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text numberOfLines={1} style={styles.username}>
                                    {userData?.name}
                                </Text>
                            </View>

                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.chatDescription,
                                    {
                                        fontFamily:
                                            count > 0
                                                ? fonts.regular
                                                : fonts.regular,
                                        opacity: count > 0 ? 1 : 0.6,
                                    },
                                ]}
                            >
                                {item?.lastMessage}
                            </Text>
                        </View>
                        <View
                            style={{
                                paddingStart: 10,
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fonts.regular,
                                    fontSize: 12,
                                    color: colors.lightBlack,
                                }}
                            >
                                {moment.unix(item?.createdAt).calendar(null, {
                                    lastDay: '[Yesterday]',
                                    sameDay: 'HH:mm',
                                    nextDay: '[Tomorrow]',
                                    lastWeek: ' dddd',
                                    nextWeek: 'dddd',
                                    sameElse: 'L',
                                })}
                            </Text>
                            {count > 0 ? (
                                <View
                                    // useAngle
                                    // angle={95}
                                    // angleCenter={{ x: 0.5, y: 0.5 }}
                                    // colors={[
                                    //   '#66FFFB',
                                    //   '#26B3FF',
                                    //   '#FF4F5C',
                                    //   '#FFA4AA',
                                    // ].reverse()}
                                    // // start={{ x: 0.0, y: 0.25 }}
                                    // // end={{ x: 0.5, y: 1.0 }}
                                    // locations={[6.77, 63.33, 200.94, 98.1].reverse()}
                                    style={{
                                        // backgroundColor: colors.red,
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 22,
                                        width: 22,
                                        marginTop: 5,
                                    }}
                                >
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                        }}
                                    >
                                        <ChatBadge height={22} width={22} />
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: colors.defaultWhite,
                                            fontFamily: fonts.regular,
                                        }}
                                    >
                                        {count}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ChatCard;
