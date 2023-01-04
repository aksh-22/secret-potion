import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyle } from 'src/constants/global.style';
import colors from 'src/constants/colors';
import CustomButton from '../customButton/CustomButton';
import LeftArrow from 'src/assets/svg/leftArrow.svg';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import Container from './Container';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    children: ReactNode;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    leftButton?: boolean;
    showShadow?: boolean;
    leftButtonPress?: () => void;
    rightButton?: boolean;
    rightButtonPress?: () => void;
    rightBtnTitle?: string;
    mainContainerStyle?: ViewStyle;
    mainContainerStyle2?: ViewStyle;
    whiteShadowContainer1?: ViewStyle;
    StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
    statusBarColor?: string;
    backIconColor?: string;
    textColor?: string;
    headerStyle?: ViewStyle;
};

const ContainerWIthShadow = ({
    children,
    onPress,
    containerStyle,
    leftButton,
    leftButtonPress,
    rightButton,
    rightButtonPress,
    showShadow,
    rightBtnTitle,
    mainContainerStyle,
    mainContainerStyle2,
    whiteShadowContainer1,
    StatusBarStyle,
    backIconColor,
    headerStyle,
    statusBarColor,
    textColor,
}: Props) => {
    const { navigate, goBack, addListener } =
        useNavigation<NativeStackNavigationProp<any | any>>();

    return (
        <Container
            headerStyle={headerStyle}
            backIconColor={backIconColor}
            statusBarColor={statusBarColor}
            textColor={textColor}
            style={{
                backgroundColor: colors.background,
                ...mainContainerStyle,
            }}
        >
            <View
                style={[
                    {
                        flex: 1,
                        marginHorizontal: 20,
                        marginTop: 30,
                        marginBottom: 0,
                        justifyContent: 'flex-start',
                    },
                    mainContainerStyle2,
                ]}
            >
                {showShadow && (
                    <>
                        <View
                            style={[
                                styles.whiteShadowContainer1,
                                {
                                    backgroundColor: showShadow
                                        ? colors.defaultWhite
                                        : colors.transparent,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.whiteShadowContainer1,
                                {
                                    backgroundColor: showShadow
                                        ? colors.defaultWhite
                                        : colors.transparent,
                                },
                            ]}
                        />
                    </>
                )}

                <View style={[styles.container, containerStyle]}>
                    {children}
                </View>
                <View style={styles.bottom}>
                    {leftButton ? (
                        <CustomButton
                            onPress={leftButtonPress}
                            style={styles.button}
                        >
                            <LeftArrow />
                        </CustomButton>
                    ) : (
                        <View />
                    )}
                    {rightButton ? (
                        <CustomButton
                            title={rightBtnTitle}
                            onPress={rightButtonPress}
                            style={styles.button}
                        >
                            <RightArrow />
                        </CustomButton>
                    ) : (
                        <View />
                    )}
                </View>
            </View>
        </Container>
    );
};

export default ContainerWIthShadow;

const styles = StyleSheet.create({
    whiteShadowContainer1: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 40,
        height: 100,
        width: '95%',
        alignSelf: 'center',
        marginBottom: -85,
        opacity: 0.5,
        ...globalStyle.shadow2,
    },
    whiteShadowContainer2: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 40,
        height: 100,
        marginBottom: -80,
        width: '95%',
        alignSelf: 'center',
        opacity: 0.5,
        ...globalStyle.shadow2,
    },
    button: {
        // alignSelf: 'flex-end',
        // marginTop: -30,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 110,
        marginHorizontal: 20,
        flex: 1,
        marginTop: -30,
    },
    container: {
        zIndex: 10,
        // backgroundColor: colors.transparent,
        // flex: 1,
        borderRadius: 40,
        // padding: 20,
        // paddingBottom: 90,
        // minHeight: SCREEN_HEIGHT,
        // ...globalStyle.shadow,
    },
});
