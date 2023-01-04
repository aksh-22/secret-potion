import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import NotificationBadge from 'src/assets/svg/notificationBadge.svg';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import CustomButton from 'src/components/customButton/CustomButton';
import GrayText from 'src/components/GrayText';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { CommunityRouteNames } from 'src/constants/routeName';
import { useAppDispatch } from 'src/hooks/reducer';
import {
    addPostCount,
    reducePostCount,
} from 'src/redux/reducer/communityReducer';
import { communityItemType } from 'typings/communityItemType';
import styles from './Community.style';

type Props = {
    item?: communityItemType;
};

const CommunityBox = ({ item }: Props) => {
    const [statusIsLoading, setStatusIsLoading] = useState(false);
    const [btn, setBtn] = useState(item?.is_join);

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    const dispatch = useDispatch();

    const appDispatch = useAppDispatch();

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const onConfirm = () => {
        setOpenConfirmationModal(false);
        onStatusChange();
    };

    const onStatusChange = () => {
        setStatusIsLoading(true);

        dispatch({
            type: 'STATUS_CHANGE',
            payload: {
                data: {
                    community_type_id: item?.id,
                },
                callback: (data) => {
                    setBtn((prev) => !prev);
                    setStatusIsLoading(false);
                    // !joined && EventRegister.emit('communityReload');
                    !data?.status
                        ? appDispatch(reducePostCount(item?.today_post))
                        : appDispatch(addPostCount(data?.today_post));

                    data?.status &&
                        navigate(CommunityRouteNames.COMMUNITY_PAGE, { item });
                },
                errorCallback: () => {
                    setStatusIsLoading(false);
                },
            },
        });
    };
    return (
        <>
            <Pressable
                onPress={() =>
                    navigate(CommunityRouteNames.COMMUNITY_PAGE, { item })
                }
                disabled={!btn || statusIsLoading}
                style={{ width: (SCREEN_WIDTH - 40) * 0.5, marginBottom: 25 }}
            >
                <View style={styles.box}>
                    {btn && item?.today_post ? (
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                zIndex: 1,
                                // height: 17,
                                // width: 17,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // left: 0,
                            }}
                        >
                            <NotificationBadge
                                height={25}
                                width={25}
                                style={{ position: 'absolute' }}
                            />
                            <Text
                                style={{
                                    fontSize:
                                        item?.today_post > 999
                                            ? 6
                                            : item?.today_post > 99
                                            ? 8
                                            : 12,
                                    color: colors.defaultWhite,
                                }}
                            >
                                {item?.today_post}
                            </Text>
                        </View>
                    ) : null}
                    <Text numberOfLines={1} style={styles.boxHeading}>
                        {item?.name}
                    </Text>
                    <GrayText numberOfLines={6} style={styles.boxDescription}>
                        {item?.description}
                    </GrayText>
                </View>
                <CustomButton
                    isLoading={statusIsLoading}
                    btnType={!btn ? 'normal' : 'delete'}
                    onPress={() => {
                        btn ? setOpenConfirmationModal(true) : onStatusChange();
                    }}
                    style={{
                        height: 45,
                        width: 78,
                        marginTop: -25,
                        alignSelf: 'center',
                    }}
                    title={btn ? 'Leave' : 'Join'}
                />
            </Pressable>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                // heading='Attention!'
                title='Do you want to leave?'
                submitButtonText='Yes'
                submitButtonIcon={
                    <IoniconsIcon
                        name='ios-settings'
                        color={colors.defaultWhite}
                    />
                }
                onPress={onConfirm}
                isLoading={statusIsLoading}
                // Linking.openSettings().then((res) => setOpenConfirmationModal(false))
            />
        </>
    );
};

export default CommunityBox;
