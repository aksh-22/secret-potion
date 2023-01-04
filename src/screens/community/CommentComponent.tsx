import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Image,
    ImageStyle,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Comment from 'src/assets/svg/comment.svg';
import Love from 'src/assets/svg/love.svg';
import MoreIcon from 'src/assets/svg/moreVertical.svg';
import PressableText from 'src/components/PressableText';
import colors from 'src/constants/colors';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { dateFormatter } from 'src/utils/dateFormatter';
import numberFormatter from 'src/utils/numberFormatter';
import { commentType } from 'typings/commentType';
import { userProfileType } from 'typings/user';
import styles from './Community.style';

type Props = {
    mainStyle?: ViewStyle;
    imageStyle?: ImageStyle;
    numberOfLines?: number;
    imageSize?: number;
    borderRadius?: number;
    showLeftLine?: boolean;
    showBottomLine?: boolean;
    item?: commentType;
    onReplyPress?: (
        id?: any,
        user?: { id: number; name: string },
        offset?: number
    ) => void;
    onCommentPress?: (id?: number) => void;
    onLongPress: () => void;
    apiType?: string;
};

const CommentComponent = ({
    mainStyle,
    imageStyle,
    numberOfLines = 3,
    imageSize = 65,
    borderRadius = 15,
    showLeftLine,
    item,
    onReplyPress,
    showBottomLine,
    apiType,
    onCommentPress,
    onLongPress,
}: Props) => {
    const [comment, setComment] = useState<commentType>({});

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    const [likeLoading, setLikeLoading] = useState(false);

    const [loadMore, setLoadMore] = useState(false);
    const [offset, setOffset] = useState(0);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        setComment(item);
    }, [item]);

    const dispatch = useDispatch();

    const onLikePress = () => {
        setLikeLoading(true);
        const temp = { ...comment };

        if (temp.is_like) {
            temp.is_like = false;
            temp.total_like = temp.total_like - 1;
            setComment(temp);
        } else {
            temp.is_like = true;
            temp.total_like = temp.total_like + 1;
            setComment(temp);
        }
        dispatch({
            type: apiType === 'reflection' ? 'LIKE_REFLECTION' : 'LIKE_POSTS',
            payload: {
                data: {
                    id: item?.id,
                    type: 'comment',
                },
                //  index: index,
                callback: (res) => {
                    setLikeLoading(false);
                    setComment((prev) => ({ ...prev, ...res?.comments }));
                },
                errorCallback: () => {
                    setLikeLoading(false);
                },
            },
        });
    };

    const [showMore, setShowMore] = useState(false);
    const onTextLayout = useCallback((e) => {
        setShowMore(e.nativeEvent.lines.length > numberOfLines);
    }, []);

    return (
        // !---------Main component
        <View
            ref={(view) => {
                if (!view) return;
                view.measureInWindow((x, y) => {
                    setOffset(y);
                });
            }}
            style={[{}, mainStyle]}
        >
            {/* !---------- left image component----------- */}
            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                }}
            >
                {showLeftLine && (
                    <View style={{}}>
                        <View
                            style={{
                                width: 1,
                                backgroundColor: colors.borderColor,
                                height: imageSize + 13,
                                opacity: 0.5,
                            }}
                        />
                        {showBottomLine && (
                            <View
                                style={{
                                    width: 1,
                                    backgroundColor: colors.borderColor,
                                    flex: 1,
                                    opacity: 0.5,
                                }}
                            />
                        )}
                    </View>
                )}
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        paddingTop: 30,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: imageSize,
                        }}
                    >
                        {showLeftLine ? (
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: colors.borderColor,
                                    width: 10,
                                }}
                            />
                        ) : null}
                        <Pressable
                            onPress={
                                () => {
                                    item?.user?.id !== user?.id &&
                                        navigate(RootStackName.OTHER_PROFILE, {
                                            id: item?.user?.id,
                                        });
                                }
                                // : navigate(RootStackName.PROFILE)
                            }
                        >
                            <Image
                                resizeMode='cover'
                                source={{ uri: item?.user?.profile_image }}
                                style={[
                                    {
                                        width: imageSize,
                                        height: imageSize,
                                        borderRadius: borderRadius,
                                    },
                                    imageStyle,
                                ]}
                            />
                        </Pressable>
                    </View>
                    {/* !-----------right text component------------- */}
                    {item?.user?.id === user?.id ? (
                        <Pressable
                            disabled={item?.user?.id !== user?.id}
                            onPress={onLongPress}
                            style={styles.moreIconWrapper}
                            hitSlop={30}
                        >
                            <MoreIcon height={15} width={15} />
                        </Pressable>
                    ) : null}
                    <View style={{ flex: 1 }}>
                        <View
                            style={{
                                marginLeft: 10,
                                backgroundColor: colors.commentBackground,
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            {/* !-------- heading component-------------- */}
                            <Text style={styles.postHeading}>
                                {comment?.user?.user_name}
                            </Text>
                            <Text style={styles.postHeading2}>
                                Posted on {dateFormatter(comment?.created_at)}
                            </Text>
                            {/* !--------- description----------------- */}
                            <View>
                                <Text
                                    // ref={textRef}
                                    // onTextLayout={onTextLayout}
                                    numberOfLines={
                                        !loadMore ? numberOfLines : undefined
                                    }
                                    style={[
                                        styles.postHeading,
                                        {
                                            color: colors.lightBlack,
                                            marginTop: 10,
                                            // backgroundColor: 'green',
                                        },
                                    ]}
                                >
                                    {comment?.tag_user?.user_name ? (
                                        <Text
                                            onPress={
                                                () =>
                                                    !item?.tag_user?.is_self &&
                                                    navigate(
                                                        RootStackName.OTHER_PROFILE,
                                                        {
                                                            id: item?.tag_user
                                                                ?.id,
                                                        }
                                                    )
                                                // : navigate(RootStackName.PROFILE)
                                            }
                                            style={{ color: colors.profile1 }}
                                        >
                                            @{comment?.tag_user?.user_name}
                                        </Text>
                                    ) : null}{' '}
                                    {comment?.comment}
                                </Text>
                                <View
                                    style={{
                                        zIndex: -1,
                                        opacity: 0,
                                        position: 'absolute',
                                        // marginLeft: 10,
                                        // backgroundColor: 'red',
                                        left: 0,
                                        right: 0,
                                        // bottom: 0,
                                        // top: 0,
                                    }}
                                >
                                    <Text
                                        onTextLayout={onTextLayout}
                                        style={[
                                            styles.postHeading,
                                            {
                                                color: colors.lightBlack,
                                                marginTop: 10,
                                            },
                                        ]}
                                    >
                                        @{comment?.tag_user?.user_name}
                                        {comment?.comment}
                                    </Text>
                                </View>
                            </View>

                            {showMore && (
                                <PressableText
                                    wrapperStyle={{ marginTop: 10 }}
                                    textStyle={{ color: colors.regentBlue }}
                                    onTextPress={() =>
                                        setLoadMore((prev) => !prev)
                                    }
                                >
                                    {!loadMore ? 'Show more' : 'Show less'}
                                </PressableText>
                            )}
                        </View>
                        {/* !------------bottom component----------- */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 15,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    marginLeft: 15,
                                }}
                            >
                                {/* !----------like---------- */}
                                <TouchableOpacity
                                    onPress={onLikePress}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        height: 20,
                                        width: 30,
                                    }}
                                    disabled={likeLoading}
                                >
                                    <>
                                        <Love
                                            fill={
                                                comment?.is_like
                                                    ? colors.Carnation
                                                    : colors.downy
                                            }
                                        />
                                        <Text style={styles.postReactionText}>
                                            {numberFormatter(
                                                comment?.total_like
                                            )}
                                        </Text>
                                    </>
                                </TouchableOpacity>
                                {/* !----------comment---------- */}
                                <TouchableOpacity
                                    disabled
                                    onPress={() => onCommentPress(comment?.id)}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        height: 20,
                                        width: 30,
                                        marginLeft: 10,
                                    }}
                                >
                                    <Comment
                                        fill={
                                            comment?.total_reply > 0
                                                ? colors.comment
                                                : colors.downy
                                        }
                                    />
                                    <Text style={styles.postReactionText}>
                                        {numberFormatter(comment?.total_reply)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* !----------reply---------- */}
                            <Pressable
                                hitSlop={20}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingTop: 10,
                                }}
                                onPress={() =>
                                    onReplyPress(
                                        comment?.id,
                                        {
                                            id: item?.user?.id,
                                            name: item?.user?.user_name,
                                        },
                                        offset
                                    )
                                }
                            >
                                <Text style={styles.postReactionText}>
                                    Reply
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CommentComponent;
