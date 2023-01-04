import { View, Text } from 'react-native';
import React, { useState } from 'react';
import ContainerWithButton from 'src/components/container/ContainerWithButton';
import OTPInput from 'src/components/OTPInput';
import styles from './OTP.style';
import PressableText from 'src/components/PressableText';
import colors from 'src/constants/colors';
import { useTranslation } from 'react-i18next';
import { AuthRouteNames } from 'src/constants/routeName';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'src/routes/types/navigation';
import { useDispatch } from 'react-redux';
import { showMessage } from 'src/components/messageModal/MessageModal';
import { fonts } from 'src/constants/fonts';

type Props = {
  route: any;
};

const OTP = ({ route }: Props) => {
  const [OTPVal, setOTPVal] = useState('');
  const [OTPError, setOTPError] = useState('');

  // ! loading state
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const email = route?.params?.email;

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (OTPVal.trim().length < 1) {
      setOTPError(t('errorMessage:OtpRequired'));
    } else if (OTPVal.trim().length < 6) {
      setOTPError(t('errorMessage:minOtp'));
    } else {
      setIsLoading(true);
      const data = { email, type: 'register', otp: OTPVal };
      dispatch({
        type: 'VERIFY_EMAIL',
        payload: {
          data,
          callback: () => {
            setIsLoading(false);
            navigate(AuthRouteNames.LOGIN);
          },
          errorCallback: () => {
            setIsLoading(false);
          },
        },
      });
    }
  };

  const onResendEmail = () => {
    const data = { email, type: 'register' };
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
          <Text style={styles.welcomeTxt}>{t('OTP:verifyEmail')}</Text>
          <Text style={styles.description}>{t('OTP:otpMessage')}</Text>
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

export default OTP;
