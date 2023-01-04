import React, { useEffect, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import TabSelector from 'src/components/TabSelector';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import DiaryShimmer from 'src/components/shimmers/DiaryShimmer';
import Shimmer from 'src/components/shimmers/Shimmer';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { WellnessRouteNames } from 'src/constants/routeName';
import {
    useAppDispatch,
    useAppSelector,
    useAppSelector1,
} from 'src/hooks/reducer';
import { updateUser } from 'src/redux/reducer/userReducer';
import { activityType } from 'typings/activityType';
import styles from './Plan.style';
import PlanBox from './PlanBox';
import PlanModal from './PlanModal';

type Props = {};

const CreatePlan = (props: Props) => {
    const wellnessTypes = useAppSelector(
        (state) => state?.wellnessReducer?.wellnessTypes
    );
    const [selectedTab, setSelectedTab] = useState(wellnessTypes[0]);
    const [show, setShow] = useState(false);
    const [joinData, setJoinData] = useState([]);
    const [notJoinData, setNotJoinData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [bottomLoading, setBottomLoading] = useState(false);
    const [shouldNext, setShouldNext] = useState(true);
    const [page, setPage] = useState(1);
    const [init, setInit] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [modalData, setModalData] = useState<any>({});

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const {
        userReducer: { user },
    } = useAppSelector1();

    const dispatch = useDispatch();
    const dispatch2 = useAppDispatch();

    useEffect(() => {
        // !user?.is_plan_created && init && setShow(true);
        setIsLoading(true);
        getData(1);
        setPage(1);
        setInit(false);
    }, [selectedTab]);

    const onRefresh = () => {
        setShouldNext(true);
        setRefreshLoading(true);
        setPage(1);
        getData(1);
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
                    const temp = [...joinData];
                    const deleted = temp.splice(modalData?.index, 1);
                    setJoinData(temp);
                    const temp2 = [...notJoinData];
                    temp2.unshift(deleted[0]);
                    setNotJoinData(temp2);
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

    const getData = (page) => {
        dispatch({
            type: 'WELLNESS_ACTIVITY',
            payload: {
                page,
                data: { wellness_id: selectedTab?.key },
                callback: (data: activityType, next: boolean) => {
                    !next && setShouldNext(false);
                    if (page === 1) {
                        setJoinData(data?.join_community);
                        setNotJoinData(data?.not_join);
                    } else {
                        setNotJoinData((prev) => [...prev, ...data?.not_join]);
                    }
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
                    !user?.is_plan_created && init && setShow(true);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setBottomLoading(false);
                },
            },
        });
    };

    const onItemAdd = (item: any, index: number) => {
        setJoinData((prev) => [item, ...prev]);
        // if (item?.is_admin){
        const temp2 = [...notJoinData];
        temp2.splice(index - 1, 1);
        setNotJoinData(temp2);
        // }
        if (!user?.is_plan_created) {
            let temp = { ...user };
            temp.is_plan_created = true;
            dispatch2(updateUser(temp));
        }
    };

    const onItemUpdate = (item: any, index: number) => {
        const temp = [...joinData];
        temp[index] = item;
        setJoinData(temp);
    };

    const onItemDelete = (index, item) => {
        onRefresh();
        // const temp = [...joinData];
        // temp.splice(index, 1);
        // temp[index] = item;
        // setJoinData(temp);
    };

    const onMorePress = (item, index) => {
        setShowModal(true);
        setModalData({ ...item, index });
    };

    const renderItem = ({ item, index }) => (
        <PlanBox
            wellnessId={selectedTab?.key}
            onItemAdd={(item) => onItemAdd(item, index)}
            item={item}
            isEdit={false}
            text='Schedule'
            showDays={false}
        />
    );
    const renderItem2 = ({ item, index }) => (
        <PlanBox
            wellnessId={selectedTab?.key}
            onItemAdd={onItemUpdate}
            style={{ width: SCREEN_WIDTH * 0.43, flex: undefined }}
            item={item}
            isEdit={true}
            index={index}
            onDeletePress={() => onMorePress(item, index)}
        />
    );

    return (
        <>
            <ContainerTabWithoutScroll isBack>
                <View
                    style={{
                        paddingTop: 10,
                        backgroundColor: colors.defaultWhite,
                    }}
                >
                    <TabSelector
                        activeTab={selectedTab.key - 1}
                        onChange={(item) => setSelectedTab(item)}
                        tabs={wellnessTypes}
                        tabStyle={{
                            paddingHorizontal: 30,
                            paddingTop: 10,
                            opacity: 1,
                        }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    {isLoading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 20,
                            }}
                        >
                            <Shimmer
                                style={[
                                    {
                                        width: SCREEN_WIDTH - 40,
                                        height: 130,
                                        margin: 5,
                                        borderRadius: 10,
                                        marginBottom: 20,
                                        marginTop: 40,
                                    },
                                ]}
                            />
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
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                onRefresh && (
                                    <RefreshControl
                                        progressViewOffset={40}
                                        refreshing={refreshLoading}
                                        onRefresh={onRefresh}
                                        tintColor={colors.regentBlue}
                                        colors={[colors.regentBlue, colors.red]}
                                        title='Pull to refresh'
                                        titleColor={colors.regentBlue}
                                    />
                                )
                            }
                            onEndReached={onEndReached}
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
                            ListHeaderComponent={
                                joinData.length ? (
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    styles.boxHeading,
                                                    {
                                                        marginTop: 20,
                                                        marginLeft: 20,
                                                    },
                                                ]}
                                            >
                                                Your Activity
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigate(
                                                        WellnessRouteNames.MY_PLAN,
                                                        {
                                                            initialTab:
                                                                selectedTab,
                                                            onItemDelete,
                                                        }
                                                    );
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.boxHeading,
                                                        {
                                                            marginTop: 20,
                                                            marginLeft: 20,
                                                            color: colors.regentBlue,
                                                        },
                                                    ]}
                                                >
                                                    View All
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <FlatList
                                            horizontal
                                            data={joinData}
                                            renderItem={renderItem2}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            contentContainerStyle={{
                                                marginRight: -20,
                                            }}
                                            style={{
                                                // marginHorizontal: -20,
                                                marginRight: -20,
                                            }}
                                        />
                                        <Text
                                            style={[
                                                styles.boxHeading,
                                                {
                                                    marginTop: 20,
                                                    marginLeft: 20,
                                                },
                                            ]}
                                        >
                                            Add Activity
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        <View>
                                            <Text
                                                style={[
                                                    styles.boxHeading,
                                                    {
                                                        marginTop: 20,
                                                        marginLeft: 20,
                                                    },
                                                ]}
                                            >
                                                Your Activity
                                            </Text>
                                            <View style={styles.box}>
                                                <Text
                                                    style={styles.boxInnerText}
                                                >
                                                    You don’t have any activity
                                                    added yet.
                                                </Text>
                                            </View>
                                        </View>
                                        <Text
                                            style={[
                                                styles.boxHeading,
                                                {
                                                    marginTop: 20,
                                                    marginLeft: 20,
                                                },
                                            ]}
                                        >
                                            Add Activity
                                        </Text>
                                    </>
                                )
                            }
                            contentContainerStyle={{
                                paddingRight: 20,
                                paddingBottom: 100,
                            }}
                            style={{ paddingTop: 20 }}
                            numColumns={2}
                            data={
                                notJoinData.length
                                    ? [
                                          {
                                              type: 'add',
                                              background: [
                                                  '#BFE3F6',
                                                  '#DAEFFA',
                                              ],
                                              wellness_id: selectedTab?.key,
                                              user_type: 'user',
                                          },
                                          ...notJoinData,
                                      ]
                                    : [
                                          {
                                              type: 'add',
                                              background: [
                                                  '#BFE3F6',
                                                  '#DAEFFA',
                                              ],
                                              wellness_id: selectedTab?.key,
                                              user_type: 'user',
                                          },
                                      ]
                            }
                            renderItem={renderItem}
                        />
                    )}
                </View>
            </ContainerTabWithoutScroll>
            <PlanModal
                heading='Create Wellness Plan'
                description='Please select and schedule as many activities as you wish to add to your plan. These are simple habit building activities that will help build your Wellness.'
                description2="If you don't find what you like, you can add your own activity."
                show={show}
                onClose={() => {
                    setInit(false);
                    setShow(false);
                }}
            />
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

export default CreatePlan;
