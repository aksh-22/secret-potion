import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode } from 'react';
import {
    Platform,
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import CustomHeader from '../CustomHeader';
import GrayText from '../GrayText';

type TContainer = {
    children: ReactNode;
    style?: ViewStyle;
    textContainerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    contentContainerStyle2?: ViewStyle;
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
    headerStyle?: ViewStyle;
    StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
    statusBarColor?: string;
    backIconColor?: string;
    textColor?: string;
    safeAreaStyle?: ViewStyle;
    showHeader?: boolean;
};

const ContainerTab = ({
    children,
    style,
    textContainerStyle,
    heading,
    searchIcon,
    menuIcon,
    isBack,
    contentContainerStyle,
    contentContainerStyle2,
    onMenuIconPress,
    bell,
    message,
    deleteIcon,
    editIcon,
    onDeleteIconPress,
    onEditIconPress,
    headingHeader,
    backBtnPress,
    bounces = false,
    description,
    refreshLoading = false,
    onRefresh,
    scrollEnabled,
    StatusBarStyle,
    headerStyle,
    statusBarColor = colors.defaultWhite,
    backIconColor,
    textColor,
    safeAreaStyle,
    showHeader = true,
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
                { flex: 1, backgroundColor: statusBarColor },
                safeAreaStyle,
            ]}
        >
            <StatusBar
                // hidden
                translucent={false}
                backgroundColor={statusBarColor}
                barStyle={StatusBarStyle ?? 'dark-content'}
            />
            <KeyboardAwareScrollView
                scrollEnabled={scrollEnabled}
                refreshControl={
                    onRefresh && (
                        <RefreshControl
                            refreshing={refreshLoading}
                            onRefresh={onRefresh}
                            tintColor={colors.regentBlue}
                            colors={[colors.regentBlue, colors.red]}
                            title='Pull to refresh'
                            titleColor={colors.regentBlue}
                        />
                    )
                }
                showsVerticalScrollIndicator={false}
                bounces={bounces}
                keyboardShouldPersistTaps='handled'
                stickyHeaderIndices={[0]}
                style={[{ flex: 1, backgroundColor: colors.background }, style]}
                contentContainerStyle={[
                    { flexGrow: 1, paddingBottom: 100 },
                    contentContainerStyle2,
                ]}
            >
                {showHeader && (
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
                        containerStyle={headerStyle}
                        backIconColor={backIconColor}
                        textColor={textColor}
                        // heading={headerHeading}
                    />
                )}
                {heading ? (
                    <View style={[styles.textContainer, textContainerStyle]}>
                        <View style={styles.textContainer2}>
                            <Text numberOfLines={2} style={styles.heading}>
                                {heading}
                            </Text>
                            {description ? (
                                <GrayText style={{ textAlign: 'justify' }}>
                                    {description}
                                </GrayText>
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ContainerTab;

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: colors.background,
        // height: 100,
    },
    textContainer2: {
        backgroundColor: colors.defaultWhite,
        paddingVertical: 20,
        borderBottomEndRadius: 60,
        flex: 1,
        paddingHorizontal: 20,
    },
    bottomContainer: {
        backgroundColor: colors.background,
        padding: 20,
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
});
