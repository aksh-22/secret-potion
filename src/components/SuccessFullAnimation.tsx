import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import LottieView from 'lottie-react-native';
import { globalStyle } from 'src/constants/global.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import CustomButton from './customButton/CustomButton';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import moodData from 'src/utils/moodData';
import { moodType } from 'typings/checkIn';

const SIZE = 520;
const SIZE2 = 40;
const SIZE3 = 60;

type Props = {
    onButtonPress?: () => void;
    heading?: string;
    description?: string;
    isLoading?: boolean;
    onClose?: () => void;
    moodDetails?: moodType;
};

const SuccessFullAnimation = ({
    heading,
    description,
    onButtonPress,
    isLoading,
    onClose,
    moodDetails,
}: Props) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    position: 'absolute',
                    zIndex: 10,
                }}
                onPress={onButtonPress}
            ></Pressable>
            <View style={styles.emojiWrapper} />
            <View style={styles.box}>
                <View style={styles.emojiWrapper2}>
                    {isLoading ? (
                        <View />
                    ) : (
                        <LottieView
                            // source={moodDetails[moodData?.value]}
                            source={
                                moodData[moodDetails?.value - 1 ?? 0]?.lottie
                            }
                            autoPlay
                            style={styles.emoji}
                            // onAnimationFinish={onAnimationFinish}
                            loop={true}
                        />
                    )}
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 20,
                        paddingBottom: 30,
                        minHeight: 200,
                    }}
                >
                    {isLoading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ActivityIndicator
                                size={100}
                                color={colors.regentBlue}
                            />
                        </View>
                    ) : (
                        <>
                            <Text style={styles.header}>
                                {moodDetails?.mood_name}!
                            </Text>
                            <Text style={styles.description}>
                                {moodDetails?.mood_content}
                            </Text>
                        </>
                    )}
                </ScrollView>
                <CustomButton
                    style2={{ zIndex: 100 }}
                    style={styles.button}
                    //  isLoading={rightIsLoading}
                    onPress={onButtonPress}
                >
                    <RightArrow height={30} width={30} />
                </CustomButton>
            </View>
            {/* {!isLoading && (
        <LottieView
          source={require('src/assets/lottie/Bubble Burst.json')}
          autoPlay
          style={{
            width: SIZE,
            height: SIZE,
            position: 'absolute',
            zIndex: 9,
          }}
          // onAnimationFinish={onAnimationFinish}
          loop={true}
        />
      )} */}
        </View>
    );
};

export default SuccessFullAnimation;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.blackOpacity,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    box: {
        backgroundColor: colors.defaultWhite,
        ...globalStyle.shadow3,
        width: SCREEN_WIDTH - 40,
        // maxHeight: 300,
        // height: 300,
        zIndex: 20,
        borderRadius: 10,
    },
    emojiWrapper: {
        backgroundColor: colors.defaultWhite,
        padding: 10,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -30,
        ...globalStyle.shadow3,
        zIndex: -1,
        width: SIZE3,
        height: SIZE3,
    },
    emoji: {
        alignSelf: 'center',
        width: SIZE2,
        height: SIZE2,
        // marginTop: -10,
    },
    emojiWrapper2: {
        backgroundColor: colors.defaultWhite,
        padding: 10,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        width: SIZE3,
        height: SIZE3,
    },
    header: {
        color: colors.defaultBlack,
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',
        fontFamily: fonts.regular,
    },
    description: {
        fontFamily: fonts.regular,
        fontSize: 15,
        lineHeight: 18,
        color: colors.lightBlack,
        marginTop: 13,
        textAlign: 'justify',
    },
    button: {
        alignSelf: 'center',
        marginBottom: -15,
        zIndex: 120,
        marginRight: 15,
        // backgroundColor:'red'
        height: 33,
        width: 55,
    },
});
