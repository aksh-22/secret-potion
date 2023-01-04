import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode } from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import CustomHeader from '../CustomHeader';

interface TContainer {
    style?: StyleProp<ViewStyle>;
    flex?: boolean;
    statusBarColor?: string;
    children: ReactNode;
    notUseView?: boolean;
    barStyle?: 'default' | 'light-content' | 'dark-content';
    searchIcon?: boolean;
    menuIcon?: boolean;
    isBack?: boolean;
    onMenuIconPress?: () => void;
    contentContainerStyle?: ViewStyle;
    headerHeading?: string;
    editProfile?: boolean;
    bell?: boolean;
    message?: boolean;
    editProfileIconPress?: () => void;
    image?: string;
    onToggle?: (val: boolean) => void;
    onClosePress?: () => void;
    headerStyle?: ViewStyle;
    StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
    backIconColor?: string;
    textColor?: string;
    backBtnPress?: () => void;
    onListViewPress?: () => void;
    onGridViewPress?: () => void;
}
const ContainerTabWithoutScroll = ({
    style,
    flex,
    statusBarColor = colors.defaultWhite,
    children,
    notUseView,
    barStyle,
    searchIcon,
    menuIcon,
    isBack,
    onMenuIconPress,
    headerHeading,
    editProfile,
    editProfileIconPress,
    bell,
    message,
    image,
    onClosePress,
    headerStyle,
    StatusBarStyle,
    backIconColor,
    textColor,
    backBtnPress,
    onGridViewPress,
    onListViewPress,
}: TContainer) => {
    const { navigate, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    React.useEffect(() => {
        const unsubscribe = addListener('focus', () => {
            // do something
            Platform.OS === 'android' &&
                StatusBar.setBackgroundColor(statusBarColor);
        });

        return unsubscribe;
    }, [addListener]);

    return (
        <SafeAreaView
            style={[
                {
                    height:
                        Platform.OS === 'android'
                            ? SCREEN_HEIGHT - 40
                            : SCREEN_HEIGHT + 40,
                    flex: Platform.OS === 'android' && 1,
                    backgroundColor: statusBarColor,
                },
            ]}
        >
            <StatusBar
                translucent={false}
                backgroundColor={statusBarColor ?? colors.defaultWhite}
                barStyle={StatusBarStyle ?? 'dark-content'}
            />
            <CustomHeader
                bell={bell}
                message={message}
                editProfile={editProfile}
                editProfileIconPress={editProfileIconPress}
                heading={headerHeading}
                searchIcon={searchIcon}
                menuIcon={menuIcon}
                isBack={isBack}
                onMenuIconPress={onMenuIconPress}
                image={image}
                onClosePress={onClosePress}
                containerStyle={headerStyle}
                backIconColor={backIconColor}
                textColor={textColor}
                backBtnPress={backBtnPress}
                onListViewPress={onListViewPress}
                onGridViewPress={onGridViewPress}
            />
            {notUseView === undefined ? (
                <View
                    style={[
                        { flex: 1, backgroundColor: colors.background },
                        style,
                    ]}
                >
                    {children}
                </View>
            ) : (
                children
            )}
        </SafeAreaView>
    );
};

export default ContainerTabWithoutScroll;
