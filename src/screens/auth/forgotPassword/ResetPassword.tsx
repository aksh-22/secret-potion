import { View, Text } from 'react-native';
import React, { useState } from 'react';
import ContainerWithButton from 'src/components/container/ContainerWithButton';
import OTPInput from 'src/components/OTPInput';
import styles from './forgotPassword.style';
import PressableText from 'src/components/PressableText';
import colors from 'src/constants/colors';
import { useTranslation } from 'react-i18next';
import { AuthRouteNames } from 'src/constants/routeName';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/routes/types/navigation';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import CustomInput from 'src/components/customInput/CustomInput';
import reg from 'src/utils/reg';

type Props = {
    route: any;
};

const ResetPassword = ({ route }: Props) => {
    const email = route?.params?.email;

    // ! password states
    const [password, setPassword] = useState(__DEV__ ? 'Qwerty1234' : '');
    const [passwordError, setPasswordError] = useState('');

    // ! confirm password states
    const [confirmPassword, setConfirmPassword] = useState(
        __DEV__ ? 'Qwerty1234' : ''
    );
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<AuthStackParamList | any>>();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (password.trim().length < 1) {
            setPasswordError(t('errorMessage:newPasswordRequired'));
        } else if (password.trim().length < 8) {
            setPasswordError(t('errorMessage:newPasswordMinium'));
        } else if (password !== confirmPassword) {
            // setPasswordError(t('errorMessage:passwordMatch'));
            setConfirmPasswordError(t('errorMessage:passwordMatch'));
        } else {
            setIsLoading(true);
            const data = {
                email,
                password,
                password_confirmation: confirmPassword,
            };
            dispatch({
                type: 'FORGOT_PASSWORD',
                payload: {
                    data,
                    callback: () => {
                        setIsLoading(false);
                        showMessage({
                            isVisible: true,
                            message: t('resetPassword:passwordChanged'),
                            type: 'Success',
                        });
                        navigate(AuthRouteNames.LOGIN);
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    return (
        <ContainerWithButton
            rightArrowPress={onSubmit}
            rightArrow
            rightIsLoading={isLoading}
        >
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <View>
                    <Text style={styles.welcomeTxt}>
                        {t('resetPassword:resetPassword')}
                    </Text>
                    <Text style={styles.description}>
                        {t('resetPassword:resetMessage')}
                    </Text>
                    <View style={{ marginTop: 120 }}>
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
                        />
                        <CustomInput
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
                </View>
            </View>
        </ContainerWithButton>
    );
};

export default ResetPassword;
