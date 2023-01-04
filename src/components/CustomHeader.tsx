import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftArrow from 'src/assets/svg/backIcon.svg';
import BellIcon from 'src/assets/svg/bell.svg';
import DeleteIcon from 'src/assets/svg/delete.svg';
import EditIcon from 'src/assets/svg/edit.svg';
import ProfileEditIcon from 'src/assets/svg/EditProfile.svg';
import FilterIcon from 'src/assets/svg/filter.svg';
import ListViewIcon from 'src/assets/svg/listViewIcon.svg';
import MenuIcon from 'src/assets/svg/menu.svg';
import MessageIcon from 'src/assets/svg/message.svg';
import NotificationBadge from 'src/assets/svg/notificationBadge.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { RootStackName } from 'src/constants/routeName';
import { db } from 'src/firebase';
import { useAppSelector } from 'src/hooks/reducer';
import ImageComponent from './imageComponent/ImageComponent';
import GridViewIcon from 'src/assets/svg/gridViewIcon.svg';

type Props = {
    heading?: string;
    searchIcon?: boolean;
    menuIcon?: boolean;
    message?: boolean;
    bell?: boolean;
    isBack?: boolean;
    editIcon?: boolean;
    deleteIcon?: boolean;
    editProfile?: boolean;
    editProfileIconPress?: () => void;
    searchIconPress?: () => void;
    onEditIconPress?: () => void;
    onDeleteIconPress?: () => void;
    onMenuIconPress?: () => void;
    backBtnPress?: () => void;
    onListViewPress?: () => void;
    onGridViewPress?: () => void;
    image?: string;
    onFilterPress?: () => void;
    onClosePress?: () => void;
    containerStyle?: ViewStyle;
    backIconColor?: string;
    textColor?: string;
};

