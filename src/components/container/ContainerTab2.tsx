import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode } from 'react';
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import CustomHeader from '../CustomHeader';

type TContainer = {
    children: ReactNode;
    style?: ViewStyle;
    textContainerStyle?: ViewStyle;
    textContainerStyle2?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    descriptionTextStyle?: TextStyle;
    headingTextStyle?: TextStyle;
    heading?: string;
    searchIcon?: boolean;
    menuIcon?: boolean;
    isBack?: boolean;
    message?: boolean;
    bell?: boolean;
    editIcon?: boolean;
    deleteIcon?: boolean;
    onEditIconPress?: () => void;
    onDeleteIconPress?: () => void;
    onMenuIconPress?: () => void;
    headingHeader?: string;
    backBtnPress?: () => void;
    onRefresh?: () => void;
    bounces?: boolean;
    description?: string;
    refreshLoading?: boolean;
    scrollEnabled?: boolean;
    hashTag?: string;
    headingNumberOfLines?: number;
    onFilterPress?: () => void;
    searchIconPress?: () => void;
    StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
    backIconColor?: string;
    textColor?: string;
    headerStyle?: ViewStyle;
    statusBarColor?: string;
    changeDot?: boolean;
};

const ContainerTab2 = ({
    children,
    style,
    textContainerStyle,
    textContainerStyle2,
    heading,
    searchIcon,
    menuIcon,
    isBack,
    contentContainerStyle,
    onMenuIconPress,
    bell,
    message,
    deleteIcon,
    editIcon,
    onDeleteIconPress,
    onEditIconPress,
    headingHeader,
    backBtnPress,
    description,
    descriptionTextStyle,
    hashTag,
    headingNumberOfLines = 2,
    headingTextStyle,
    onFilterPress,
    StatusBarStyle,
    backIconColor,
    textColor,
    headerStyle,
    statusBarColor = colors.defaultWhite,
    changeDot,
    searchIconPress,
}: TContainer) => {
    const { addListener } = useNavigation<NativeStackNavigationProp<any>>();

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
                    flex: 1,
                    backgroundColor: statusBarColor,
                },
            ]}
        >
            <StatusBar
                // hidden
                translucent={false}
                barStyle={StatusBarStyle ?? 'dark-content'}
                backgroundColor={statusBarColor}
            />
            <View
                style={[{ flex: 1, backgroundColor: colors.background }, style]}
            >
                <CustomHeader
                    backBtnPress={backBtnPress}
                    heading={headingHeader}
                    searchIcon={searchIcon}
                    menuIcon={menuIcon}
                    isBack={isBack}
                    onMenuIconPress={onMenuIconPress}
                    bell={bell}
                    message={message}
                    deleteIcon={deleteIcon}
                    editIcon={editIcon}
                    onDeleteIconPress={onDeleteIconPress}
                    onEditIconPress={onEditIconPress}
                    onFilterPress={onFilterPress}
                    containerStyle={headerStyle}
                    backIconColor={backIconColor}
                    textColor={textColor}
                    searchIconPress={searchIconPress}
                    // heading={headerHeading}
                />
                {heading ? (
                    <View style={[styles.textContainer, textContainerStyle]}>
                        <View
                            style={[styles.textContainer2, textContainerStyle2]}
                        >
                            <Text
                                numberOfLines={headingNumberOfLines}
                                style={[styles.heading, headingTextStyle]}
                            >
                                {heading}
                            </Text>
                            {hashTag ? (
                                <Text style={[styles.hashTag]}>{hashTag}</Text>
                            ) : null}
                            {description ? (
                                <Text
                                    style={[
                                        styles.description,
                                        descriptionTextStyle,
                                    ]}
                                >
                                    {description}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                ) : null}
                <View style={{ flex: 1, backgroundColor: colors.defaultWhite }}>
                    <View
                        style={[
                            styles.bottomContainer,
                            { borderTopStartRadius: heading ? 60 : 0 },
                            contentContainerStyle,
                        ]}
                    >
                        {children}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ContainerTab2;

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: colors.background,
        // minHeight: 180,
        // flex: 1,
    },
    textContainer2: {
        backgroundColor: colors.defaultWhite,
        // paddingVertical: 20,
        borderBottomEndRadius: 60,
        paddingHorizontal: 20,
    },
    bottomContainer: {
        backgroundColor: colors.background,
        paddingTop: 40,
        flex: 1,
    },
    heading: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 29,
        lineHeight: 35,
        color: colors.defaultBlack,
    },
    description: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 18,
        color: colors.lightBlack,
        marginTop: 10,
    },
    hashTag: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21,
        color: colors.blueTextColor,
        marginTop: 10,
    },
});
