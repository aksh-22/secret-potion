import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    BackHandler,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getReflection, getReflectionDateList } from 'src/api/homeService';
import BottomModal from 'src/components/BottomModal';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import DateAndTimePicker from 'src/components/dateAndTimePicker/DateAndTimePicker';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import InitialLoader from 'src/components/InitialLoader';
import LoadingComponent from 'src/components/LoadingComponent';
import { showMessage } from 'src/components/messageModal/MessageModal';
import PostShimmer from 'src/components/shimmers/PostShimmer';
import colors from 'src/constants/colors';
import {
    CommunityRouteNames,
    HomeRouteNames,
    RootStackName,
} from 'src/constants/routeName';
import { useAppDispatch, useAppSelector } from 'src/hooks/reducer';
import useAppState from 'src/hooks/useAppState';
import { updateReflection } from 'src/redux/reducer/postReducer';
import {
    dateConvertor,
    dateConvertorWithFormat,
} from 'src/utils/dateConvertToTimezone';
import { dateFormatForServer, dateFormatter } from 'src/utils/dateFormatter';
import { reflectionType } from 'typings/reflectionType';
import styles from './Reflection.style';
import ReflectionPost from './ReflectionPost';

const Reflection = ({ navigation, route }) => {
    const reflectionData: reflectionType = useAppSelector(
        (state) => state?.postReducer?.reflection
    );

    const { user } = useAppSelector((state) => state?.userReducer);

    const [isLoading, setIsLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [modalData, setModalData] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [bottomLoading, setBottomLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [shouldNext, setShouldNext] = useState(false);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState<any>();
    const [dateIsLoading, setDateIsLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [currQuestion, setCurrQuestion] = useState<reflectionType>(null);
    const [inIt, setInIt] = useState(true);

    const { navigate, canGoBack, goBack, replace } =
        useNavigation<NativeStackNavigationProp<any>>();

    const { appState } = useAppState();

    const posts: postType[] = useAppSelector(
        (state) => state?.postReducer?.reflectionListData
    );

    //?--------- to know if api of question of today has been successful or not

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const appDispatch = useAppDispatch();

    useEffect(() => {
        const backAction = () => {
            if (canGoBack()) {
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

    const onRefresh = () => {
        setRefreshLoading(true);
        getDateData(1, date);
        setPage(1);
        setShouldNext(true);
    };

    const onEndReached = () => {
        if (shouldNext && !bottomLoading) {
            setBottomLoading(true);
            getDateData(page + 1, date);
            setPage((prev) => prev + 1);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    useEffect(() => {
        getDateData(1, route?.params?.date ?? reflectionData?.day_date);
        setDate(route?.params?.date ?? reflectionData?.day_date);
    }, [route?.params?.date]);

    const getDateData = (page, date1) => {
        setIsLoading(true);
        setDateIsLoading(true);
        dispatch({
            type: 'GET_REFLECTION_DATE_LIST',
            payload: {
                page,
                data: { date: dateFormatForServer(date1) },
                callback: (next, question) => {
                    if (
                        question?.today_date &&
                        question?.day_date !== reflectionData?.day_date
                    ) {
                        appDispatch(updateReflection(question));
                    }
                    setCurrQuestion(question);
                    setIsLoading(false);
                    setShouldNext(next);
                    setRefreshLoading(false);
                    setBottomLoading(false);
                    setDateIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
                    setDateIsLoading(false);
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
                },
                errorCallback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                },
            },
        });
    };

    const onFilterPress = () => {
        setShow(true);
    };

    const onDateChange = (val) => {
        setDateIsLoading(true);
        setDate(dateFormatForServer(val));
        getDateData(1, val);
        setPage(1);
        setShouldNext(true);
    };

    const onUpdateQuestion = async () => {
        const data = {
            date: dateFormatForServer(currQuestion.day_date),
        };
        const res = await getReflectionDateList(data, 1);
        setCurrQuestion(res.data.question);
    };

    useEffect(() => {
        if (inIt) {
            setInIt(false);
        } else if (appState === 'active') {
            onUpdateQuestion();
        }
    }, [appState]);

    const renderItem = ({
        item: postData,
        index,
    }: {
        item: postType;
        index: number;
    }) => (
        <ReflectionPost
            numberOfLines={5}
            item={postData}
            index={index}
            apiType='reflection'
            onPress={() =>
                navigate(HomeRouteNames.REFLECTION_LIST, {
                    index,
                    reflection_post_id: currQuestion?.id,
                })
            }
            onCommentPress={() =>
                navigate(HomeRouteNames.REFLECTION_LIST, {
                    index,
                    reflection_post_id: currQuestion?.id,
                })
            }
            showReport={!postData?.is_self}
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
            <ContainerTab2
                isBack
                contentContainerStyle={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    overflow: 'hidden',
                }}
                backBtnPress={() => {
                    if (canGoBack()) {
                        goBack();
                    } else {
                        replace(RootStackName.NOTIFICATION);
                    }
                }}
                headingHeader='Reflections'
                onFilterPress={onFilterPress}
                statusBarColor={colors.defaultWhite}
                headerStyle={{ backgroundColor: colors.defaultWhite }}
            >
                {dateIsLoading && <LoadingComponent />}
                <View style={{ flex: 1 }}>
                    {!true ? (
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
                                <>
                                    <View style={[styles.textContainer]}>
                                        <View
                                            style={[
                                                styles.textContainer2,
                                                {
                                                    paddingBottom: 30,
                                                    paddingTop: 20,
                                                },
                                            ]}
                                        >
                                            <Text style={[styles.heading]}>
                                                {currQuestion?.question}
                                            </Text>
                                            <Text style={[styles.hashTag]}>
                                                {currQuestion?.hash}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.description,
                                                    {
                                                        color: colors.defaultBlack,
                                                    },
                                                ]}
                                            >
                                                {dateFormatter(
                                                    currQuestion?.day_date
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor:
                                                colors.defaultWhite,
                                        }}
                                    >
                                        <View
                                            style={[
                                                styles.bottomContainer,
                                                { borderTopStartRadius: 60 },
                                            ]}
                                        ></View>
                                    </View>
                                    <View
                                        style={{
                                            paddingHorizontal: 30,
                                            backgroundColor: colors.background,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        {currQuestion?.today_date && (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigate(
                                                        CommunityRouteNames.WRITE_POST,
                                                        {
                                                            id: currQuestion?.id,
                                                            type: 'add',
                                                            apiType:
                                                                'reflection',
                                                            heading:
                                                                currQuestion?.question,
                                                            placeholder:
                                                                'Write your response here...',
                                                        }
                                                    );
                                                }}
                                                style={styles.writeBox}
                                            >
                                                <Text style={styles.writeText}>
                                                    Write your response here...
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </>
                            }
                            ListEmptyComponent={
                                false ? (
                                    <View style={{ alignItems: 'center' }}>
                                        <PostShimmer count={4} />
                                    </View>
                                ) : (
                                    <EmptyPlaceholder text='No post found' />
                                )
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
            {showModal && (
                <BottomModal
                    date={modalData?.date}
                    onClose={() => {
                        setShowModal(false);
                    }}
                    isLoading={deleteLoading}
                    show={showModal}
                    edit={
                        !moment(modalData?.date).isSame(
                            dateConvertorWithFormat(
                                new Date(),
                                user?.time_zone
                            ),
                            'day'
                        )
                    }
                    onDeletePress={onDeletePress}
                    onEditPress={() => {
                        navigate(CommunityRouteNames.WRITE_POST, {
                            // id: item?.id,
                            ...modalData,
                            type: 'edit',
                            apiType: 'reflection',
                        });
                        setShowModal(false);
                    }}
                />
            )}
            <DateAndTimePicker
                style={{ paddingBottom: 100 }}
                // maxDate={moment(reflectionData?.day_date).toDate()}
                maxDate={moment(
                    reflectionData?.day_date
                        ? dateConvertor(
                              moment(reflectionData?.day_date),
                              user?.time_zone
                          )
                        : new Date()
                ).toDate()}
                minDate={moment('01-01-2022', 'MM-DD-YYYY').toDate()}
                show={show}
                value={moment(date).toDate()}
                onChange={onDateChange}
                onClose={setShow}
                mode='date'
            />
        </>
    ) : (
        <InitialLoader />
    );
};

export default Reflection;
