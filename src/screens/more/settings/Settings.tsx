import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from 'src/constants/colors';
import styles from './Settings.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Password from 'src/assets/svg/password.svg';
import Notification from 'src/assets/svg/notification.svg';
import DeleteUser from 'src/assets/svg/deleteUser.svg';
import { MoreRouteNames, RootStackName } from 'src/constants/routeName';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import { useDispatch } from 'react-redux';

type Props = {};

const Settings = (props: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const onConfirm = () => {
        setIsLoading(true);
        dispatch({
            type: 'DELETE_USER',
            payload: {
                callback: () => {
                    setIsLoading(false);
                    setOpenConfirmationModal(false);
                },
            },
        });
    };

    return (
        <>
            <ContainerTabWithoutScroll isBack>
                <View
                    style={{
                        padding: 20,
                        flex: 1,
                        backgroundColor: colors.defaultWhite,
                    }}
                >
                    <TouchableOpacity
                        onPress={() =>
                            navigate(MoreRouteNames.NOTIFICATION_SETTINGS)
                        }
                        style={styles.mainRow}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconWrapper}>
                                <Notification />
                            </View>
                            <Text style={styles.text}>
                                Notification Settings
                            </Text>
                        </View>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color={colors.lightBlack2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate(RootStackName.PASSWORD)}
                        style={styles.mainRow}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconWrapper}>
                                <Password />
                            </View>
                            <Text style={styles.text}>Password Settings</Text>
                        </View>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color={colors.lightBlack2}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setOpenConfirmationModal(true)}
                        style={styles.mainRow}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconWrapper}>
                                {/* <DeleteUser /> */}
                                <Ionicons
                                    name='trash-outline'
                                    size={20}
                                    color={colors.red}
                                    style={{ marginTop: -3, marginLeft: 2 }}
                                />
                            </View>
                            <Text style={[styles.text, { color: colors.red }]}>
                                Delete account
                            </Text>
                        </View>
                        <Ionicons
                            name='chevron-forward-outline'
                            size={20}
                            color={colors.lightBlack2}
                        />
                    </TouchableOpacity>
                </View>
            </ContainerTabWithoutScroll>
            <ConfirmationModal
                isOpen={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                title='Are you sure you want to delete your account? This process will take 30 days to complete. This account deletion will remove your account and data permanently.'
                submitButtonText='Yes'
                submitButtonIcon={
                    <Ionicons name='ios-settings' color={colors.defaultWhite} />
                }
                onPress={onConfirm}
                isLoading={isLoading}
                // Linking.openSettings().then((res) => setOpenConfirmationModal(false))
            />
        </>
    );
};

export default Settings;