const CustomHeader = ({
    searchIcon,
    menuIcon,
    isBack,
    onMenuIconPress,
    bell = true,
    message = true,
    editIcon,
    deleteIcon,
    onDeleteIconPress,
    onEditIconPress,
    heading,
    backBtnPress,
    editProfile,
    editProfileIconPress,
    image,
    onFilterPress,
    onClosePress,
    containerStyle,
    backIconColor = colors.defaultBlack,
    textColor = colors.defaultBlack,
    onGridViewPress,
    onListViewPress,
    searchIconPress,
}: Props) => {
    const { goBack, navigate, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    const [count, setCount] = useState(0);

    const [notificationCount, setNotificationCount] = useState(0);

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );

    const unread_notification = useAppSelector(
        (state) => state?.userReducer?.user?.unread_notification
    );

    useEffect(() => {
        setNotificationCount(unread_notification);
    }, [unread_notification]);

    useEffect(() => {
        db.ref(`${__DEV__ ? '/Local' : '/Production'}/chatMenu/${user_id}`).on(
            'value',
            (snapshot) => {
                let tempCount = 0;
                snapshot.forEach((el): any => {
                    tempCount = tempCount + el.val()?.unseen?.[user_id]?.count;
                });
                setCount(tempCount);
                // dispatch(updateUserCount(tempCount));
                // setCount(tempCount);
                // tempCount = 0;
            }
        );
    }, [user_id]);

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {isBack ? (
                    <Pressable
                        hitSlop={10}
                        style={{ marginHorizontal: 10 }}
                        onPress={() =>
                            backBtnPress ? backBtnPress() : goBack()
                        }
                    >
                        <LeftArrow fill={backIconColor} />
                    </Pressable>
                ) : (
                    <View />
                )}
                {heading ? (
                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: fonts.regular,
                            fontWeight: '400',
                            fontSize: 17,
                            lineHeight: 20,
                            color: textColor,
                            // width: 120,
                            marginLeft: 10,
                        }}
                    >
                        {heading.replace(/%20/g, ' ')}
                    </Text>
                ) : null}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {editIcon ? (
                    <Pressable onPress={onEditIconPress} style={styles.icon}>
                        <EditIcon />
                    </Pressable>
                ) : null}
                {deleteIcon ? (
                    <Pressable
                        hitSlop={10}
                        onPress={onDeleteIconPress}
                        style={styles.icon}
                    >
                        <DeleteIcon />
                    </Pressable>
                ) : null}
                {searchIconPress ? (
                    <Pressable onPress={searchIconPress} style={styles.icon}>
                        <FontAwesomeIcons
                            name='search'
                            color={colors.regentBlue}
                            size={22}
                        />
                    </Pressable>
                ) : null}
                {menuIcon ? (
                    <Pressable onPress={onMenuIconPress} style={styles.icon}>
                        <MenuIcon />
                    </Pressable>
                ) : null}
                {onClosePress ? (
                    <Pressable onPress={onClosePress} style={styles.icon}>
                        <MaterialCommunityIcons
                            size={25}
                            name='filter-variant-remove'
                            color={colors.regentBlue}
                        />
                    </Pressable>
                ) : null}
                {onFilterPress ? (
                    <Pressable onPress={onFilterPress} style={styles.icon}>
                        <FilterIcon />
                    </Pressable>
                ) : null}
                {onListViewPress ? (
                    <Pressable onPress={onListViewPress} style={styles.icon}>
                        <ListViewIcon />
                    </Pressable>
                ) : null}
                {onGridViewPress ? (
                    <Pressable onPress={onGridViewPress} style={styles.icon}>
                        <GridViewIcon />
                    </Pressable>
                ) : null}

                {message ? (
                    <Pressable
                        hitSlop={10}
                        onPress={() => navigate(RootStackName.CHAT_MENU)}
                        style={styles.icon}
                    >
                        {count > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    right: -3,
                                    top: -3,
                                    zIndex: 1,
                                    height: 17,
                                    width: 17,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <NotificationBadge
                                    height={17}
                                    width={17}
                                    style={{ position: 'absolute' }}
                                />
                                <Text
                                    style={{
                                        fontSize: 10,
                                        color: colors.defaultWhite,
                                    }}
                                >
                                    {count}
                                </Text>
                            </View>
                        )}
                        <MessageIcon />
                    </Pressable>
                ) : null}
                {bell ? (
                    <Pressable
                        hitSlop={10}
                        onPress={
                            () => navigate(RootStackName.NOTIFICATION)
                            // showMessage({
                            //   isVisible: true,
                            //   message: "Coming soon",
                            //   type: "Info",
                            // })
                        }
                        style={styles.icon}
                    >
                        <BellIcon />
                        {notificationCount > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    right: -6,
                                    top: -6,
                                    zIndex: 1,
                                    height: 17,
                                    width: 17,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <NotificationBadge
                                    height={17}
                                    width={17}
                                    style={{ position: 'absolute' }}
                                />
                                <Text
                                    style={{
                                        fontSize:
                                            notificationCount > 1000
                                                ? 6
                                                : notificationCount > 99
                                                ? 8
                                                : 10,
                                        color: colors.defaultWhite,
                                    }}
                                >
                                    {notificationCount}
                                </Text>
                            </View>
                        )}
                        {/* {notificationBadge && (
                            <View
                                style={{
                                    position: 'absolute',
                                    right: -3,
                                    top: -3,
                                }}
                            >
                                <NotificationBadge height={10} width={10} />
                            </View>
                        )} */}
                    </Pressable>
                ) : null}
                {editProfile ? (
                    <Pressable
                        onPress={editProfileIconPress}
                        style={styles.icon}
                    >
                        <ProfileEditIcon />
                    </Pressable>
                ) : null}
                {image ? (
                    <ImageComponent
                        uri={image}
                        style={{ height: 30, width: 30, borderRadius: 30 }}
                        resizeMode='cover'
                    />
                ) : null}
            </View>
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingRight: 15,
        backgroundColor: colors.defaultWhite,
        paddingVertical: 10,
        zIndex: 100,
    },
    icon: {
        marginHorizontal: 10,
    },
});
