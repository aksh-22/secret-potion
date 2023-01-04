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
import { fonts } from 'src/constants/fonts';

type Props = {
    route: any;
};

const ForgotPassword = () => {
    const [email, setEmail] = useState(
        __DEV__ ? 'enzo_more@secretpotion.com' : ''
    );
    const [emailError, setEmailError] = useState('');

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const { navigate, goBack } =
        useNavigation<NativeStackNavigationProp<AuthStackParamList | any>>();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (email.trim().length < 1) {
            setEmailError(t('errorMessage:emailRequired'));
        } else if (!reg.emailReg.test(String(email).toLowerCase())) {
            setEmailError(t('errorMessage:emailValid'));
        } else {
            setIsLoading(true);
            const data = { email, type: 'forgot-password' };
            dispatch({
                type: 'RESEND_EMAIL',
                payload: {
                    data,
                    callback: () => {
                        setIsLoading(false);
                        showMessage({
                            isVisible: true,
                            message: t('OTP:otpSent'),
                            type: 'Success',
                        });
                        navigate(AuthRouteNames.FORGOTPASSWORDOTP, { email });
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
                        {t('forgotPassword:forgotPassword')}
                    </Text>
                    <Text style={styles.description}>
                        {t('forgotPassword:forgotPassMessage')}
                    </Text>
                    <View style={{ marginTop: 150 }}>
                        <CustomInput
                            onChangeText={(text) => {
                                emailError && setEmailError('');
                                setEmail(text);
                            }}
                            keyboardType='email-address'
                            value={email}
                            placeholder={t('loginAndSignUp:email')}
                            errorMessage={emailError}
                            maxLength={50}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 30,
                    }}
                >
                    <Text
                        style={{
                            color: colors.lightBlack,
                            fontFamily: fonts.regular,
                            fontWeight: '400',
                        }}
                    >
                        {t('forgotPassword:backTo')}
                    </Text>
                    <PressableText
                        onTextPress={() => goBack()}
                        textStyle={{ color: colors.regentBlue }}
                    >
                        {t('forgotPassword:login')}
                    </PressableText>
                </View>
            </View>
        </ContainerWithButton>
    );
};

export default ForgotPassword;
