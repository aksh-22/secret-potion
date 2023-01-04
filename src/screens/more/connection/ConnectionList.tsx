import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    Pressable,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Request from 'src/assets/svg/requestRemove.svg';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import RequestShimmer from 'src/components/shimmers/RequestShimmer';
import { connectionsItemType } from 'typings/connectionType';
import ConfirmationModal from 'src/components/ConfirmationModal';

import styles from './Connection.style';
import { useDispatch } from 'react-redux';
import colors from 'src/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackName } from 'src/constants/routeName';
import MessageIcon from 'src/assets/svg/message.svg';
import { useAppSelector } from 'src/hooks/reducer';
import firebaseRoomId from 'src/utils/firebaseRoomId';
import { fonts } from 'src/constants/fonts';

type Props = {
    connection: connectionsItemType[];
    isLoading?: boolean;
    onEndReached?: () => void;
    onDelete?: (index: number) => void;
    onRefresh?: () => void;
};

type SProps = {
    id?: number;
    index?: number;
    firebaseId?: string;
};

const ConnectionList = ({
    connection,
    isLoading,
    onEndReached,
    onDelete,
    onRefresh,
}: Props) => {
    const [show, setShow] = useState(false);

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    const user_db_id = useAppSelector((state) => state?.userReducer?.user?.id);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const [selectedUser, setSelectedUser] = useState<SProps>({});

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const dispatch = useDispatch();

    const onDeletePress = () => {
        setIsDeleteLoading(true);
        dispatch({
            type: 'REMOVE_FRIEND',
            payload: {
                data: {
                    user_id: selectedUser?.id,
                    channel_id: firebaseRoomId(
                        user_id,
                        selectedUser?.firebaseId
                    ),
                },
                callback: () => {
                    setIsDeleteLoading(false);
                    setShow(false);
                    onDelete(selectedUser?.index);
                },
                errorCallback: () => {
                    setIsDeleteLoading(false);
                },
            },
        });
        // onDelete(index);
    };

    const { t } = useTranslation();

    const renderItem = ({
        item,
        index,
    }: {
        item: connectionsItemType;
        index: number;
    }) => {
        return (
            <Pressable
                onPress={() => {
                    navigate(RootStackName.OTHER_PROFILE, {
                        id: item?.user_info?.id,
                        onDelete: () => onDelete(index),
                    });
                }}
                style={styles.container}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                    }}
                >
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                        resizeMode='cover'
                        source={{ uri: item?.user_info?.profile_image }}
                    />
                    <Text style={styles.text}>{item?.user_info?.name}</Text>
                </View>
                <Pressable
                    hitSlop={30}
                    onPress={
                        () =>
                            navigate(RootStackName.CHAT_SCREEN, {
                                is_newChat: true,
                                name: item?.user_info?.name,
                                image: item?.user_info?.profile_image,
                                myId: user_id,
                                myDbId: user_db_id,
                                otherUserID: item?.user_info?.firebase_id,
                                otherUserDbID: item?.user_info?.id,
                                channelId: firebaseRoomId(
                                    user_id,
                                    item?.user_info?.firebase_id
                                ),
                                playerId: item?.playerId,
                            })
                        //   showMessage({
                        //     isVisible: true,
                        //     message: "Coming soon",
                        //     type: "Info",
                        //   })
                    }
                    style={{ marginRight: 15 }}
                >
                    <MessageIcon height={20} width={20} />
                </Pressable>
                <View
                // onPress={() => RowMap}
                >
                    <Request />
                </View>
            </Pressable>
        );
    };

    return (
        <>
            <SwipeListView
                disableRightSwipe
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 100,
                    paddingTop: 20,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                        tintColor={colors.regentBlue}
                        colors={[colors.regentBlue, colors.red]}
                        title='Pull to refresh'
                        titleColor={colors.regentBlue}
                    />
                }
                onEndReached={onEndReached}
                data={connection}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text
                        style={{
                            fontFamily: fonts.regular,
                            color: colors.defaultBlack,
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                    >
                        Swipe left to remove user
                    </Text>
                }
                renderHiddenItem={(data, rowMap) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setShow(true);
                                setSelectedUser({
                                    id: data?.item?.user_info?.id,
                                    index: data?.index,
                                    firebaseId:
                                        data?.item?.user_info?.firebase_id,
                                });
                            }}
                            style={styles.delete}
                        >
                            <Text style={styles.removeText}>
                                {t('settings:remove')}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                ListFooterComponent={
                    isLoading ? <RequestShimmer count={5} /> : null
                }
                ListEmptyComponent={
                    isLoading ? (
                        <RequestShimmer count={20} />
                    ) : (
                        <EmptyPlaceholder
                            textStyle={{ fontSize: 20 }}
                            size={100}
                            text='No connections found'
                        />
                    )
                }
                rightOpenValue={-75}
            />
            <ConfirmationModal
                title='Do you want to remove this user?'
                // heading='Attention!'
                submitButtonText='Remove'
                onClose={() => setShow(false)}
                onPress={onDeletePress}
                isOpen={show}
                isLoading={isDeleteLoading}
            />
        </>
    );
};

export default memo(ConnectionList);
