import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextStyle,
    View,
} from 'react-native';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { DiaryRouteNames } from 'src/constants/routeName';
import { BottomStackParamList } from 'src/routes/types/navigation';
import PressableText from './PressableText';

type Props = {
    image?: any;
    message?: string;
    message2?: string;
    onPress?: () => void;
    heading?: string;
    headingStyle?: TextStyle;
    headingStyle2?: TextStyle;
};

const FirstMessage = ({
    image,
    message,
    message2,
    onPress,
    heading,
    headingStyle,
    headingStyle2,
}: Props) => {
    const { navigate, goBack, addListener } =
        useNavigation<NativeStackNavigationProp<BottomStackParamList | any>>();

    const { t } = useTranslation();

    return (
        <ContainerWIthShadow
            mainContainerStyle2={{ paddingBottom: 120 }}
            rightButtonPress={onPress}
            rightButton
            statusBarColor={colors.background}
            headerStyle={{ backgroundColor: colors.background }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 20,
                    paddingBottom: 50,
                    backgroundColor: colors.defaultWhite,
                    alignItems: 'center',
                    borderRadius: 40,
                    minHeight: SCREEN_HEIGHT * 0.7,
                }}
            >
                <Text style={styles.heading}>{heading}</Text>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        resizeMode='contain'
                        style={{
                            width: SCREEN_WIDTH,
                            height: SCREEN_HEIGHT * 0.2,
                        }}
                        source={image}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={[styles.description, headingStyle]}>
                        {message}
                    </Text>
                    {message2 ? (
                        <Text style={[styles.description, headingStyle2]}>
                            {' '}
                        </Text>
                    ) : null}
                    {message2 ? (
                        <Text style={[styles.description, headingStyle2]}>
                            {message2}
                        </Text>
                    ) : null}
                </View>
            </View>
        </ContainerWIthShadow>
    );
};

export default FirstMessage;

const styles = StyleSheet.create({
    description: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 21,
        textAlign: 'justify',
    },
    heading: {
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 29,
        lineHeight: 35,
        color: colors.defaultBlack,
        marginBottom: 20,
    },
});
