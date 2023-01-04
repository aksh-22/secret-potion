import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { getVersion } from 'react-native-device-info';
import Container from 'src/components/container/Container';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

const SIZE = 250;

const Splash = ({ onAnimationFinish }) => {
    const { t } = useTranslation();
    // useEffect(() => {
    //   setTimeout(() => {
    //     onAnimationFinish && onAnimationFinish();
    //   }, 500);
    // }, []);

    return (
        <Container statusBarColor={colors.defaultWhite}>
            <View style={{ flex: 1 }}>
                <View style={styles.iconWrapper}>
                    <LottieView
                        source={require('src/assets/lottie/Logo.json')}
                        autoPlay
                        style={{ width: SIZE, height: SIZE }}
                        onAnimationFinish={onAnimationFinish}
                        speed={1.5}
                        loop={false}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{t('splash:secretPotion')}</Text>
                </View>
            </View>
        </Container>
    );
};

export default Splash;

const styles = StyleSheet.create({
    iconWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 100,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21.6,
        letterSpacing: 5,
    },
    textWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 100,
    },
});
