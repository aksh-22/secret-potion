import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import DateAndTimePicker from 'src/components/dateAndTimePicker/DateAndTimePicker';
import DateController from 'src/components/DateController';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import RequestShimmer from 'src/components/shimmers/RequestShimmer';
import colors from 'src/constants/colors';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { join_communityItemType } from 'typings/activityType';

import { showMessage } from 'src/components/messageModal/MessageModal';
import {
    useAppDispatch,
    useAppSelector,
    useAppSelector1,
} from 'src/hooks/reducer';
import { updateUser } from 'src/redux/reducer/userReducer';
import PlanListBox from './PlanListBox';

type Props = {
    tabType?: boolean;
    minDate?: any;
    maxDate?: any;
    onCurrDateChange?: (date: any) => void;
    statusEnabled?: boolean;
    disableDatePress?: boolean;
    date?: any;
    calMinDate?: any;
};

const ListView = ({
    tabType,
    maxDate,
    minDate,
    onCurrDateChange,
    statusEnabled = true,
    disableDatePress,
    date,
    calMinDate,
}: Props) => {
    const [activityData, setActivityData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    // const [deleteLoading, setDeleteLoading] = useState(false);

    const [currDate, setCurrDate] = useState<any>(date ?? new Date());

    const [refreshLoading, setRefreshLoading] = useState(false);

    const [shouldNext, setShouldNext] = useState(true);

    const [page, setPage] = useState(1);

    const [bottomLoading, setBottomLoading] = useState(false);

    const [show, setShow] = useState(false);

    const [statusLoading, setStatusLoading] = useState(false);

    const wellnessTypes = useAppSelector(
        (state) => state?.wellnessReducer?.wellnessTypes
    );

    // const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const isSame = dayjs().isSame(currDate, 'day');

    const {
        userReducer: { user },
    } = useAppSelector1();

    const dispatch2 = useAppDispatch();

    const onEndReached = () => {
        if (shouldNext && !bottomLoading) {
            setBottomLoading(true);
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const dispatch = useDispatch();

    const setStatus = () => {
        setStatusLoading(true);
        // const temp = { ...item };
        // temp.is_completed = !item?.is_completed;
        // setItem(temp);
        dispatch({
            type: 'ACTIVITY_STATUS_UPDATE',
            payload: {
                data: {
                    key: modalData?.is_completed ? false : true,
                    day_id: modalData?.day_id,
                    activity_id: modalData?.id,
                    wellness_id: modalData?.wellness_id,
                    date: dateFormatForServer(currDate),
                },
                callback: (data) => {
                    setStatusLoading(false);
                    let temp = { ...user };
                    temp.is_badge_earned = true;
                    !user?.is_badge_earned && dispatch2(updateUser(temp));
                    const tempData = [...activityData];

                    tempData[modalData.index].is_completed =
                        !tempData[modalData.index].is_completed;
                    setActivityData(tempData);
                    setModalData({});
                    let message2 = '';
                    if (data?.bonus_msg) {
                        message2 = `${data?.bonus_msg}`;
                    } else if (data?.three) {
                        message2 = `${data?.msg}`;
                    }
                    tempData[modalData.index].is_completed &&
                        showMessage({
                            isVisible: true,
                            message: `Well done! Your ${
                                wellnessTypes[modalData?.wellness_id - 1].name
                            } Wellness Score has now increased by 1%.`,
                            type: 'Success',
                            image: data?.image,
                            message2,
                        });
                },
                errorCallback: () => {
                    // const temp = { ...item };
                    // temp.is_completed = item?.is_completed;
                    // setItem(temp);
                },
                finallyCallback: () => {
                    setStatusLoading(false);
                    setShowModal(false);
                },
            },
        });
    };

    // const onDeletePress = () => {
    //     setDeleteLoading(true);
    //     dispatch({
    //         type: 'DELETE_SCHEDULE',
    //         payload: {
    //             data: {
    //                 activity_id: modalData?.id,
    //             },
    //             index: modalData?.index,
    //             callback: () => {
    //                 setShowModal(false);
    //                 setModalData({});
    //                 setDeleteLoading(false);
    //                 const temp = [...activityData];
    //                 temp.splice(modalData?.index, 1);
    //                 setActivityData(temp);
    //                 // goBack();
    //             },
    //             errorCallback: () => {
    //                 setShowModal(false);
    //                 setDeleteLoading(false);
    //             },
    //         },
    //     });
    // };

    const getData = (page) => {
        dispatch({
            type: 'GET_ALL_ACTIVITY_BT_DATE',
            payload: {
                data: {
                    date: dateFormatForServer(currDate),
                },
                page,
                callback: (data: any, next: boolean) => {
                    !next && setShouldNext(false);
                    if (page === 1) {
                        setActivityData(data);
                    } else {
                        setActivityData((prev) => [...prev, ...data]);
                    }
                    // setActivityData(data);
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
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

    const onItemUpdate = (item: any, index: number) => {
        const temp = [...activityData];
        temp[index] = { ...temp[index], ...item };
        setActivityData(temp);
    };

    const onMorePress = (item, index) => {
        const isSame = dayjs().isSame(dayjs(currDate), 'day');
        const isSamePrev = dayjs()
            .subtract(1, 'd')
            .isSame(dayjs(currDate), 'day');
        if (isSame || isSamePrev) {
            setShowModal(true);
            setModalData({ ...item, index });
        } else {
            showMessage({
                isVisible: true,
                message:
                    'You can only change the status of today and yesterday activity only',
                type: 'Error',
            });
        }
    };

    const onDatePress = () => {
        setShow(true);
    };

    const onDateChange = (date) => {
        setCurrDate(date);
        onCurrDateChange && onCurrDateChange(date);
    };

    useEffect(() => {
        setIsLoading(true);
        getData(1);
        setPage(1);
        setShouldNext(true);
    }, [currDate]);

    useEffect(() => {
        setPage(1);
        setShouldNext(true);
    }, [tabType]);

    const renderItem = ({
        item,
        index,
    }: {
        item: join_communityItemType;
        index: number;
    }) => (
        <PlanListBox
            wellnessId={item?.wellness_id}
            onItemAdd={onItemUpdate}
            item={item}
            isEdit={true}
            index={index}
            onRightPress={() => onMorePress(item, index)}
            activityDisabled={statusEnabled}
        />
    );

    return (
        <>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 0,
                    }}
                >
                    <DateController
                        disableDatePress={disableDatePress}
                        onAddDate={() => {
                            const date = dayjs(currDate).add(1, 'day');
                            setCurrDate(date);
                            onCurrDateChange && onCurrDateChange(date);
                        }}
                        onSubtractDate={() => {
                            // getMoodData();
                            const date = dayjs(currDate).subtract(1, 'day');
                            setCurrDate(date);
                            onCurrDateChange && onCurrDateChange(date);
                        }}
                        date={dayjs(currDate).format('dddd, DD MMM YYYY')}
                        isSameNext={isLoading}
                        isSamePrev={isLoading}
                        onDatePress={onDatePress}
                    />
                    {/* <DateController /> */}
                    <View
                        style={{
                            marginTop: Platform.OS === 'android' ? 20 : 0,
                        }}
                    >
                        <RequestShimmer
                            style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                            count={15}
                        />
                    </View>
                </View>
            ) : (
                <FlatList
                    onEndReached={onEndReached}
                    ListHeaderComponent={
                        <DateController
                            disableDatePress={disableDatePress}
                            onAddDate={() => {
                                const date = dayjs(currDate).add(1, 'day');
                                setCurrDate(date);
                                onCurrDateChange && onCurrDateChange(date);
                            }}
                            onSubtractDate={() => {
                                // getMoodData();
                                const date = dayjs(currDate).subtract(1, 'day');
                                setCurrDate(date);
                                onCurrDateChange && onCurrDateChange(date);
                            }}
                            date={dayjs(currDate).format('dddd, DD MMM YYYY')}
                            isSameNext={maxDate ?? isLoading}
                            isSamePrev={minDate ?? isLoading}
                            onDatePress={onDatePress}
                        />
                    }
                    refreshControl={
                        <RefreshControl
                            progressViewOffset={40}
                            refreshing={refreshLoading}
                            onRefresh={onRefresh}
                            tintColor={colors.regentBlue}
                            colors={[colors.regentBlue, colors.red]}
                            title='Pull to refresh'
                            titleColor={colors.regentBlue}
                        />
                    }
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                    // numColumns={2}
                    data={activityData}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        <EmptyPlaceholder text='No Data found' />
                    }
                    ListFooterComponent={
                        bottomLoading && (
                            <View style={{ alignItems: 'center' }}>
                                <RequestShimmer
                                    style={{
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                    }}
                                    count={10}
                                />
                            </View>
                        )
                    }
                />
            )}
            {showModal && (
                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={
                        modalData?.is_completed
                            ? 'Are you sure you want to revert?'
                            : 'Are you sure you want to mark the activity as complete?'
                    }
                    submitButtonText='Yes'
                    onPress={setStatus}
                    isLoading={statusLoading}
                />
                // <BottomModal
                //     date={modalData?.date}
                //     onClose={() => {
                //         setShowModal(false);
                //     }}
                //     style={{ paddingBottom: 100 }}
                //     isLoading={deleteLoading}
                //     show={showModal}
                //     onDeletePress={onDeletePress}
                //     edit={false}
                //     editText='Edit'
                //     deleteText='Delete'
                //     onEditPress={() => {
                //         navigate(WellnessRouteNames.ADD_PLAN, {
                //             wellness_id: modalData?.wellness_id,
                //             name: modalData?.name,
                //             description: modalData?.description,
                //             isAdmin: modalData?.is_admin,
                //             activity_id: modalData?.id,
                //             onItemAdd: onItemUpdate,
                //             isEdit: true,
                //             index: modalData.index,
                //             heading: modalData?.name,
                //             modalDescription: modalData?.description,
                //             dayData: modalData?.day,
                //         });
                //         setShowModal(false);
                //     }}
                // />
            )}
            <DateAndTimePicker
                minDate={calMinDate ?? undefined}
                maxDate={new Date()}
                show={show}
                value={new Date(currDate)}
                onChange={onDateChange}
                onClose={setShow}
                mode='date'
                style={{ paddingBottom: 100 }}
                // mode=''
            />
        </>
    );
};

export default ListView;
