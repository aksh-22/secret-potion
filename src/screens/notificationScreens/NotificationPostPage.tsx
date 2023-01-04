import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, FlatList, RefreshControl, View } from 'react-native';
import { useDispatch } from 'react-redux';
import BottomModal from 'src/components/BottomModal';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import LoadingComponent from 'src/components/LoadingComponent';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import { CommunityRouteNames, RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { dateConvertorWithFormat } from 'src/utils/dateConvertToTimezone';
import { commentType } from 'typings/commentType';
import CommentList from '../community/CommentList';
import PostComponent from '../community/PostComponent';
import ReflectionPost from '../home/reflection/ReflectionPost';
import NotificationInput from './NotificationInput';

type IProps = {
    post_id?: number;
    reflection_post_id?: number;
    parent_id?: number;
    main_comment_id?: number;
};

type Props = {
    route?: any;
};
const NotificationPostPage = ({ route }: Props) => {
    const name: string = route?.params?.name;
    const post_id: number = route?.params?.id;
    const type: any = route?.params?.type;

    const { user } = useAppSelector((state) => state?.userReducer);

    const [Ids, setIds] = useState<IProps>({
        post_id: type === 'post' ? post_id : undefined,
        reflection_post_id: type === 'reflection' ? post_id : undefined,
        parent_id: null,
        main_comment_id: null,
    });

    const [item, setItem] = useState<postType>({});

    const [isLoading, setIsLoading] = useState(false);

    const [comments, setComments] = useState<Array<commentType>>([]);

    const [refreshLoading, setRefreshLoading] = useState(false);

    const [dataLoading, setDataLoading] = useState(false);

    const [currIndex, setCurrIndex] = useState(0);
    const [currIndex2, setCurrIndex2] = useState(0);

    const [shouldNext, setShouldNext] = useState(true);

    const [page, setPage] = useState(1);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    const [currUser, setCurrUser] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            getComments(1);
            getData();
        }, [])
    );

    // const getAllData = () => {
    //     getComments(1);
    //     getData();
    // };

    // useEffect(() => {
    //     getComments(1);
    //     getData();
    // }, [post_id]);

    const { navigate, goBack, replace, canGoBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        const backAction = () => {
            if (canGoBack()) {
                // replace(RootStackName.BOTTOMTAB, {
                //     params: {
                //         screen: CommunityRouteNames.NOTIFICATION_POST_PAGE,
                //     },
                // });
                // replace(RootStackName.NOTIFICATION);
                goBack();
            } else {
                replace(RootStackName.NOTIFICATION);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const getComments = (page) => {
        setIsLoading(true);
        let data = {};
        if (type === 'reflection') {
            data = {
                reflection_post_id: post_id,
            };
        } else {
            data = {
                post_id,
            };
        }
        dispatch({
            type:
                type === 'reflection'
                    ? 'GET_COMMENTS_REFLECTION'
                    : 'GET_COMMENTS',
            payload: {
                data,
                page,
                callback: (res, next) => {
                    if (page === 1) {
                        setComments(res);
                    } else {
                        setComments((prev) => [...prev, ...res]);
                    }
                    !next && setShouldNext(false);
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const getData = () => {
        setDataLoading(true);
        let data = {};
        if (type === 'reflection') {
            data = {
                reflection_post_id: post_id,
            };
        } else {
            data = {
                post_id,
            };
        }
        dispatch({
            type:
                type === 'reflection'
                    ? 'GET_SINGLE_REFLECTION_LIST'
                    : 'GET_POSTS',
            payload: {
                data,
                callback: (next, data) => {
                    setItem(data);
                    setDataLoading(false);
                    setRefreshLoading(false);
                },
                errorCallback: () => {
                    setDataLoading(false);
                    setRefreshLoading(false);
                    if (canGoBack()) {
                        goBack();
                    } else {
                        replace(RootStackName.NOTIFICATION);
                    }
                },
            },
        });
    };

    const onDeletePress = () => {
        setDeleteLoading(true);

        dispatch({
            type:
                type === 'reflection'
                    ? 'DELETE_POSTS_REFLECTION'
                    : 'DELETE_POSTS',
            payload: {
                data: {
                    post_id: modalData?.post_id,
                },
                index: modalData?.index,
                callback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                    setModalData({});
                    if (canGoBack()) {
                        goBack();
                    } else {
                        replace(RootStackName.NOTIFICATION);
                    }
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
        count,
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
            temp[subCommentIndex].replies.splice(subCommentIndex, 1);
        }
        setItem((prev) => {
            return { ...prev, total_comment: count };
        });
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
                    index={i}
                    onReplyPress={(data, user, offset, index2) => {
                        const a = {
                            post_id: type === 'post' ? post_id : undefined,
                            reflection_post_id:
                                type === 'reflection' ? post_id : undefined,
                            ...data,
                        };
                        setIds(a);
                        setCurrIndex(i);
                        setCurrUser(user);
                        setCurrIndex2(index2);
                        // Keyboard.
                    }}
                    item={itemData}
                    apiType={type}
                    myIndex={i}
                />
            </View>
        </View>
    );

    return (
        <>
            <ContainerTab2
                isBack
                contentContainerStyle={{ paddingBottom: 60, paddingTop: 0 }}
                headingHeader={name !== '%20' ? name : ''}
                backBtnPress={() => {
                    if (canGoBack()) {
                        goBack();
                    } else {
                        replace(RootStackName.NOTIFICATION);
                    }
                }}
                statusBarColor={colors.background}
                headerStyle={{ backgroundColor: colors.background }}
                changeDot={false}
            >
                {dataLoading && <LoadingComponent />}
                <FlatList
                    showsVerticalScrollIndicator={false}
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
                        type === 'reflection' ? (
                            <ReflectionPost
                                // showDots={false}
                                item={item}
                                onCommentPress={() => {
                                    setIds({
                                        post_id:
                                            type === 'post'
                                                ? post_id
                                                : undefined,
                                        reflection_post_id:
                                            type === 'reflection'
                                                ? post_id
                                                : undefined,
                                        parent_id: null,
                                        main_comment_id: null,
                                    });
                                }}
                                showReport={!item?.is_self}
                                onMorePress={() => {
                                    setModalData({
                                        data: item?.content,
                                        post_id,
                                        date: item?.created_at,
                                    });
                                    setShowModal(true);
                                }}
                                shouldUpdateComponent
                                // onPress={() => push(CommunityRouteNames.POST_PAGE)}
                            />
                        ) : (
                            <PostComponent
                                // showDots={false}
                                item={item}
                                onCommentPress={() => {
                                    setIds({
                                        post_id:
                                            type === 'post'
                                                ? post_id
                                                : undefined,
                                        reflection_post_id:
                                            type === 'reflection'
                                                ? post_id
                                                : undefined,
                                        parent_id: null,
                                        main_comment_id: null,
                                    });
                                }}
                                showReport={!item?.is_self}
                                onMorePress={() => {
                                    setModalData({
                                        data: item?.content,
                                        post_id,

                                        date: item?.created_at,
                                    });
                                    setShowModal(true);
                                }}
                                shouldUpdateComponent
                                // onPress={() => push(CommunityRouteNames.POST_PAGE)}
                            />
                        )
                    }
                />
                <NotificationInput
                    ids={Ids}
                    paddingBottom={false}
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
                        setItem((prev) => {
                            return {
                                ...prev,
                                total_comment: prev.total_comment + 1,
                            };
                        });
                    }}
                    apiType={type}
                    user={currUser}
                    onRemove={() => {
                        setIds({
                            post_id: type === 'post' ? post_id : undefined,
                            reflection_post_id:
                                type === 'reflection' ? post_id : undefined,
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
                    style={{ paddingBottom: 30 }}
                    isLoading={deleteLoading}
                    show={showModal}
                    onDeletePress={onDeletePress}
                    onEditPress={() => {
                        navigate(CommunityRouteNames.WRITE_POST, {
                            id: post_id,
                            ...modalData,
                            type: 'edit',
                            apiType: type,
                        });
                        setShowModal(false);
                    }}
                />
            )}
        </>
    );
};

export default NotificationPostPage;
