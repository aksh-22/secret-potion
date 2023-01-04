import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import CustomInput from 'src/components/customInput/CustomInput';
import { useTranslation } from 'react-i18next';
import CustomButton from 'src/components/customButton/CustomButton';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import ContainerTab from 'src/components/container/ContainerTab';

type Props = {};

const PasswordSettings = (props: Props) => {
    // ! current password states
    const [currentPassword, setCurrentPassword] = useState(__DEV__ ? '' : '');
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    // ! password states
    const [password, setPassword] = useState(__DEV__ ? '' : '');
    const [passwordError, setPasswordError] = useState('');

    // ! confirm password states
    const [confirmPassword, setConfirmPassword] = useState(__DEV__ ? '' : '');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (currentPassword.trim().length < 1) {
            setCurrentPasswordError(t('errorMessage:currentPasswordRequired'));
        } else if (password.trim().length < 1) {
            setPasswordError(t('errorMessage:newPasswordRequired'));
        } else if (password.trim().length < 8) {
            setPasswordError(t('errorMessage:newPasswordMinium'));
        } else if (password !== confirmPassword) {
            // setPasswordError(t('errorMessage:passwordMatch'));
            setConfirmPasswordError(t('errorMessage:passwordMatch'));
        } else {
            setIsLoading(true);
            const data = {
                password,
                password_confirmation: confirmPassword,
                old_password: currentPassword,
            };
            dispatch({
                type: 'CHANGE_PASSWORD',
                payload: {
                    data,
                    callback: () => {
                        setIsLoading(false);
                        showMessage({
                            isVisible: true,
                            message: t('resetPassword:passwordChanged'),
                            type: 'Success',
                        });
                        setConfirmPassword('');
                        setCurrentPassword('');
                        setPassword('');
                        // navigate(AuthRouteNames.LOGIN);
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    return (
        <ContainerTab
            headingHeader={t('settings:changePassword')}
            contentContainerStyle={{
                backgroundColor: colors.defaultWhite,
                paddingTop: 10,
            }}
            style={{ backgroundColor: colors.defaultWhite, flex: 1 }}
            isBack
        >
            <View style={{ flex: 1 }}>
                <Image
                    style={{
                        width: SCREEN_WIDTH - 100,
                        height: 220,
                        alignSelf: 'center',
                    }}
                    resizeMode='contain'
                    source={require('src/assets/images/changePassword.png')}
                />
                <View style={{ marginTop: 20 }}>
                    <CustomInput
                        maxLength={30}
                        onChangeText={(text) => {
                            currentPasswordError && setCurrentPasswordError('');
                            setCurrentPassword(text);
                        }}
                        value={currentPassword}
                        placeholder={t('resetPassword:currentPassword')}
                        secureTextEntry={true}
                        errorMessage={currentPasswordError}
                        inputBoxStyle={{ marginTop: 30 }}
                    />
                    <CustomInput
                        maxLength={30}
                        onChangeText={(text) => {
                            passwordError && setPasswordError('');
                            setPassword(text);
                        }}
                        value={password}
                        placeholder={t('resetPassword:newPassword')}
                        secureTextEntry={true}
                        errorMessage={passwordError}
                        inputBoxStyle={{ marginTop: 30 }}
                    />
                    <CustomInput
                        inputBoxStyle={{ marginTop: 30 }}
                        maxLength={30}
                        onChangeText={(text) => {
                            confirmPassword && setConfirmPasswordError('');
                            setConfirmPassword(text);
                        }}
                        value={confirmPassword}
                        placeholder={t('resetPassword:confirmPassword')}
                        secureTextEntry={true}
                        errorMessage={confirmPasswordError}
                    />
                </View>
                <CustomButton
                    isLoading={isLoading}
                    style={{ width: 150, marginTop: 30, alignSelf: 'center' }}
                    title={t('settings:changePassword')}
                    onPress={onSubmit}
                />
            </View>
        </ContainerTab>
    );
};

export default PasswordSettings;
