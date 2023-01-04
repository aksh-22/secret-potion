import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { fonts } from 'src/constants/fonts';
import colors from 'src/constants/colors';
import OneSignal from 'react-native-onesignal';
import { userProfileType } from 'typings/user';
import { useAppDispatch, useAppSelector } from 'src/hooks/reducer';
import { removeOneSignal } from 'src/api/otherService';
import {
    updateCheckToken,
    updateUserToken,
} from 'src/redux/reducer/userReducer';
import store from 'src/redux/store';

type Props = {};

const CheckToken = (props: Props) => {
    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    const appDispatch = useAppDispatch();

    useEffect(() => {
        checkTokenApi();
    }, []);

    const checkTokenApi = async () => {
        try {
            let res = await OneSignal.getDeviceState();
            const data = {
                player_id: res?.userId,
                user_id: user?.id,
            };
            await removeOneSignal(data).finally(() => {
                appDispatch(updateUserToken(null));
                appDispatch(updateCheckToken(false));
                // store.dispatch({
                //     type: 'CLEAR_REDUX',
                // });
            });
        } catch (err) {
            console.error('one signal player id err', err);
        }

        // const data =
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.blue} />
            <Text style={styles.text}>PLEASE WAIT</Text>
        </View>
    );
};

export default CheckToken;

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.regular,
        fontSize: 40,
        color: colors.defaultBlack,
        marginLeft: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});
