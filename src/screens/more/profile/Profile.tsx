import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    Text,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import ConnectionIcon from 'src/assets/svg/connections.svg';
import PostIcon from 'src/assets/svg/posts.svg';
import WellnessIcon from 'src/assets/svg/wellness.svg';
import BottomModal from 'src/components/BottomModal';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import GrayText from 'src/components/GrayText';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import { CommunityRouteNames, RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import PostComponent from 'src/screens/community/PostComponent';
import { userProfileType } from 'typings/user';
import styles from './Profile.style';

type Props = {};

const Profile = ({}: Props) => {
    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    console.log('user', JSON.stringify(user, null, 2));

    const [isLoading, setIsLoading] = useState(false);

    const [showData, setShowData] = useState(false);

    const [bottomLoading, setBottomLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [shouldNext, setShouldNext] = useState(true);
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState<any>({});
    const [deleteLoading, setDeleteLoading] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    const posts = useAppSelector((state) => state?.postReducer?.myPosts);

    const { t } = useTranslation();

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const onEdit = () => {
        navigate(RootStackName.EDIT_PROFILE);
    };

    const dispatch = useDispatch();

    const getData = (page) => {
        setIsLoading(true);
        dispatch({
            type: 'GET_USER_POSTS',
            payload: {
                data: {
                    user_id: user?.id,
                },
                page,
                callback: (next) => {
                    setIsLoading(false);
                    setBottomLoading(false);
                    setRefreshLoading(false);
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

    useEffect(() => {
        // dispatchApp(updateCommunityPosts([]));
        getData(1);
        dispatch({ type: 'GET_PROFILE' });
    }, []);

    const onEndReached = () => {
        if (shouldNext && !bottomLoading) {
            setBottomLoading(true);
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getData(1);
        setPage(1);
        setShouldNext(true);
        dispatch({ type: 'GET_PROFILE' });
    };

    const onDeletePress = () => {
        setDeleteLoading(true);
        dispatch({
            type: 'DELETE_POSTS',
            payload: {
                apiType: 'profile',
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
            item={postData}
            index={index}
            apiType='profile'
            // showDots={false}
            showReport={false}
            //  onPress={() =>
            //    navigate(CommunityRouteNames.POST_PAGE, {
            //      index,
            //      currTab,
            //      name: item?.name,
            //    })
            //  }
            //  onCommentPress={() =>
            //    navigate(CommunityRouteNames.POST_PAGE, {
            //      index,
            //      currTab,
            //      name: item?.name,
            //    })
            //  }
            onMorePress={() => {
                setModalData({
                    id: postData?.community_id,
                    data: postData?.content,
                    post_id: postData?.id,
                    index,
                    date: postData?.created_at,
                });
                setShowModal(true);
                const a = {
                    data: postData?.content,
                    post_id: postData?.id,
                    index,
                };
            }}
        />
    );

    return showData ? (
        <>
            <ContainerTabWithoutScroll
                editProfile
                editProfileIconPress={onEdit}
                message={false}
                bell={false}
                isBack
                StatusBarStyle='light-content'
                statusBarColor={colors.profile1}
                headerStyle={{ backgroundColor: colors.profile1 }}
                contentContainerStyle={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 0,
                }}
                backIconColor={colors.defaultWhite}
            >
                <FlatList
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
                    data={posts}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        backgroundColor: colors.defaultWhite,
                        paddingBottom: 100,
                        flexGrow: 1,
                    }}
                    ListEmptyComponent={
                        isLoading ? (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                }}
                            >
                                <PostShimmer count={4} />
                            </View>
                        ) : (
                            <EmptyPlaceholder
                                size={100}
                                text='No posts found'
                            />
                        )
                    }
                    ListFooterComponent={
                        bottomLoading && (
                            <View style={{ alignItems: 'center' }}>
                                <PostShimmer count={4} />
                            </View>
                        )
                    }
                    ListHeaderComponent={
                        <>
                            <LinearGradient
                                colors={[colors.profile1, colors.profile2]}
                                style={styles.topContainer}
                            >
                                <Image
                                    source={{ uri: user?.profile_image }}
                                    style={styles.imageStyle}
                                />
                                <Text
                                    style={styles.name}
                                >{`${user?.fname} ${user?.lname}`}</Text>
                                <Text style={styles.email}>{user?.email}</Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // alignItems: 'center',
                                        paddingHorizontal: 20,
                                        marginTop: 15,
                                    }}
                                >
                                    <View style={styles.box}>
                                        <Text
                                            style={[
                                                styles.boxText,
                                                { fontSize: 10 },
                                            ]}
                                        >
                                            {t('settings:wellnessScore')}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 7,
                                            }}
                                        >
                                            <WellnessIcon
                                                width={30}
                                                height={30}
                                                fill={colors.defaultWhite}
                                            />
                                            <Text
                                                style={[
                                                    styles.boxText,
                                                    {
                                                        fontSize: 17,
                                                        lineHeight: 20,
                                                        marginLeft: 10,
                                                    },
                                                ]}
                                            >
                                                {Math.ceil(
                                                    parseInt(
                                                        user?.wellness_score
                                                    )
                                                )}
                                                %
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.box}>
                                        <Text style={styles.boxText}>
                                            {t('settings:posts')}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 7,
                                            }}
                                        >
                                            <PostIcon
                                                width={25}
                                                height={25}
                                                fill={colors.defaultWhite}
                                            />
                                            <Text
                                                style={[
                                                    styles.boxText,
                                                    {
                                                        fontSize: 17,
                                                        lineHeight: 20,
                                                        marginLeft: 10,
                                                    },
                                                ]}
                                            >
                                                {user?.total_post}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.box}>
                                        <Text style={styles.boxText}>
                                            {t('settings:connections')}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 7,
                                            }}
                                        >
                                            <ConnectionIcon
                                                width={25}
                                                height={25}
                                                fill={colors.defaultWhite}
                                            />
                                            <Text
                                                style={[
                                                    styles.boxText,
                                                    {
                                                        fontSize: 17,
                                                        lineHeight: 20,
                                                        marginLeft: 10,
                                                    },
                                                ]}
                                            >
                                                {user?.total_connection}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                {/* !---------------------- Bottom box --------------------------! */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        // alignItems: 'center',
                                        paddingHorizontal: 20,
                                        marginTop: 0,
                                    }}
                                >
                                    <View style={styles.box2}>
                                        <Text style={styles.boxText}>
                                            {t('settings:age')}{' '}
                                            {user?.dob
                                                ? dayjs().diff(
                                                      user?.dob,
                                                      'year'
                                                  )
                                                : '---'}
                                        </Text>
                                    </View>
                                    <View style={styles.box2}>
                                        <Text style={styles.boxText}>
                                            {user?.gender
                                                ? user?.gender === 'not_defined'
                                                    ? 'Other'
                                                    : user?.gender
                                                : 'Gender ---'}
                                        </Text>
                                    </View>
                                    <View style={styles.box2}>
                                        {user?.country !== null &&
                                        user?.country !== 'null' ? (
                                            <Text
                                                style={[
                                                    styles.boxText,
                                                    {
                                                        fontSize:
                                                            user?.country?.trim()
                                                                .length > 10
                                                                ? user?.country?.trim()
                                                                      .length >
                                                                  15
                                                                    ? 8
                                                                    : 10
                                                                : 12,
                                                    },
                                                ]}
                                            >
                                                {user?.country &&
                                                user?.country !== null
                                                    ? user?.country
                                                    : 'Country ---'}
                                            </Text>
                                        ) : (
                                            <Text style={styles.boxText}>
                                                Country ----
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </LinearGradient>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.profile2,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: colors.defaultWhite,
                                        flex: 1,
                                        borderTopLeftRadius: 60,
                                    }}
                                >
                                    <View
                                        style={{
                                            paddingTop: 40,
                                            paddingHorizontal: 30,
                                        }}
                                    >
                                        <GrayText
                                            style={{
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {user?.bio ?? 'No bio available.'}
                                        </GrayText>
                                    </View>
                                </View>
                            </View>
                        </>
                    }
                />
            </ContainerTabWithoutScroll>
            <BottomModal
                onClose={() => {
                    setShowModal(false);
                }}
                edit={!dayjs().isSame(modalData?.date, 'day')}
                date={modalData?.date}
                style={{ paddingBottom: 30 }}
                isLoading={deleteLoading}
                show={showModal}
                onDeletePress={onDeletePress}
                onEditPress={() => {
                    setShowModal(false);
                    navigate(CommunityRouteNames.WRITE_POST, {
                        ...modalData,
                        type: 'edit',
                        apiType: 'profile',
                    });
                }}
            />
        </>
    ) : (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator color={colors.regentBlue} size='large' />
        </View>
    );
};

export default Profile;
