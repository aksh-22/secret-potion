import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import React, { ReactNode } from 'react';
import colors from 'src/constants/colors';
import { globalStyle } from 'src/constants/global.style';
import CustomButton from '../customButton/CustomButton';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import LeftArrow from 'src/assets/svg/leftArrow.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';

type TContainer = {
    children: ReactNode;
    style?: ViewStyle;
    leftArrow?: boolean;
    leftArrowPress?: () => void;
    rightArrow?: boolean;
    rightArrowPress?: () => void;
    rightIsLoading?: boolean;
    leftIsLoading?: boolean;
    bounces?: boolean;
    rightDisabled?: boolean;
};

const ContainerWithButton = ({
    children,
    style,
    leftArrow,
    leftArrowPress,
    rightArrow,
    rightArrowPress,
    rightIsLoading,
    leftIsLoading,
    bounces = false,
    rightDisabled = false,
}: TContainer) => {
    return (
        <SafeAreaView
            style={[
                {
                    height:
                        Platform.OS === 'android'
                            ? SCREEN_HEIGHT - 40
                            : SCREEN_HEIGHT + 40,
                    flex: Platform.OS === 'android' && 1,
                    backgroundColor: colors.defaultWhite,
                },
            ]}
        >
            <StatusBar
                // hidden
                translucent={false}
                backgroundColor={colors.defaultWhite}
                barStyle={'dark-content'}
            />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                bounces={bounces}
                keyboardShouldPersistTaps='handled'
                style={[
                    { flex: 1, backgroundColor: colors.defaultWhite },
                    style,
                ]}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={styles.container}>
                    <View
                        style={[
                            {
                                // height: '85%',
                                flex: 0.7,
                                paddingBottom: 40,
                                backgroundColor: colors.defaultWhite,
                                paddingHorizontal: 30,
                                paddingTop: 20,
                                ...globalStyle.bottomRadius,
                                ...globalStyle.shadow4,
                            },
                            style,
                        ]}
                    >
                        {children}
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: -30,
                            marginHorizontal: 30,
                        }}
                    >
                        {leftArrow ? (
                            <CustomButton
                                isLoading={leftIsLoading}
                                onPress={leftArrowPress}
                            >
                                <LeftArrow />
                            </CustomButton>
                        ) : (
                            <View />
                        )}
                        {rightArrow ? (
                            <CustomButton
                                isLoading={rightIsLoading}
                                onPress={rightArrowPress}
                                disabled={rightDisabled}
                            >
                                <RightArrow />
                            </CustomButton>
                        ) : (
                            <View />
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default ContainerWithButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 60,
    },
});
