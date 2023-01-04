import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { AuthRouteNames } from 'src/constants/routeName';
import ForgotPassword from 'src/screens/auth/forgotPassword/ForgotPassword';
import ForgotPasswordOtp from 'src/screens/auth/forgotPassword/ForgotPasswordOtp';
import ResetPassword from 'src/screens/auth/forgotPassword/ResetPassword';
import LoginAndSignUp from 'src/screens/auth/login/LoginAndSignUp';
import OTP from 'src/screens/auth/otp/OTP';
import { AuthStackParamList } from './types/navigation';

const Stack = createStackNavigator<AuthStackParamList>();
const AuthStackNavigator = () => {
    const { Navigator, Screen } = Stack;

    const getPermission = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

        OneSignal.registerForProvisionalAuthorization(() => {});
    };

    useEffect(() => {
        // OneSignal.;
        getPermission();
    }, []);

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name={AuthRouteNames.LOGIN} component={LoginAndSignUp} />
            <Screen name={AuthRouteNames.OTP} component={OTP} />
            <Screen
                name={AuthRouteNames.FORGOTPASSWORD}
                component={ForgotPassword}
            />
            <Screen
                name={AuthRouteNames.FORGOTPASSWORDOTP}
                component={ForgotPasswordOtp}
            />
            <Screen
                name={AuthRouteNames.RESETPASSWORD}
                component={ResetPassword}
            />
        </Navigator>
    );
};

export default AuthStackNavigator;
