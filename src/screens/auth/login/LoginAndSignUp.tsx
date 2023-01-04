import { API_URL_LIVE_NEW } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Keyboard,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerWithButton from 'src/components/container/ContainerWithButton';
import CustomInput from 'src/components/customInput/CustomInput';
import { showMessage } from 'src/components/messageModal/MessageModal';
import PressableText from 'src/components/PressableText';
import Toggler from 'src/components/Toggler';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { AuthRouteNames } from 'src/constants/routeName';
import reg from 'src/utils/reg';
import { useDebounce } from 'use-debounce';
import styles from './Login.style';

const url1 = `${API_URL_LIVE_NEW}term-condition`;
const url2 = `${API_URL_LIVE_NEW}privacy-policy`;

const LoginAndSignUp = () => {
    // !current tab
    const [currTab, setCurrTab] = useState('login');

    // !first name states
    const [firstName, setFirstName] = useState(__DEV__ ? 'akash22' : '');
    const [firstNameError, setFirstNameError] = useState('');

    // !last name states
    const [lastName, setLastName] = useState(__DEV__ ? 'khandelwal' : '');
    const [lastNameError, setLastNameError] = useState('');

    // ! email states
    const [email, setEmail] = useState(__DEV__ ? 'user2@mailinator.com' : '');
    const [emailError, setEmailError] = useState('');

    // ! password states
    const [password, setPassword] = useState(__DEV__ ? 'Qwerty1234' : '');
    const [passwordError, setPasswordError] = useState('');

    // ! username states
    const [username, setUsername] = useState(__DEV__ ? 'aksh22' : '');
    const [usernameError, setUsernameError] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [init, setInit] = useState(true);

    const [value] = useDebounce(username, 500);

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const [On, setOn] = useState(false);

    useEffect(() => {
        if (!init) {
            value.trim().length > 2 && onCheckUsername(value);
        } else {
            setInit(false);
        }
    }, [value]);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const onSubmit = () => {
        const a = email.trim();
        const data = {
            email: email.toLowerCase(),
            password,
            fname: firstName,
            lname: lastName,
        };
        // navigate(AuthRouteNames.WELCOME);

        if (currTab === 'signUp' && firstName.trim().length < 1) {
            setFirstNameError(t('errorMessage:firstNameRequired'));
        } else if (currTab === 'signUp' && lastName.trim().length < 1) {
            setLastNameError(t('errorMessage:lastNameRequired'));
        } else if (
            currTab === 'signUp' &&
            (value.trim().length < 3 || username.trim().length < 3)
        ) {
            setUsernameError('Minimum length must be 3');
        } else if (currTab === 'signUp' && !isUsernameAvailable) {
            setUsernameError('User name already taken.');
        } else if (email.trim().length < 1) {
            setEmailError(t('errorMessage:emailRequired'));
        } else if (!reg.emailReg.test(String(email.trim()).toLowerCase())) {
            setEmailError(t('errorMessage:emailValid'));
        } else if (password.trim().length < 1) {
            setPasswordError(t('errorMessage:passwordRequired'));
        } else if (currTab === 'signUp' && password.trim().length < 8) {
            setPasswordError(t('errorMessage:passwordMinium'));
        } else if (currTab === 'signUp' && password.trim().length > 20) {
            setPasswordError(t('errorMessage:passwordMinium'));
        } else {
            setIsLoading(true);
            Keyboard.dismiss();
            currTab === 'signUp' ? onSignUp() : onLogin();
        }
    };

    const onCheckUsername = (text) => {
        const data = { user_name: text.toLocaleLowerCase() };
        setUsernameLoading(true);
        dispatch({
            type: 'CHECK_USERNAME',
            payload: {
                data,
                callback: () => {
                    setIsUsernameAvailable(true);
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                    }, 2000);
                    // navigate(RootStackName.BOTTOMTAB);
                },
                errorCallback: () => {
                    setShowSuccess(false);
                    setIsUsernameAvailable(false);
                    setUsernameError('User name already taken.');
                },
                finallyCallback: () => {
                    setUsernameLoading(false);
                },
            },
        });
    };

    const onLogin = () => {
        const data = { email: email.trim(), password };
        dispatch({
            type: 'LOGIN_ACTION',
            payload: {
                data,
                callback: () => {
                    setIsLoading(false);
                    // navigate(RootStackName.BOTTOMTAB);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const onSignUp = () => {
        const data = {
            email,
            password,
            fname: firstName,
            lname: lastName,
            user_name: username.toLocaleLowerCase(),
        };
        dispatch({
            type: 'SIGNUP_ACTION',
            payload: {
                data,
                callback: () => {
                    setIsLoading(false);
                    showMessage({
                        isVisible: true,
                        message: t('OTP:otpSent'),
                        type: 'Success',
                    });
                    navigate(AuthRouteNames.OTP, { email });
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    return (
        <ContainerWithButton
            rightIsLoading={isLoading}
            rightArrow
            rightArrowPress={onSubmit}
            rightDisabled={currTab !== 'login' && !On}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        setCurrTab('login');
                    }}
                    style={
                        currTab === 'login'
                            ? styles.activeTab
                            : styles.inActiveTab
                    }
                >
                    <Text
                        style={[
                            styles.topText,
                            { opacity: currTab === 'login' ? 1 : 0.3 },
                        ]}
                    >
                        {t('loginAndSignUp:login')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrTab('signUp');
                    }}
                    style={
                        currTab === 'signUp'
                            ? styles.activeTab
                            : styles.inActiveTab
                    }
                >
                    <Text
                        style={[
                            styles.topText,
                            { opacity: currTab === 'signUp' ? 1 : 0.3 },
                        ]}
                    >
                        {t('loginAndSignUp:signUp')}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.welcomeTxt}>{t('loginAndSignUp:welcome')}</Text>
            <View style={{ marginTop: 50 }}>
                {currTab === 'signUp' ? (
                    <>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CustomInput
                                value={firstName}
                                placeholder={t('loginAndSignUp:firstName')}
                                inputBoxStyle={{ flex: 0.48 }}
                                maxLength={20}
                                onChangeText={(text) => {
                                    firstNameError && setFirstNameError('');
                                    setFirstName(text);
                                }}
                                errorMessage={firstNameError}
                            />
                            <CustomInput
                                maxLength={20}
                                value={lastName}
                                placeholder={t('loginAndSignUp:lastName')}
                                inputBoxStyle={{ flex: 0.48 }}
                                onChangeText={(text) => {
                                    lastNameError && setLastNameError('');
                                    setLastName(text);
                                }}
                                errorMessage={lastNameError}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <CustomInput
                                    maxLength={20}
                                    value={username}
                                    placeholder='username'
                                    onChangeText={(text) => {
                                        usernameError && setUsernameError('');
                                        setUsername(text);
                                        // text.trim().length > 2 &&
                                        //     onCheckUsername(text);
                                    }}
                                    inputBoxStyle={{
                                        marginTop: username ? 20 : 0,
                                        flex: 1,
                                    }}
                                    errorMessage={usernameError}
                                />
                                {showSuccess && (
                                    <Text
                                        style={{
                                            color: colors.green,
                                            marginTop: -15,
                                            fontFamily: fonts.regular,
                                        }}
                                    >
                                        Username is valid
                                    </Text>
                                )}
                            </View>
                            {usernameLoading && <ActivityIndicator />}
                        </View>
                    </>
                ) : null}
                <CustomInput
                    maxLength={50}
                    onChangeText={(text) => {
                        emailError && setEmailError('');

                        setEmail(text);
                    }}
                    keyboardType='email-address'
                    value={email}
                    placeholder={t('loginAndSignUp:email')}
                    errorMessage={emailError}
                    inputBoxStyle={{ marginTop: email ? 20 : 0 }}
                    autoCapitalize='none'
                />
                <CustomInput
                    maxLength={30}
                    onChangeText={(text) => {
                        passwordError && setPasswordError('');
                        setPassword(text);
                    }}
                    value={password}
                    placeholder={t('loginAndSignUp:password')}
                    secureTextEntry={true}
                    errorMessage={passwordError}
                    inputBoxStyle={{ marginTop: email ? 20 : 0 }}
                />
                {currTab === 'login' ? (
                    <PressableText
                        textStyle={styles.forgotPassText}
                        wrapperStyle={{ marginTop: 10, alignSelf: 'flex-end' }}
                        onTextPress={() =>
                            navigate(AuthRouteNames.FORGOTPASSWORD)
                        }
                    >
                        {t('loginAndSignUp:forgotPassword')}
                    </PressableText>
                ) : null}
                {currTab !== 'login' ? (
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text
                            style={[
                                styles.forgotPassText,
                                { flex: 1, lineHeight: 24 },
                            ]}
                        >
                            I have read and agree to the
                            <Text
                                style={{
                                    color: colors.regentBlue,
                                    fontFamily: fonts.regular,
                                    textDecorationLine: 'underline',
                                    textAlign: 'justify',
                                }}
                                onPress={() => {
                                    Linking.openURL(url1);
                                }}
                            >
                                {' '}
                                Terms of Service
                            </Text>{' '}
                            and
                            <Text
                                style={{
                                    color: colors.regentBlue,
                                    fontFamily: fonts.regular,
                                    textDecorationLine: 'underline',
                                }}
                                onPress={() => {
                                    Linking.openURL(url2);
                                }}
                            >
                                {' '}
                                Privacy policy
                            </Text>
                        </Text>
                        <Toggler
                            isOn={On}
                            onValueChange={(val) => {
                                setOn(val);
                            }}
                        />
                    </View>
                ) : null}
            </View>
        </ContainerWithButton>
    );
};

export default LoginAndSignUp;
