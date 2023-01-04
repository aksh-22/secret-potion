import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BottomModal from 'src/components/BottomModal';
import CommentInput from 'src/components/CommentInput';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import { CommunityRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import CommentList from 'src/screens/community/CommentList';
import { dateConvertorWithFormat } from 'src/utils/dateConvertToTimezone';
import { commentType } from 'typings/commentType';
import ReflectionPost from './ReflectionPost';

type IProps = {
    reflection_post_id?: number;
    parent_id?: number;
    main_comment_id?: number;
};

type Props = {
    route?: any;
    navigation?: any;
};
const ReflectionList = ({ route, navigation }: Props) => {
    const index: number = route?.params?.index;
    const reflection_post_id: string = route?.params?.reflection_post_id;

    const item: postType = useAppSelector(
        (state) => state?.postReducer?.reflectionListData[index]
    );

    const { user } = useAppSelector((state) => state?.userReducer);

    const [Ids, setIds] = useState<IProps>({
        reflection_post_id: item?.id,
        parent_id: null,
        main_comment_id: null,
    });

    const [isLoading, setIsLoading] = useState(false);

    const [comments, setComments] = useState<Array<commentType>>([]);

    const [refreshLoading, setRefreshLoading] = useState(false);

    const [currIndex, setCurrIndex] = useState(0);
    const [currIndex2, setCurrIndex2] = useState(0);

    const [shouldNext, setShouldNext] = useState(true);

    const [page, setPage] = useState(1);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    const [currUser, setCurrUser] = useState({});

    useEffect(() => {
        getComments(1);
    }, []);

    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const getComments = (page) => {
        setIsLoading(true);
        dispatch({
            type: 'GET_COMMENTS_REFLECTION',
            payload: {
                data: {
                    reflection_post_id: item?.id,
                    // community_type_id: item?.community_id,
                },
                page,
                callback: (res, next) => {
                    if (page === 1) {
                        setComments(res);
                    } else {
                        setComments((prev) => [...prev, ...res]);
                    }
                    !next && setShouldNext(false);
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
            },
        });
    };

    const getData = () => {
        setIsLoading(true);
        dispatch({
            type: 'GET_REFLECTION_LIST',
            payload: {
                data: {
                    post_id: item?.id,
                    reflection_post_id,
                },
                index,
                callback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
            },
        });
    };

    const onDeletePress = () => {
        setDeleteLoading(true);
        dispatch({
            type: 'DELETE_POSTS_REFLECTION',
            payload: {
                data: {
                    post_id: modalData?.post_id,
                },
                index: modalData?.index,
                callback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                    setModalData({});
                    goBack();
                },
                errorCallback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                },
            },
        });
    };

    // const item: communityItemType = route?.params?.item;

    const onDelete = (
        parentComment,
        _postIndex,
        _count,
        mainCommentIndex,
        subCommentIndex
    ) => {
        if (parentComment) {
            setComments((prev) => {
                const temp = [...prev];
                temp.splice(mainCommentIndex, 1);
                return temp;
            });
        } else {
            let temp = [...comments];
            temp[mainCommentIndex].total_reply =
                temp[mainCommentIndex].total_reply - 1;
            temp[mainCommentIndex].replies.splice(subCommentIndex, 1);

            setComments([...temp]);
        }
    };

    const onUpdate = (index, data) => {
        setComments((prev) => {
            const temp = [...prev];
            temp[index] = { ...temp[index], comment: data };
            return temp;
        });
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getComments(1);
        getData();
        setShouldNext(true);
    };

    const onEndReached = () => {
        if (shouldNext && !isLoading) {
            setPage((prev) => prev + 1);
            getComments(page + 1);
        }
    };

    const renderItem = ({ item: itemData, index: i }) => (
        <View style={{ paddingHorizontal: 30, flex: 1 }}>
            <View style={{ flex: 1, paddingLeft: 20 }}>
                <CommentList
                    postId={item?.id}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    index={index}
                    onReplyPress={(data, user, offset, index2) => {
                        const a = {
                            reflection_post_id: item?.id,
                            ...data,
                        };
                        setIds(a);
                        setCurrIndex(i);
                        setCurrUser(user);
                        setCurrIndex2(index2);
                        // Keyboard.
                    }}
                    item={itemData}
                    apiType='reflection'
                    myIndex={i}
                />
            </View>
        </View>
    );

    return (
        <>
            <ContainerTab2
                statusBarColor={colors.background}
                headerStyle={{ backgroundColor: colors.background }}
                isBack
                contentContainerStyle={{ paddingBottom: 60, paddingTop: 0 }}
            >
                <FlatList
                    data={comments}
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingTop: 20,
                        paddingBottom: 200,
                    }}
                    renderItem={renderItem}
                    onEndReached={onEndReached}
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
                    ListEmptyComponent={
                        isLoading ? (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <PostShimmer count={4} />
                            </View>
                        ) : (
                            <EmptyPlaceholder
                                style={{ marginTop: 30 }}
                                size={130}
                                text='No comment found'
                            />
                        )
                    }
                    ListFooterComponent={
                        isLoading && (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <PostShimmer count={4} />
                            </View>
                        )
                    }
                    ListHeaderComponent={
                        <ReflectionPost
                            // showDots={false}
                            index={index}
                            item={item}
                            onCommentPress={() => {
                                setIds({
                                    reflection_post_id: item?.id,
                                    parent_id: null,
                                    main_comment_id: null,
                                });
                            }}
                            onMorePress={() => {
                                setModalData({
                                    data: item?.content,
                                    post_id: item?.id,
                                    index,
                                    date: item?.created_at,
                                });
                                setShowModal(true);
                            }}
                            showReport={!item?.is_self}
                            shouldUpdateComponent
                            apiType='reflection'
                            // onPress={() => push(CommunityRouteNames.POST_PAGE)}
                        />
                    }
                />
                <CommentInput
                    ids={Ids}
                    onSubmit={(data) => {
                        if (!Ids.parent_id) {
                            setComments((prev) => [
                                { ...data, replies: [] },
                                ...prev,
                            ]);
                        } else {
                            const temp = [...comments];
                            if (Ids.main_comment_id === Ids.parent_id) {
                                temp[currIndex].total_reply =
                                    temp[currIndex].total_reply + 1;
                            } else {
                                temp[currIndex].replies[
                                    currIndex2
                                ].total_reply =
                                    temp[currIndex].replies[currIndex2]
                                        .total_reply + 1;
                            }
                            // temp[currIndex] = data;
                            temp[currIndex].replies = [
                                ...temp[currIndex].replies,
                                data,
                            ];
                            // temp[currIndex].replies.length > 3 &&
                            //   temp[currIndex].replies.shift();
                            setComments([...temp]);
                        }
                    }}
                    index={index}
                    apiType='reflection'
                    user={currUser}
                    onRemove={() => {
                        setIds({
                            reflection_post_id: item?.id,
                            parent_id: null,
                            main_comment_id: null,
                        });
                    }}
                />
            </ContainerTab2>
            {showModal && (
                <BottomModal
                    date={modalData?.date}
                    onClose={() => {
                        setShowModal(false);
                    }}
                    edit={
                        !moment(modalData?.date).isSame(
                            dateConvertorWithFormat(
                                new Date(),
                                user?.time_zone
                            ),
                            'day'
                        )
                    }
                    isLoading={deleteLoading}
                    show={showModal}
                    onDeletePress={onDeletePress}
                    onEditPress={() => {
                        navigate(CommunityRouteNames.WRITE_POST, {
                            id: item?.id,
                            ...modalData,
                            type: 'edit',
                            apiType: 'reflection',
                        });
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default ReflectionList;
