import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getVersion } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import AboutIcon from 'src/assets/svg/about.svg';
import ConnectionIcon from 'src/assets/svg/connection.svg';
import FAQIcon from 'src/assets/svg/faq.svg';
import HelpAndSupportIcon from 'src/assets/svg/helpAndSupport.svg';
import InviteIcon from 'src/assets/svg/invite.svg';
import LibraryIcon from 'src/assets/svg/library.svg';
import ProfileIcon from 'src/assets/svg/profile.svg';
import SettingsIcon from 'src/assets/svg/settings.svg';
import SignOutIcon from 'src/assets/svg/signOut.svg';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomModal from 'src/components/CustomModal';
import colors from 'src/constants/colors';
import { MoreRouteNames, RootStackName } from 'src/constants/routeName';
import styles from './More.style';

const data1 = [
    {
        id: 1,
        name: 'Profile',
        icon: <ProfileIcon />,
        routeName: RootStackName.PROFILE,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 2,
        name: 'Connections',
        icon: <ConnectionIcon />,
        routeName: MoreRouteNames.CONNECTION,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 3,
        name: 'Invite Friends',
        icon: <InviteIcon />,
        routeName: RootStackName.INVITE,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 4,
        name: 'Library',
        icon: <LibraryIcon />,
        routeName: RootStackName.LIBRARY,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 5,
        name: 'About',
        icon: <AboutIcon style={{ marginTop: -8 }} />,
        routeName: RootStackName.ABOUT,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 6,
        name: 'FAQ',
        icon: <FAQIcon />,
        routeName: RootStackName.FAQ,
        showArrow: true,
        screenNavigator: true,
    },

    {
        id: 7,
        name: 'Help & Support',
        icon: <HelpAndSupportIcon />,
        routeName: RootStackName.HELP_AND_SUPPORT,
        showArrow: true,
        screenNavigator: true,
    },
    {
        id: 8,
        name: 'Sign Out',
        icon: <SignOutIcon />,
        showArrow: false,
        screenNavigator: false,
    },
    {
        id: 9,
        name: 'Settings',
        icon: <SettingsIcon />,
        routeName: MoreRouteNames.SETTINGS,
        showArrow: true,
        screenNavigator: true,
    },
];

const More = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const { t } = useTranslation();

    const onPress = (type, route) => {
        if (type) {
            navigate(route);
            // if (route === 'connection') {
            //   showMessage({ isVisible: true, message: 'Coming soon', type: 'Info' });
            // } else {
            //   navigate(route);
            // }
        } else {
            setShow(true);
            // onLogout();
        }
    };

    const onLogout = () => {
        setIsLoading(true);
        dispatch({
            type: 'USER_LOGOUT',
            payload: {
                callback: () => {
                    // setIsLoading(false);
                },
                finallyCallback: () => {
                    setShow(false);
                },
            },
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => onPress(item.screenNavigator, item?.routeName)}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 30,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {item.icon}
                    </View>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                {item.showArrow ? (
                    <Ionicons
                        name='chevron-forward-outline'
                        size={20}
                        color={colors.lightBlack2}
                    />
                ) : null}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <ContainerTabWithoutScroll>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.defaultWhite,
                        paddingHorizontal: 20,
                        paddingTop: 30,
                    }}
                >
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data1}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <Text style={styles.bottomText}>
                                Secret Potion {getVersion()}
                            </Text>
                        }
                    />
                </View>
            </ContainerTabWithoutScroll>
            <CustomModal
                childrenStyle={{ justifyContent: 'center' }}
                // childrenViewStyle={{ flex: 0.4 }}
                onClose={() => setShow(false)}
                isOpen={show}
                icon={<SignOutIcon height={30} width={30} />}
                iconViewStyle={{ marginTop: -25 }}
            >
                <View
                    style={{
                        backgroundColor: colors.defaultWhite,
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        activeOpacity={0.7}
                        onPress={() => setShow(false)}
                    >
                        <LinearGradient
                            style={styles.iconWrapper2}
                            colors={[colors.close1, colors.close2]}
                        >
                            <Ionicons
                                name='close'
                                size={20}
                                color={colors.defaultWhite}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.heading}>{t('settings:signOut')}</Text>
                    <Text style={styles.description}>
                        {t('settings:signOutMessage')}
                    </Text>
                    <View
                        style={{
                            alignSelf: 'center',
                            marginBottom: -45,
                            paddingTop: 40,
                        }}
                    >
                        <CustomButton
                            isLoading={isLoading}
                            onPress={onLogout}
                            arrow
                        />
                    </View>
                </View>
            </CustomModal>
        </>
    );
};

export default More;
