import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import remoteConfig from 'typings/remoteConfig';
import CustomButton from './customButton/CustomButton';

type Props = { remoteConfigData: remoteConfig };

const AppUpdateBox = ({ remoteConfigData }: Props) => {
    const onUpdateBtnPress = () => {
        Linking.canOpenURL(remoteConfigData?.store_url)
            .then(
                (supported) => {
                    supported && Linking.openURL(remoteConfigData?.store_url);
                },
                (err) => console.log(err)
            )
            .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <AnimatedLottieView
                    source={require('src/assets/lottie/Logo.json')}
                    autoPlay
                    loop={true}
                    style={{
                        height: 100,
                        width: 100,
                        alignSelf: 'center',
                    }}
                />
                <Text style={styles.heading}>
                    {remoteConfigData?.is_maintenance
                        ? 'Under maintenance'
                        : 'App Update available'}
                </Text>
                <Text style={styles.description}>
                    {remoteConfigData?.is_maintenance
                        ? 'Server is under maintenance, Secret potion will return soon.'
                        : 'There is a new update available of Secret Potion'}
                </Text>

                {!remoteConfigData?.is_maintenance && (
                    <CustomButton
                        onPress={onUpdateBtnPress}
                        title='Update Now'
                        textStyle={{ fontSize: 18 }}
                        style={{
                            alignSelf: 'center',
                            marginTop: 20,
                            width: 200,
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default AppUpdateBox;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: colors.blackOpacity,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: colors.defaultWhite,
        // height: 100,
        width: '90%',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    heading: {
        fontSize: 25,
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        textAlign: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 18,
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        textAlign: 'center',
        marginTop: 20,
        opacity: 0.5,
    },
});
