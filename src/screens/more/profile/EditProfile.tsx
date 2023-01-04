import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Keyboard,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ImageOrVideo } from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { userName } from 'src/api/profileService';
import ConnectionIcon from 'src/assets/svg/connections.svg';
import PostIcon from 'src/assets/svg/posts.svg';
import Edit from 'src/assets/svg/profileEdit.svg';
import WellnessIcon from 'src/assets/svg/wellness.svg';
import ConfirmationModal from 'src/components/confirmationModal/ConfirmationModal';
import ContainerTab from 'src/components/container/ContainerTab';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomCountryPicker from 'src/components/CustomCountryPicker';
import CustomImagePicker from 'src/components/customImagePicker/CustomImagePicker';
import CustomInput from 'src/components/customInput/CustomInput';
import DateAndTimePicker from 'src/components/DateAndTimePicker';
import DateAndTimePicker1 from 'src/components/dateAndTimePicker/DateAndTimePicker';
import GenderSelect from 'src/components/GenderSelect';
import ImageComponent from 'src/components/imageComponent/ImageComponent';
import InitialLoader from 'src/components/InitialLoader';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { useAppSelector } from 'src/hooks/reducer';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import reg from 'src/utils/reg';
import { userProfileType } from 'typings/user';
import { useDebounce } from 'use-debounce';
import styles from './Profile.style';

type Props = {
    navigation?: any;
};

