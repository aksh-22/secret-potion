import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import Comment from 'src/assets/svg/comment.svg';
import ConnectIcon from 'src/assets/svg/connect.svg';
import Love from 'src/assets/svg/love.svg';
import MoreIcon from 'src/assets/svg/moreVertical.svg';
import ReceiveRequest from 'src/assets/svg/receiveRequest.svg';
import Report from 'src/assets/svg/report.svg';
import PendingIcon from 'src/assets/svg/requestPending.svg';
import SentIcon from 'src/assets/svg/sendRequest.svg';
import Starred from 'src/assets/svg/starred.svg';
import Support from 'src/assets/svg/supportIcon.svg';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import { CommunityRouteNames, RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { dateFormatter } from 'src/utils/dateFormatter';
import firebaseRoomId from 'src/utils/firebaseRoomId';
import numberFormatter from 'src/utils/numberFormatter';
import styles from './Community.style';

type Props = {
    onPress?: () => void;
    item?: postType;
    index?: number;
    onCommentPress?: () => void;
    onMorePress?: (data?: any) => void;
    showDots?: boolean;
    showReport?: boolean;
    apiType?: string;
    numberOfLines?: number;
    shouldUpdateComponent?: boolean;
};

// Carnation
// downy
// comment
// starred

const PostComponent = ({
    onPress,
    item: data,
    index,
    onCommentPress,
    onMorePress,
    showDots = true,
    showReport = true,
    numberOfLines,
    apiType,
    shouldUpdateComponent,
}: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
    const [likeLoading, setLikeLoading] = useState(false);
    const [supportLoading, setSupportLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);
    const [item, setItem] = useState<postType>(data);
    const [showMore, setShowMore] = useState(false);
    const [loadMore, setLoadMore] = useState(false);

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    useEffect(() => {
        setItem(data);
    }, [data]);

    const dispatch = useDispatch();

    const onTextLayout = useCallback((e) => {
        setShowMore(e.nativeEvent.lines.length > numberOfLines);
    }, []);

    const onLikePress = () => {
        setLikeLoading(true);
        let temp = { ...item };
        if (temp.is_like) {
            temp.total_likes = temp.total_likes - 1;
            temp.is_like = false;
        } else {
            temp.total_likes = temp.total_likes + 1;
            temp.is_like = true;
        }
        setItem(temp);
        dispatch({
            type: 'LIKE_POSTS',
            payload: {
                data: {
                    id: item?.id,
                    type: 'post',
                },
                apiType,
                index: index,
                callback: (data) => {
                    shouldUpdateComponent && setItem(data?.post);
                    setLikeLoading(false);
                },
                errorCallback: () => {
                    setLikeLoading(false);
                },
            },
        });
    };

    const onSupportPress = () => {
        setSupportLoading(true);
        let temp = { ...item };
        if (temp.is_support) {
            temp.total_support = temp.total_support - 1;
            temp.is_support = false;
        } else {
            temp.total_support = temp.total_support + 1;
            temp.is_support = true;
        }
        setItem(temp);
        dispatch({
            type: 'SUPPORT_POSTS',
            payload: {
                index: index,
                apiType,
                data: {
                    post_id: item?.id,
                },
                callback: (data) => {
                    setSupportLoading(false);
                    shouldUpdateComponent && setItem(data);
                },
                errorCallback: () => {
                    setSupportLoading(false);
                },
            },
        });
    };

    const onSavePress = () => {
        setSaveLoading(true);
        let temp = { ...item };
        if (temp.is_save) {
            temp.total_save = temp.total_save - 1;
            temp.is_save = false;
        } else {
            temp.total_save = temp.total_save + 1;
            temp.is_save = true;
        }
        setItem(temp);

        dispatch({
            type: 'SAVE_POSTS',
            payload: {
                index: index,
                apiType,
                data: {
                    post_id: item?.id,
                    community_type_id: item?.community_id,
                },
                callback: (data) => {
                    setSaveLoading(false);
                    shouldUpdateComponent && setItem(data);
                },
                errorCallback: () => {
                    setSaveLoading(false);
                },
            },
        });
    };

    const onFriendIconPress = () => {
        // is friend
        // send req
        // receive req
        setRequestLoading(true);
        if (item?.send_req) {
            requestCancel();
        } else if (item?.receive_req) {
            requestAccept();
        } else if (!item?.is_friend) {
            requestSent();
        }
    };

    const requestAccept = () => {
        dispatch({
            type: 'ACCEPT_REQUEST',
            payload: {
                index,
                apiType,
                shouldUpdateStorage: true,
                data: {
                    id: item?.user?.id,
                    post_id: item?.id,
                    channel_id: firebaseRoomId(
                        user_id,
                        item?.user?.firebase_id
                    ),
                    type: 'community',
                },
                callback: (data) => {
                    shouldUpdateComponent && setItem(data?.post);
                    setRequestLoading(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request accepted successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    const requestSent = () => {
        dispatch({
            type: 'SEND_REQUEST',
            payload: {
                index,
                apiType,
                shouldUpdateStorage: true,
                data: {
                    id: item?.user?.id,
                    post_id: item?.id,
                    type: 'community',
                },
                callback: (data) => {
                    shouldUpdateComponent && setItem(data?.post);
                    setRequestLoading(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request sent successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    const requestCancel = () => {
        dispatch({
            type: 'CANCEL_REQUEST',
            payload: {
                index,
                apiType,
                shouldUpdateStorage: true,
                data: {
                    id: item?.user?.id,
                    post_id: item?.id,
                    type: 'community',
                },
                callback: (data) => {
                    shouldUpdateComponent && setItem(data?.post);
                    setRequestLoading(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request cancelled successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    return (
        <View style={{ ...globalStyle.shadow }}>
            <LinearGradient
                colors={[colors.downy, colors.mintTulip]}
                style={{
                    borderRadius: 10,
                    ...globalStyle.shadow,
                    // overflow: 'hidden',
                    marginTop: 20,
                    marginHorizontal: 30,
                }}
            >
                <Pressable onPress={onPress} style={styles.postWrapper}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Pressable
                            onPress={
                                () =>
                                    !item?.is_self &&
                                    navigate(RootStackName.OTHER_PROFILE, {
                                        id: item?.user?.id,
                                        index,
                                        post_id: item?.id,
                                        type: 'community',
                                    })
                                // : navigate(RootStackName.PROFILE)
                            }
                        >
                            <Image
                                resizeMode='cover'
                                source={{ uri: item?.user?.profile_image }}
                                style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 15,
                                }}
                            />
                        </Pressable>
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text numberOfLines={1} style={styles.postHeading}>
                                {item?.user?.user_name}
                            </Text>
                            <Text style={styles.postHeading2}>
                                Posted on {dateFormatter(item?.created_at)}
                            </Text>
                        </View>
                        <View
                            style={{
                                alignSelf: 'flex-start',
                                flexDirection: 'row',
                                alignItems: 'center',
                                // marginLeft: 10,
                            }}
                        >
                            {!item?.is_self ? (
                                requestLoading ? (
                                    <ActivityIndicator
                                        color={colors.regentBlue}
                                    />
                                ) : (
                                    <Pressable
                                        hitSlop={10}
                                        disabled={item?.is_friend}
                                        onPress={onFriendIconPress}
                                    >
                                        {item?.is_friend ? (
                                            <ConnectIcon
                                                height={18}
                                                width={18}
                                            />
                                        ) : item?.send_req ? (
                                            <PendingIcon
                                                height={18}
                                                width={18}
                                            />
                                        ) : item?.receive_req ? (
                                            <ReceiveRequest
                                                height={18}
                                                width={18}
                                            />
                                        ) : (
                                            <SentIcon height={18} width={18} />
                                        )}
                                    </Pressable>
                                )
                            ) : null}
                            {showDots
                                ? item?.is_self && (
                                      <Pressable
                                          hitSlop={10}
                                          onPress={onMorePress}
                                          style={{ marginLeft: 10 }}
                                      >
                                          <MoreIcon height={15} width={15} />
                                      </Pressable>
                                  )
                                : null}
                        </View>
                    </View>
                    <View>
                        <Text
                            numberOfLines={
                                !loadMore ? numberOfLines : undefined
                            }
                            style={[
                                styles.postHeading,
                                { color: colors.lightBlack, marginTop: 10 },
                            ]}
                        >
                            {item?.content}
                        </Text>
                        <Text
                            onTextLayout={onTextLayout}
                            style={[
                                styles.postHeading,
                                {
                                    color: colors.lightBlack,
                                    marginTop: 10,
                                    position: 'absolute',
                                    opacity: 0,
                                },
                            ]}
                        >
                            {item?.content}
                        </Text>
                        {showMore && (
                            <Pressable
                                onPress={() => setLoadMore((prev) => !prev)}
                                style={{ marginTop: 10 }}
                                hitSlop={30}
                            >
                                <Text
                                    style={{
                                        color: colors.regentBlue,
                                        fontFamily: fonts.regular,
                                        fontWeight: '400',
                                    }}
                                >
                                    {!loadMore ? 'Show more' : 'Show less'}
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </Pressable>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}
                >
                    <Pressable
                        hitSlop={10}
                        onPress={onLikePress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 20,
                            width: 30,
                        }}
                        disabled={likeLoading}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Love
                                fill={
                                    item?.is_like
                                        ? colors.Carnation
                                        : colors.downy
                                }
                            />
                            <Text style={styles.postReactionText}>
                                {numberFormatter(item?.total_likes)}
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        hitSlop={10}
                        onPress={onSupportPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 20,
                            width: 30,
                        }}
                        disabled={supportLoading}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Support
                                fill={
                                    item?.is_support
                                        ? colors.badge3
                                        : colors.downy
                                }
                            />
                            <Text style={styles.postReactionText}>
                                {numberFormatter(item?.total_support)}
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={onCommentPress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 20,
                            width: 30,
                        }}
                    >
                        <Comment
                            fill={
                                item?.total_comment > 0
                                    ? colors.comment
                                    : colors.downy
                            }
                        />
                        <Text style={styles.postReactionText}>
                            {numberFormatter(item?.total_comment)}
                        </Text>
                    </Pressable>
                    <Pressable
                        hitSlop={10}
                        onPress={onSavePress}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 20,
                            width: 30,
                        }}
                        disabled={saveLoading}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Starred
                                style={{ marginTop: -3 }}
                                fill={
                                    item?.is_save
                                        ? colors.starred
                                        : colors.downy
                                }
                            />
                            <Text style={styles.postReactionText}>
                                {numberFormatter(item?.total_save)}
                            </Text>
                        </View>
                    </Pressable>
                    {showReport ? (
                        <TouchableOpacity
                            onPress={() => {
                                item?.is_report
                                    ? showMessage({
                                          isVisible: true,
                                          message:
                                              'You have reported this post already!',
                                          type: 'Info',
                                      })
                                    : navigate(
                                          CommunityRouteNames.REPORT_ABUSIVE,
                                          {
                                              post_id: item?.id,
                                              index,
                                          }
                                      );
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 20,
                                width: 20,
                            }}
                        >
                            <Report />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </LinearGradient>
        </View>
    );
};

export default memo(PostComponent);
