import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    BackHandler,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import BlockUserModal from 'src/components/BlockUserModal';
import ConfirmationModal from 'src/components/ConfirmationModal';
import ContainerTab from 'src/components/container/ContainerTab';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomModal from 'src/components/CustomModal';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { ScreenProps } from 'src/routes/types/navigation';
import firebaseRoomId from 'src/utils/firebaseRoomId';
import styles from './Profile.style';

type TData = {
    name: string;
    dob: string;
    profile_image: string;
    gender: string;
    country: string;
    id: string;
    is_friend: boolean;
    send_req: boolean;
    receive_req: boolean;
    bio?: string;
    index: number;
    post_id: number;
};

const OtherProfile = ({ route, navigation }: ScreenProps) => {
    const { navigate, goBack, replace, canGoBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    const id: number = route?.params?.id;
    const post_id: number = route?.params?.post_id;
    const index: number = route?.params?.index;
    const type: number = route?.params?.type;
    const onDelete: any = route?.params?.onDelete;

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshLoading, setIsRefreshLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);

    const [userData, setUserData] = useState<any>({});

    const [show, setShow] = useState(false);

    const [showRemoveUser, setShowRemoveUser] = useState(false);

    const [isFriend, setIsFriend] = useState<boolean>();

    const [sendRequest, setSendRequest] = useState<boolean>();

    const [receiveRequest, setReceiveRequest] = useState<boolean>();

    const [showBlockModal, setShowBlockModal] = useState(false);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        setIsDataLoading(true);
        getData();
    }, []);

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

    const getData = () => {
        dispatch({
            type: 'GET_OTHER_PROFILE',
            payload: {
                data: {
                    id: id,
                },
                callback: (data1) => {
                    setUserData(data1);
                    setIsDataLoading(false);
                    setIsFriend(data1?.is_friend);
                    setSendRequest(data1?.send_req);
                    setReceiveRequest(data1?.receive_req);
                    setIsRefreshLoading(false);
                },
                errorCallback: () => {
                    setIsDataLoading(false);
                    setIsRefreshLoading(false);
                    goBack();
                },
            },
        });
    };

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onReportUserPress = () => {
        if (userData.is_report) {
            showMessage({
                isVisible: true,
                message: 'Already Reported!',
                message2:
                    'We have received your request to report this user. Please allow us some time to review and take the necessary action. Our team will get in touch with you if required.',
                type: 'Info',
            });
        } else {
            // onBlockModalOpen();
            const data = {
                id: userData?.id,
                userReported,
            };
            navigation.navigate(RootStackName.REPORT_USER, data);
        }
    };

    const onBlockModalClose = () => {
        setShowBlockModal(false);
    };

    const userReported = () => {
        setUserData((prev) => ({ ...prev, is_report: true }));
    };

    const onBlockModalOpen = () => {
        setShowBlockModal(true);
    };

    const onBtnPress = () => {
        // is friend
        // send req
        // receive req
        setIsLoading(true);
        if (sendRequest) {
            requestCancel();
        } else if (receiveRequest) {
            requestAccept();
        } else if (!isFriend) {
            requestSent();
        }
    };

    const requestAccept = () => {
        dispatch({
            type: 'ACCEPT_REQUEST',
            payload: {
                index: index,
                shouldUpdateStorage: !!post_id,
                data: {
                    id: id,
                    post_id: post_id ?? undefined,
                    channel_id: firebaseRoomId(user_id, userData?.firebase_id),
                    type,
                },
                callback: () => {
                    setIsLoading(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request accepted successfully',
                        type: 'Success',
                    });
                    setIsFriend(true);
                    setSendRequest(false);
                    setReceiveRequest(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const requestSent = () => {
        dispatch({
            type: 'SEND_REQUEST',
            payload: {
                index: index,
                shouldUpdateStorage: !!post_id,
                data: {
                    id: id,
                    post_id: post_id ?? undefined,
                    type,
                },
                callback: () => {
                    setIsLoading(false);
                    setIsFriend(false);
                    setSendRequest(true);
                    setReceiveRequest(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request sent successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const requestCancel = () => {
        dispatch({
            type: 'CANCEL_REQUEST',
            payload: {
                index: index,
                shouldUpdateStorage: !!post_id,
                data: {
                    id: id,
                    post_id: post_id ?? undefined,
                    type,
                },
                callback: () => {
                    setIsLoading(false);
                    setIsFriend(false);
                    setSendRequest(false);
                    setReceiveRequest(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request cancelled successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const onDeletePress = () => {
        console.log('user_id', user_id);
        console.log('userData', JSON.stringify(userData, null, 2));
        console.log(
            'firebaseRoomId(user_id, userData?.firebaseId)',
            firebaseRoomId(user_id, userData?.firebaseId)
        );
        setIsDeleteLoading(true);
        dispatch({
            type: 'REMOVE_FRIEND',
            payload: {
                data: {
                    user_id: userData?.id,
                    channel_id: firebaseRoomId(user_id, userData?.firebase_id),
                },
                callback: () => {
                    setIsDeleteLoading(false);
                    setShowRemoveUser(false);
                    onDelete && onDelete(userData?.index);
                    goBack();
                },
                errorCallback: () => {
                    setIsDeleteLoading(false);
                },
            },
        });
        // onDelete(index);
    };

    return !isDataLoading ? (
        <>
            <ContainerTab
                bounces
                message={false}
                bell={false}
                refreshLoading={isRefreshLoading}
                onRefresh={() => {
                    setIsRefreshLoading(true);
                    getData();
                }}
                isBack
                backBtnPress={() => {
                    if (!navigation.canGoBack()) {
                        replace(RootStackName.NOTIFICATION);
                    } else {
                        goBack();
                    }
                }}
                contentContainerStyle2={{ paddingBottom: 0 }}
                contentContainerStyle={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 0,
                    backgroundColor: colors.defaultWhite,
                }}
                StatusBarStyle='light-content'
                statusBarColor={colors.profile1}
                headerStyle={{ backgroundColor: colors.profile1 }}
                backIconColor={colors.defaultWhite}
                safeAreaStyle={{
                    height:
                        Platform.OS === 'android'
                            ? SCREEN_HEIGHT - 40
                            : SCREEN_HEIGHT + 40,
                    flex: Platform.OS === 'android' && 1,
                }}
            >
                <>
                    <LinearGradient
                        colors={[colors.profile1, colors.profile2]}
                        style={styles.topContainer}
                    >
                        <Image
                            source={{ uri: userData?.profile_image }}
                            style={styles.imageStyle}
                        />
                        <Text
                            style={styles.name}
                        >{`${userData?.fname} ${userData?.lname}`}</Text>
                        {/* !---------------------- Bottom box --------------------------! */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 20,
                                marginTop: 20,
                            }}
                        >
                            <View style={styles.box2}>
                                <Text style={styles.boxText}>
                                    {t('settings:age')}{' '}
                                    {userData?.dob && userData?.dob !== null
                                        ? dayjs().diff(userData?.dob, 'year')
                                        : '---'}
                                </Text>
                            </View>
                            <View style={styles.box2}>
                                <Text style={styles.boxText}>
                                    {userData?.gender &&
                                    userData?.gender !== null
                                        ? userData?.gender === 'not_defined'
                                            ? 'Other'
                                            : userData?.gender
                                        : 'Gender ---'}
                                </Text>
                            </View>
                            <View style={styles.box2}>
                                <Text
                                    style={[
                                        styles.boxText,
                                        {
                                            fontSize:
                                                userData?.country?.trim()
                                                    .length > 10
                                                    ? userData?.country?.trim()
                                                          .length > 15
                                                        ? 8
                                                        : 10
                                                    : 12,
                                        },
                                    ]}
                                >
                                    {userData?.country &&
                                    userData?.country !== null
                                        ? userData?.country
                                        : 'Country ---'}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 1, backgroundColor: colors.profile2 }}>
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
                                {userData?.bio && userData?.bio !== null ? (
                                    <Text style={styles.bioText}>
                                        {userData?.bio}
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            styles.bioText,
                                            { opacity: 0.5 },
                                        ]}
                                    >
                                        No bio available.
                                    </Text>
                                )}
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <CustomButton
                                    disabled={isFriend}
                                    onPress={onBtnPress}
                                    style={{
                                        width: 180,
                                        marginTop: 50,
                                    }}
                                    title={
                                        isFriend
                                            ? 'You are now friends'
                                            : sendRequest
                                            ? 'Cancel Now'
                                            : receiveRequest
                                            ? 'Accept now'
                                            : 'Connect Now'
                                    }
                                    isLoading={isLoading}
                                />
                                <CustomButton
                                    onPress={onReportUserPress}
                                    style={{
                                        marginTop: 20,
                                        width: 180,
                                    }}
                                    btnType='delete'
                                    title='Report User'
                                />
                                <CustomButton
                                    onPress={() => {
                                        setShowRemoveUser(true);
                                    }}
                                    style={{
                                        marginTop: 20,
                                        width: 180,
                                    }}
                                    btnType='delete'
                                    title='Remove / Block user'
                                />
                                <Image
                                    style={{
                                        width: SCREEN_WIDTH,
                                        height: SCREEN_HEIGHT * 0.5,
                                        bottom: 0,
                                        zIndex: -1,
                                    }}
                                    resizeMode='contain'
                                    source={require('src/assets/images/otherProfile.png')}
                                />
                            </View>
                        </View>
                    </View>
                </>
                <CustomModal
                    childrenStyle={{ justifyContent: 'center' }}
                    // childrenViewStyle={{ flex: 0.4 }}
                    onClose={() => setShow(false)}
                    isOpen={show}
                >
                    <View
                        style={{
                            backgroundColor: colors.defaultWhite,
                            padding: 20,
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setShow(false)}
                            style={styles.iconWrapper}
                        >
                            <Ionicons
                                name='close'
                                size={20}
                                color={colors.defaultWhite}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>
                            {t('wellness:overall')}
                        </Text>
                        <Text style={styles.description}>
                            {userData?.country}
                        </Text>
                    </View>
                </CustomModal>
            </ContainerTab>
            <BlockUserModal
                id={userData?.id}
                show={showBlockModal}
                onClose={onBlockModalClose}
                onSuccess={() => {
                    setUserData((prev) => ({ ...prev, is_report: true }));
                }}
            />
            <ConfirmationModal
                title='By doing so, the user will be removed from the connection and blocked from sending any more messages.'
                heading='Do you want to remove this user?'
                // heading='Attention!'
                submitButtonText='Remove'
                onClose={() => setShowRemoveUser(false)}
                onPress={onDeletePress}
                isOpen={showRemoveUser}
                isLoading={isDeleteLoading}
                headingStyle={{ textAlign: 'center' }}
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

export default OtherProfile;
