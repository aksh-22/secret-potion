import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import DiaryShimmer from 'src/components/shimmers/DiaryShimmer';
import TabSelector from 'src/components/TabSelector';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';
import { join_communityItemType } from 'typings/activityType';
import PlanBox from './PlanBox';

type Props = {
    initialTab?: any;
    tabType?: boolean;
    onDelete?: (index: number, item: any) => void;
};

const GridView = ({ initialTab, tabType, onDelete }: Props) => {
    const wellnessTypes = useAppSelector(
        (state) => state?.wellnessReducer?.wellnessTypes
    );

    const [activityData, setActivityData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [refreshLoading, setRefreshLoading] = useState(false);

    const [shouldNext, setShouldNext] = useState(true);

    const [page, setPage] = useState(1);

    const [bottomLoading, setBottomLoading] = useState(false);

    const [selectedTab, setSelectedTab] = useState(
        initialTab ?? {
            name: 'All',
            key: 0,
            color: colors.regentBlue,
            backgroundColor: colors.regentBlueOpacity,
        }
    );

    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useDispatch();

    const onDeletePress = () => {
        setDeleteLoading(true);
        dispatch({
            type: 'DELETE_SCHEDULE',
            payload: {
                data: {
                    activity_id: modalData?.id,
                },
                index: modalData?.index,
                callback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                    setModalData({});
                    const temp = [...activityData];
                    temp.splice(modalData?.index, 1);
                    setActivityData(temp);
                    onDelete &&
                        onDelete(modalData?.index, temp[modalData?.index]);
                    setBottomLoading(false);
                    // goBack();
                },
                errorCallback: () => {
                    setShowModal(false);
                    setDeleteLoading(false);
                    setBottomLoading(false);
                },
            },
        });
    };

    const onEndReached = () => {
        if (shouldNext && !bottomLoading) {
            setBottomLoading(true);
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        setPage(1);
        setShouldNext(true);
    }, [tabType]);

    const getData = (page) => {
        dispatch({
            type: 'GET_ALL_ACTIVITY',
            payload: {
                page,
                data: {
                    wellness_id:
                        selectedTab.key !== 0 ? selectedTab?.key : undefined,
                },
                callback: (data, next: boolean) => {
                    !next && setShouldNext(false);
                    if (page === 1) {
                        setActivityData(data);
                    } else {
                        setActivityData((prev) => [...prev, ...data]);
                    }
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
        temp[index] = item;
        setActivityData(temp);
    };

    const onMorePress = (item, index) => {
        setShowModal(true);
        setModalData({ ...item, index });
    };

    useEffect(() => {
        setIsLoading(true);
        getData(1);
        setPage(1);
        setShouldNext(true);
    }, [selectedTab]);

    const renderItem = ({
        item,
        index,
    }: {
        item: join_communityItemType;
        index: number;
    }) => (
        <PlanBox
            wellnessId={selectedTab?.key}
            onItemAdd={onItemUpdate}
            style={{ width: SCREEN_WIDTH * 0.43 }}
            item={item}
            isEdit={true}
            index={index}
            onDeletePress={() => onMorePress(item, index)}
            // disabledBox
        />
    );

    return (
        <>
            <View
                style={{
                    paddingTop: 10,
                    backgroundColor: colors.defaultWhite,
                }}
            >
                <TabSelector
                    activeTab={selectedTab.key}
                    onChange={(item) => setSelectedTab(item)}
                    tabs={[
                        {
                            name: 'All',
                            key: 0,
                            color: colors.regentBlue,
                            backgroundColor: colors.regentBlueOpacity,
                        },
                        ...wellnessTypes,
                    ]}
                    tabStyle={{
                        paddingHorizontal: 30,
                        paddingTop: 10,
                        minWidth: 130,
                    }}
                />
            </View>
            {isLoading ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 0,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 29,
                            lineHeight: 35,
                            textAlign: 'center',
                            fontFamily: fonts.regular,
                            paddingVertical: 25,
                            // paddingHorizontal: 10,
                        }}
                    >
                        Your Activities
                    </Text>
                    <DiaryShimmer
                        count={20}
                        numColumns={2}
                        style={{
                            width: SCREEN_WIDTH * 0.43,
                            height: 150,
                            borderRadius: 10,
                        }}
                    />
                </View>
            ) : (
                <FlatList
                    onEndReached={onEndReached}
                    ListHeaderComponent={
                        <Text
                            style={{
                                fontSize: 29,
                                lineHeight: 35,
                                textAlign: 'center',
                                fontFamily: fonts.regular,
                                paddingVertical: 25,
                                paddingLeft: 20,
                            }}
                        >
                            Your Activities
                        </Text>
                    }
                    contentContainerStyle={{
                        paddingRight: 20,
                        paddingBottom: 100,
                    }}
                    // style={{ paddingTop: 20 }}
                    numColumns={2}
                    data={activityData}
                    renderItem={renderItem}
                    ListFooterComponent={
                        bottomLoading && (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                }}
                            >
                                <DiaryShimmer
                                    count={10}
                                    numColumns={2}
                                    style={{
                                        width: SCREEN_WIDTH * 0.43,
                                        height: 150,
                                        borderRadius: 10,
                                    }}
                                />
                            </View>
                        )
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
                    ListEmptyComponent={
                        <EmptyPlaceholder text='No Data found' />
                    }
                />
            )}
            {showModal && (
                <ConfirmationModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title='Are you sure you want to delete this activity? This action will remove this activity permanently from your schedule.'
                    submitButtonText='Yes'
                    submitButtonIcon={
                        <IoniconsIcon
                            name='ios-settings'
                            color={colors.defaultWhite}
                        />
                    }
                    onPress={onDeletePress}
                    isLoading={deleteLoading}
                    // Linking.openSettings().then((res) => setOpenConfirmationModal(false))
                />
            )}
        </>
    );
};

export default GridView;
