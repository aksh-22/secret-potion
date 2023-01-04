import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ContainerWithButton from 'src/components/container/ContainerWithButton';
import OTPInput from 'src/components/OTPInput';
import PressableText from 'src/components/PressableText';
import colors from 'src/constants/colors';
import { useTranslation } from 'react-i18next';
import { AuthRouteNames } from 'src/constants/routeName';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/routes/types/navigation';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import styles from './forgotPassword.style';
import { fonts } from 'src/constants/fonts';

type Props = {
    route: any;
};

const ForgotPasswordOtp = ({ route }: Props) => {
    const [OTPVal, setOTPVal] = useState('');
    const [OTPError, setOTPError] = useState('');

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const email = route?.params?.email;

    const { navigate, replace } =
        useNavigation<NativeStackNavigationProp<any>>();
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (OTPVal.trim().length < 1) {
            setOTPError(t('errorMessage:OtpRequired'));
        } else if (OTPVal.trim().length < 6) {
            setOTPError(t('errorMessage:minOtp'));
        } else {
            setIsLoading(true);
            const data = { email, type: 'forgot-password', otp: OTPVal };
            dispatch({
                type: 'FORGOT_PASSWORD_VERIFY_EMAIL',
                payload: {
                    data,
                    callback: (res: any) => {
                        setIsLoading(false);
                        replace(AuthRouteNames.RESETPASSWORD, { email });
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    // useEffect(() => {
    //   onResendEmail();
    // }, []);

    const onResendEmail = () => {
        const data = { email, type: 'forgot-password' };
        setResendLoading(true);
        dispatch({
            type: 'RESEND_EMAIL',
            payload: {
                data,
                callback: () => {
                    setResendLoading(false);
                    showMessage({
                        isVisible: true,
                        message: t('OTP:otpSent'),
                        type: 'Success',
                    });
                    setOTPVal('');
                },
                errorCallback: () => {
                    setResendLoading(false);
                },
            },
        });
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
                        {t('forgotPassword:otpMessage')}
                    </Text>
                    <Text style={styles.description}>
                        {t('forgotPassword:enterOtpMessage')}
                    </Text>
                    <View style={{ marginTop: 150 }}>
                        <OTPInput
                            value={OTPVal}
                            errorMessage={OTPError}
                            onChange={(otp) => {
                                OTPError && setOTPError('');
                                setOTPVal(otp);
                            }}
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
                            fontWeight: '300',
                        }}
                    >
                        {t('OTP:didNotGetTheCode')}
                    </Text>
                    <PressableText
                        onTextPress={onResendEmail}
                        isLoading={resendLoading}
                        textStyle={{ color: colors.regentBlue }}
                    >
                        {t('OTP:resendCode')}
                    </PressableText>
                </View>
            </View>
        </ContainerWithButton>
    );
};

export default ForgotPasswordOtp;