const EditProfile = ({ navigation }: Props) => {
    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    const { goBack, navigate } =
        useNavigation<NativeStackNavigationProp<any>>();

    // !first name states
    const [firstName, setFirstName] = useState(user?.fname);
    const [firstNameError, setFirstNameError] = useState('');

    // !last name states
    const [lastName, setLastName] = useState(user?.lname);
    const [lastNameError, setLastNameError] = useState('');

    // ! gender states
    const [gender, setGender] = useState(user?.gender);
    const [genderError, setGenderError] = useState('');

    // ! email states
    const [email, setEmail] = useState(user?.email);
    const [emailError, setEmailError] = useState('');

    // ! country states
    const [country, setCountry] = useState<any>({
        cca2: user?.country_code ?? '',
        name: user?.country,
    });
    const [countryError, setCountryError] = useState('');

    // ! image states
    const [attachments, setAttachments] = useState(null);
    const [isPickerOptionOpen, setIsPickerOptionOpen] = useState(false);

    // ! DOB states
    const [DOB, setDOB] = useState<any | number | undefined>(
        user?.dob ? new Date(user?.dob) : ''
    );
    const [DOBError, setDOBError] = useState('');
    const [show, setShow] = useState(false);

    // ! username states
    const [username, setUsername] = useState(user?.user_name);
    const [usernameError, setUsernameError] = useState('');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const [value] = useDebounce(username, 500);

    // ! bio states
    const [bio, setBio] = useState(user?.bio ?? '');
    const [bioError, setBioError] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

    const [isEdit, setIsEdit] = useState(true);
    const [backLoading, setBackLoading] = useState(false);

    const [showData, setShowData] = useState(false);

    const [init, setInit] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    const onDateChange = (val) => {
        setDOB(val);
        setDOBError('');
    };

    const dispatch = useDispatch();

    useEffect(() => {
        if (!init) {
            value.trim().length > 2 && onCheckUsername(value);
        } else {
            setInit(false);
        }
    }, [value]);

    const onCheckUsername = async (text) => {
        const data = { user_name: text.toLocaleLowerCase() };
        setUsernameLoading(true);
        const res = userName({ user_name: text })
            .then((res) => {
                setIsUsernameAvailable(true);
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 2000);
            })
            .catch((err) => {
                setShowSuccess(false);
                setIsUsernameAvailable(false);
                setUsernameError('User name already taken.');
            })
            .finally(() => {
                setUsernameLoading(false);
            });
        // dispatch({
        //     type: 'CHECK_USERNAME',
        //     payload: {
        //         data,
        //         callback: () => {
        //             setIsUsernameAvailable(true);
        //             // navigate(RootStackName.BOTTOMTAB);
        //         },
        //         errorCallback: () => {
        //             setIsUsernameAvailable(false);
        //             setUsernameError('User name already taken.');
        //         },
        //         finallyCallback: () => {
        //             setUsernameLoading(false);
        //         },
        //     },
        // });
    };

    const onSubmit = () => {
        if (firstName.trim().length < 1) {
            setFirstNameError(t('errorMessage:firstNameRequired'));
        } else if (lastName.trim().length < 1) {
            setLastNameError(t('errorMessage:lastNameRequired'));
        } else if (value.trim().length < 3) {
            setUsernameError('Minimum length must be 3');
        } else if (!isUsernameAvailable) {
            setUsernameError('User name already taken.');
        } else if (!DOB) {
            setDOBError(t('errorMessage:DOBRequired'));
        } else if (!gender) {
            setGenderError(t('errorMessage:genderRequired'));
        } else if (email.trim().length < 1) {
            setEmailError(t('errorMessage:emailRequired'));
        } else if (!reg.emailReg.test(String(email.trim()).toLowerCase())) {
            setEmailError(t('errorMessage:emailValid'));
        } else if (!country) {
            setCountryError(t('errorMessage:countryRequired'));
        }
        // else if (bio.trim().length < 1) {
        //   setBioError(t('errorMessage:bioRequired'));
        // }
        else {
            const fd = new FormData();
            fd.append('fname', firstName);
            fd.append('lname', lastName);
            fd.append('dob', dateFormatForServer(DOB));
            fd.append('gender', gender);
            fd.append('country', country?.name);
            fd.append('country_code', country?.cca2);
            fd.append('bio', bio);
            fd.append('user_name', value.toLocaleLowerCase());
            if (attachments?.mime) {
                attachments?.mime &&
                    fd.append(`profile_image`, {
                        name: 'image',
                        type: attachments?.mime,
                        uri:
                            Platform.OS === 'android'
                                ? attachments?.path
                                : attachments?.path.replace('file://', ''),
                    });
            }
            setIsLoading(true);
            dispatch({
                type: 'UPDATE_PROFILE',
                payload: {
                    data: fd,
                    callback: () => {
                        Keyboard.dismiss();
                        setIsLoading(false);
                        showMessage({
                            isVisible: true,
                            message: t('settings:ProfileUpdateMessage'),
                            type: 'Success',
                        });
                        setIsEdit(false);
                        // navigate(RootStackName.PROFILE);
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };
    let navRef: any = useRef(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
            if (isEdit) {
                e.preventDefault();
                navRef.current = e;
                setOpenConfirmationModal(true);
            }
        });
        return unsubscribe;
    }, [isEdit]);

    useEffect(() => {
        if (!isEdit) {
            goBack();
        }
    }, [isEdit]);

    const onConfirm = () => {
        setBackLoading(true);
        navRef.current && navigation.dispatch(navRef?.current?.data?.action);
        // setTimeout(() => {
        // }, 300);
    };

    const { t } = useTranslation();

    const maxDate = dayjs(new Date()).subtract(18, 'year').toDate();

    return showData ? (
        <>
            <ContainerTab
                headingHeader={t('settings:profile')}
                isBack
                bell={false}
                message={false}
                contentContainerStyle2={{
                    paddingBottom: Platform.OS === 'ios' ? 50 : 0,
                }}
                contentContainerStyle={{
                    padding: 0,
                    margin: 0,
                    paddingTop: 0,
                }}
                StatusBarStyle='light-content'
                statusBarColor={colors.profile1}
                headerStyle={{ backgroundColor: colors.profile1 }}
                backIconColor={colors.defaultWhite}
                textColor={colors.defaultWhite}
                safeAreaStyle={{
                    height:
                        Platform.OS === 'android'
                            ? SCREEN_HEIGHT - 40
                            : SCREEN_HEIGHT + 80,
                    flex: Platform.OS === 'android' && 1,
                }}
            >
                <View style={{ backgroundColor: colors.defaultWhite, flex: 1 }}>
                    <LinearGradient
                        colors={[colors.profile1, colors.profile2]}
                        style={styles.topContainer}
                    >
                        <TouchableOpacity
                            style={styles.imageStyle}
                            onPress={() => setIsPickerOptionOpen(true)}
                        >
                            <ImageComponent
                                uri={
                                    attachments?.mime
                                        ? attachments?.path
                                        : user?.profile_image
                                }
                                style={styles.imageStyle}
                            />
                            <View
                                style={{
                                    backgroundColor: colors.defaultWhite,
                                    width: 30,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: 0,
                                    borderRadius: 50,
                                }}
                            >
                                <Edit height={15} width={15} />
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={styles.name}
                        >{`${firstName} ${lastName}`}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                // alignItems: 'center',
                                paddingHorizontal: 20,
                                marginTop: 15,
                            }}
                        >
                            <View style={styles.box}>
                                <Text
                                    style={[styles.boxText, { fontSize: 10 }]}
                                >
                                    {t('settings:wellnessScore')}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 7,
                                    }}
                                >
                                    <WellnessIcon
                                        width={30}
                                        height={30}
                                        fill={colors.defaultWhite}
                                    />
                                    <Text
                                        style={[
                                            styles.boxText,
                                            {
                                                fontSize: 17,
                                                lineHeight: 20,
                                                marginLeft: 10,
                                            },
                                        ]}
                                    >
                                        {Math.ceil(
                                            parseInt(user?.wellness_score)
                                        )}
                                        %
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.boxText}>
                                    {t('settings:posts')}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 7,
                                    }}
                                >
                                    <PostIcon
                                        width={25}
                                        height={25}
                                        fill={colors.defaultWhite}
                                    />
                                    <Text
                                        style={[
                                            styles.boxText,
                                            {
                                                fontSize: 17,
                                                lineHeight: 20,
                                                marginLeft: 10,
                                            },
                                        ]}
                                    >
                                        {user?.total_post}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.boxText}>
                                    {t('settings:connections')}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: 7,
                                    }}
                                >
                                    <ConnectionIcon
                                        width={25}
                                        height={25}
                                        fill={colors.defaultWhite}
                                    />
                                    <Text
                                        style={[
                                            styles.boxText,
                                            {
                                                fontSize: 17,
                                                lineHeight: 20,
                                                marginLeft: 10,
                                            },
                                        ]}
                                    >
                                        {user?.total_connection}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                    <View style={{ flex: 1, backgroundColor: colors.profile2 }}>
                        <View
                            style={{
                                backgroundColor: colors.defaultWhite,
                                flex: 1,
                                borderTopLeftRadius: 60,
                                paddingTop: 30,
                                paddingHorizontal: 20,
                                paddingBottom: 40,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
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
                                            usernameError &&
                                                setUsernameError('');
                                            setUsername(text);
                                            // text.trim().length > 2 &&
                                            //     onCheckUsername(text);
                                        }}
                                        inputBoxStyle={{
                                            marginTop: username ? 0 : -20,
                                            flex: 1,
                                        }}
                                        errorMessage={usernameError}
                                    />
                                    {showSuccess && (
                                        <Text
                                            style={{
                                                color: colors.green,
                                                marginTop: -10,
                                                fontFamily: fonts.regular,
                                            }}
                                        >
                                            Username is valid
                                        </Text>
                                    )}
                                </View>
                                {usernameLoading && <ActivityIndicator />}
                            </View>
                            <DateAndTimePicker
                                // showLabel={false}
                                borderColor={colors.lightBlack2}
                                // onDateChange={(date) => setDOB(date)}
                                onPress={() => setShow(true)}
                                date={DOB}
                                errorMessage={DOBError}
                            />
                            <GenderSelect
                                value={gender}
                                errorMessage={genderError}
                                onChange={(gen) => {
                                    if (gen) {
                                        setGender(gen);
                                        setGenderError('');
                                    }
                                }}
                            />
                            <CustomInput
                                maxLength={50}
                                onChangeText={(text) => {
                                    emailError && setEmailError('');

                                    setEmail(text);
                                }}
                                editable={false}
                                keyboardType='email-address'
                                value={email}
                                placeholder={t('loginAndSignUp:email')}
                                errorMessage={emailError}
                                inputBoxStyle={{ marginBottom: -20 }}
                            />
                            <CustomCountryPicker
                                value={country}
                                errorMessage={countryError}
                                onCountrySelect={(countryData) => {
                                    setCountryError('');
                                    setCountry(countryData);
                                }}
                            />
                            <CustomInput
                                value={bio}
                                multiline
                                placeholder={t('loginAndSignUp:bio')}
                                inputTextStyle={{ minHeight: 100 }}
                                onChangeText={(text) => {
                                    bioError && setBioError('');
                                    setBio(text);
                                }}
                                errorMessage={bioError}
                            />

                            <CustomButton
                                isLoading={isLoading}
                                onPress={onSubmit}
                                title='Save'
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 50,
                                    marginBottom: 20,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ContainerTab>
            <CustomImagePicker
                show={isPickerOptionOpen}
                onClose={setIsPickerOptionOpen}
                onChange={(res: ImageOrVideo | any) => {
                    const a = { ...res[0] };
                    setAttachments({ ...a });
                }}
                pickerOption={{
                    multiple: false,
                    mediaType: 'photo',
                    compressImageQuality: 0.5,
                    compressImageMaxHeight: 700,
                    compressImageMaxWidth: 700,
                    maxFiles: 1,
                    cropping: true,
                }}
            />
            <DateAndTimePicker1
                maxDate={maxDate}
                show={show}
                value={
                    DOB ? DOB : dayjs(new Date()).subtract(18, 'year').toDate()
                }
                onChange={onDateChange}
                onClose={setShow}
                mode='date'
                // mode=''
            />
            <ConfirmationModal
                isOpen={openConfirmationModal}
                onClose={() => setOpenConfirmationModal(false)}
                title='Are you sure you want to discard the changes you made?'
                submitButtonText='Yes'
                submitButtonIcon={
                    <IoniconsIcon
                        name='ios-settings'
                        color={colors.defaultWhite}
                    />
                }
                onPress={onConfirm}
                isLoading={backLoading}
                // Linking.openSettings().then((res) => setOpenConfirmationModal(false))
            />
        </>
    ) : (
        <InitialLoader />
    );
};

export default EditProfile;
