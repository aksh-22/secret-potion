import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import { BottomRouteNames, WellnessRouteNames } from 'src/constants/routeName';
import { useAppSelector, useAppSelector1 } from 'src/hooks/reducer';
import useAppState from 'src/hooks/useAppState';
import CustomButton from './customButton/CustomButton';
import GrayText from './GrayText';
import { showMessage } from './messageModal/MessageModal';

type Props = {
    onPress?: () => void;
    // item: {
    //   image: string | any;
    //   heading: string;
    //   description: string;
    //   routeName: string;
    // };
    item: any;
};

const SIZE = 90;

const HomeBox = ({ item, onPress }: Props) => {
    const { appState } = useAppState();

    const lottieRef: any = useRef();

    const {
        userReducer: { user },
    } = useAppSelector1();

    const { navigate, dispatch } =
        useNavigation<NativeStackNavigationProp<any>>();

    const BtnPress = () => {
        // navigate(item?.routeName);
        if (item?.id !== 3) {
            dispatch(CommonActions.navigate({ name: item?.routeName }));
        } else {
            if (!user?.is_plan_created) {
                showMessage({
                    isVisible: true,
                    message:
                        'To track your progress, please create your wellness plan first',
                    type: 'Info',
                });
            } else {
                navigate(BottomRouteNames.WELNESSSTACK, {
                    screen: WellnessRouteNames.PROGRESS,
                    params: { init: 1 },
                });
            }
        }

        onPress && onPress();
    };

    useEffect(() => {
        if (appState === 'active') {
            lottieRef.current?.play();
        }
    }, [appState]);

    return (
        <View style={{ marginBottom: 30, zIndex: 1 }}>
            <View style={styles.container}>
                {item?.lottie ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: SIZE,
                            width: SIZE,
                            overflow: 'hidden',
                        }}
                    >
                        <LottieView
                            source={item?.lottie}
                            autoPlay
                            style={{
                                height: item?.SIZE,
                                width: item?.SIZE,
                            }}
                            // onAnimationFinish={onAnimationFinish}
                            loop={true}
                            ref={lottieRef}
                            // autoSize
                            resizeMode='contain'
                        />
                    </View>
                ) : (
                    <Image
                        style={styles.image}
                        source={item?.image}
                        // source={require('src/assets/images/checkIn.png')}
                    />
                )}
                <View style={{ marginLeft: 15, flex: 1 }}>
                    <Text style={styles.heading}>{item?.heading}</Text>
                    {/* <Text numberOfLines={3} style={styles.description}>
                        {item?.description}
                    </Text> */}
                    <GrayText
                        style={{ lineHeight: 20, textAlign: 'left' }}
                        numberOfLines={3}
                    >
                        {item?.description?.split('\n')}
                    </GrayText>
                </View>
            </View>
            <CustomButton
                style2={{ zIndex: 100 }}
                style={styles.button}
                //  isLoading={rightIsLoading}
                // onPress={BtnPress}
                onPress={() =>
                    item?.routeName
                        ? BtnPress()
                        : showMessage({
                              isVisible: true,
                              message: 'Coming soon',
                              type: 'Info',
                          })
                }
            >
                <RightArrow height={30} width={30} />
            </CustomButton>
        </View>
    );
};

export default HomeBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        zIndex: 100,
        flexDirection: 'row',
    },
    whiteShadowContainer1: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        height: 100,
        width: '95%',
        alignSelf: 'center',
        marginTop: -85,
        opacity: 0.5,
        ...globalStyle.shadow2,
    },
    whiteShadowContainer2: {
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        height: 100,
        marginTop: -90,
        width: '95%',
        alignSelf: 'center',
        opacity: 0.5,
        ...globalStyle.shadow2,
    },
    image: {
        width: 90,
        height: 90,
    },
    heading: {
        fontFamily: fonts.book,
        fontWeight: '400',
        fontSize: 20,
        lineHeight: 24,
        color: colors.defaultBlack,
    },
    description: {
        fontFamily: fonts.book,
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 18,
        color: colors.lightBlack,
        marginTop: 5,
        flex: 1,
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: -20,
        zIndex: 120,
        marginRight: 15,
        // backgroundColor:'red'
        height: 33,
        width: 55,
    },
});
