import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import BottomModal from 'src/components/BottomModal';
import BreadCrumbTab from 'src/components/BreadCrumbTab';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import { CommunityRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import {
    dateConvertor,
    dateConvertorWithFormat,
} from 'src/utils/dateConvertToTimezone';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { communityItemType } from 'typings/communityItemType';
import { userProfileType } from 'typings/user';
import { useDebounce } from 'use-debounce';
import styles from './Community.style';
import PostComponent from './PostComponent';
import SearchModal from './SearchModal';

type Props = {
    route?: any;
};

const data = [
    { name: 'New', key: 1, type: 'new' },
    { name: 'Trending', key: 2, type: 'trending' },
    { name: 'Starred', key: 3, type: 'starred' },
];

const CommunityPage = ({ route }: Props) => {
    const [currTab, setCurrTab] = useState({
        name: 'New',
        key: 1,
        type: 'new',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [bottomLoading, setBottomLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [shouldNext, setShouldNext] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    const [page, setPage] = useState(1);
    const [showData, setShowData] = useState(false);

    const [showSearch, setShowSearch] = useState(false);

    const posts = useAppSelector((state) => state?.postReducer?.communityPost);

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    const { t } = useTranslation();

    const item: communityItemType = route?.params?.item;
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const [value] = useDebounce(searchText, 500);

    useEffect(() => {
        onSearch(value);
    }, [value]);

    useEffect(() => {
        setIsLoading(true);
        getData(1);
    }, [currTab]);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    const getData = (page: number, search?: string) => {
        dispatch({
            type: 'GET_POSTS',
            payload: {
                data: {
                    type: currTab?.type,
                    community_type_id: item?.id,
                    search,
                },
                page,
                callback: (next) => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
                    !next && setShouldNext(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
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

    const onSearch = (txt: string) => {
        setIsLoading(true);
        getData(1, txt);
        setPage(1);
        setShouldNext(true);
    };

    const onEndReached = () => {
        if (shouldNext && !bottomLoading) {
            setBottomLoading(true);
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const onDeletePress = () => {
        setDeleteLoading(true);
        dispatch({
            type: 'DELETE_POSTS',
            payload: {
                data: {
                    post_id: modalData?.post_id,
                },
                index: modalData?.index,
                callback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                    setModalData({});
                },
                errorCallback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                },
            },
        });
    };

    const renderItem = ({
        item: postData,
        index,
    }: {
        item: postType;
        index: number;
    }) => (
        <PostComponent
            numberOfLines={5}
            item={postData}
            index={index}
            onPress={() =>
                navigate(CommunityRouteNames.POST_PAGE, {
                    index,
                    name: item?.name,
                })
            }
            showReport={!postData?.is_self}
            onCommentPress={() =>
                navigate(CommunityRouteNames.POST_PAGE, {
                    index,
                    name: item?.name,
                })
            }
            onMorePress={() => {
                setModalData({
                    data: postData?.content,
                    post_id: postData?.id,
                    index,
                    date: postData?.created_at,
                });
                setShowModal(true);
            }}
        />
    );

    return showData ? (
        <>
            {showSearch && (
                <SearchModal
                    onChangeText={(txt) => {
                        setSearchText(txt);
                    }}
                    onClosePress={() => {
                        setSearchText('');
                        setShowSearch(false);
                    }}
                />
            )}
            <ContainerTab2
                isBack
                contentContainerStyle={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    overflow: 'hidden',
                }}
                textContainerStyle2={{ paddingBottom: 30, paddingTop: 20 }}
                heading={item?.name}
                description={item?.description}
                // searchIcon

                searchIconPress={() => {
                    setShowSearch(true);
                }}
            >
                <View style={{ flex: 1 }}>
                    {isLoading ? (
                        <View
                            style={{
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                paddingHorizontal: 30,
                                flex: 1,
                            }}
                        >
                            <View style={{ height: 50, marginTop: 40 }}>
                                <BreadCrumbTab
                                    activeTab={currTab?.key}
                                    tabs={data}
                                    onChange={(data) => {
                                        setCurrTab(data);
                                    }}
                                />
                            </View>
                            <PostShimmer count={4} />
                        </View>
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
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
                            onEndReached={onEndReached}
                            stickyHeaderIndices={[0]}
                            stickyHeaderHiddenOnScroll
                            style={{ flex: 1 }}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 100,
                            }}
                            ListHeaderComponent={
                                <View
                                    style={{
                                        paddingHorizontal: 30,
                                        backgroundColor: colors.background,
                                        paddingBottom: 20,
                                        paddingTop: 40,
                                    }}
                                >
                                    <BreadCrumbTab
                                        activeTab={currTab?.key}
                                        tabs={data}
                                        onChange={(data) => {
                                            setCurrTab(data);
                                        }}
                                    />
                                    {currTab.key === 1 && (
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigate(
                                                    CommunityRouteNames.WRITE_POST,
                                                    {
                                                        id: item?.id,
                                                        type: 'add',
                                                        heading: item?.name,
                                                        placeholder:
                                                            "What's on your mind...",
                                                    }
                                                )
                                            }
                                            style={styles.writeBox}
                                        >
                                            <Text style={styles.writeText}>
                                                What's on your mind...
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            }
                            ListEmptyComponent={
                                <EmptyPlaceholder text='No post found' />
                            }
                            data={posts}
                            renderItem={renderItem}
                            ListFooterComponent={
                                bottomLoading && (
                                    <View style={{ alignItems: 'center' }}>
                                        <PostShimmer count={4} />
                                    </View>
                                )
                            }
                        />
                    )}
                </View>
            </ContainerTab2>

            {showModal && user?.time_zone && (
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
                    // edit={moment().isSame(
                    //     new Date(
                    //         dateConvertor(modalData?.date, user?.time_zone)
                    //     ),
                    //     'day'
                    // )}
                    isLoading={deleteLoading}
                    show={showModal}
                    onDeletePress={onDeletePress}
                    onEditPress={() => {
                        navigate(CommunityRouteNames.WRITE_POST, {
                            id: item?.id,
                            ...modalData,
                            type: 'edit',
                        });
                        setShowModal(false);
                    }}
                />
            )}
        </>
    ) : (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator color={colors.regentBlue} size='large' />
        </View>
    );
};

export default CommunityPage;
