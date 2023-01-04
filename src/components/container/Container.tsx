import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode } from 'react';
import { Platform, SafeAreaView, StatusBar, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from 'src/constants/colors';

type TContainer = {
    children: ReactNode;
    style?: ViewStyle;
    bounces?: boolean;
    StatusBarStyle?: 'default' | 'light-content' | 'dark-content';
    statusBarColor?: string;
    backIconColor?: string;
    textColor?: string;
    headerStyle?: ViewStyle;
};

const Container = ({
    children,
    style,
    bounces = false,
    statusBarColor = colors.background,
    StatusBarStyle,
    backIconColor,
    headerStyle,
    textColor,
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
                    flex: 1,
                    backgroundColor: statusBarColor,
                },
            ]}
        >
            <StatusBar
                // hidden
                translucent={false}
                backgroundColor={statusBarColor}
                barStyle={StatusBarStyle ?? 'dark-content'}
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
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Container;
