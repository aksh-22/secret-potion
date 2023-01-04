import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Right from 'src/assets/svg/right.svg';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import firebaseRoomId from 'src/utils/firebaseRoomId';
import { receiveItemType } from 'typings/requestType';
import styles from './Connection.style';

type Props = {
    item: receiveItemType;
    index: number;
    onAccept?: (index: number, data: any) => void;
    onDecline?: (index: number) => void;
};

const ReceiveRequestBox = ({ item, index, onAccept, onDecline }: Props) => {
    const [requestLoading, setRequestLoading] = useState(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useDispatch();

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    const requestAccept = () => {
        setRequestLoading(true);
        dispatch({
            type: 'ACCEPT_REQUEST',
            payload: {
                shouldUpdateStorage: true,
                data: {
                    id: item?.user_info?.id,
                    channel_id: firebaseRoomId(
                        user_id,
                        item?.user_info?.firebase_id
                    ),
                },
                callback: (data) => {
                    setRequestLoading(false);
                    showMessage({
                        isVisible: true,
                        message: 'Request accepted successfully',
                        type: 'Success',
                    });
                    onAccept(index, data);
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    const requestDecline = () => {
        setRequestLoading(true);
        dispatch({
            type: 'DECLINE_REQUEST',
            payload: {
                data: {
                    id: item?.user_info?.id,
                },
                callback: () => {
                    setRequestLoading(false);
                    onDecline(index);
                    showMessage({
                        isVisible: true,
                        message: 'Request Declined successfully',
                        type: 'Success',
                    });
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    return (
        <Pressable
            onPress={() => {
                navigate(RootStackName.OTHER_PROFILE, {
                    id: item?.user_info?.id,
                });
            }}
            style={styles.container}
        >
            <View
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
                <Image
                    style={{ width: 40, height: 40, borderRadius: 100 }}
                    resizeMode='cover'
                    source={{ uri: item?.user_info?.profile_image }}
                />
                <Text numberOfLines={1} style={styles.text}>
                    {item?.user_info?.name}
                </Text>
            </View>
            {requestLoading ? (
                <ActivityIndicator color={colors.regentBlue} size='large' />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={requestAccept}
                        style={styles.iconCircle}
                        // onPress={() => RowMap}
                    >
                        <Right fill={colors.regentBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={requestDecline}
                        style={[
                            styles.iconCircle,
                            { borderColor: colors.lightBlack2 },
                        ]}
                        // onPress={() => RowMap}
                    >
                        <Ionicons
                            name='close'
                            color={colors.lightBlack2}
                            size={20}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </Pressable>
    );
};

export default ReceiveRequestBox;
