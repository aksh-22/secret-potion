import {
    CommonActions,
    StackActions,
    TabActions,
    useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import Info from 'src/assets/svg/info.svg';
import Container from 'src/components/container/Container';
import ContainerWIthShadow from 'src/components/container/ContainerWIthShadow';
import CustomModal from 'src/components/CustomModal';
import LoadingComponent from 'src/components/LoadingComponent';
import RangeSlider from 'src/components/RangeSlider';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import {
    BottomRouteNames,
    RootStackName,
    WellnessRouteNames,
} from 'src/constants/routeName';
import { useAppDispatch } from 'src/hooks/reducer';
import { updateShouldWellness } from 'src/redux/reducer/userReducer';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { wellnessQuestionType } from 'typings/wellnessQuestion';
import styles from './Wellness.style';

type Props = {
    navigation?: any;
};

let ans = [];

const WellnessQuestion = ({ navigation }: Props) => {
    const [questionData, setQuestionData] = useState<
        Array<wellnessQuestionType>
    >([]);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState<any>({});

    const [answers, setAnswers] = useState([]);

    const { navigate, replace, reset } =
        useNavigation<NativeStackNavigationProp<any>>();

    let carouselRef: any = useRef(null);

    const dispatch = useDispatch();
    const dispatchApp = useAppDispatch();

    const { t } = useTranslation();

    const onSubmit = () => {
        setIsLoading(true);
        dispatch({
            type: 'SUBMIT_WELLNESS',
            payload: {
                data: {
                    date: dateFormatForServer(new Date()),
                    wellness_answers: [...ans],
                },
                callback: () => {
                    setIsLoading(false);
                    dispatchApp(updateShouldWellness(false));
                    // replace(RootStackName.BOTTOMTAB, {
                    //     screen: BottomRouteNames.WELNESSSTACK,
                    //     params: {
                    //         screen: WellnessRouteNames.WELLNESS,
                    //     },
                    // });
                    // StackActions.replace(RootStackName.BOTTOMTAB, {
                    //     screen: {
                    //         name: BottomRouteNames.WELNESSSTACK,
                    //         params: {
                    //             screen: WellnessRouteNames.WELLNESS,
                    //             initial: false,
                    //         },
                    //     },
                    // });
                    navigation?.dispatch(
                        // TabActions.jumpTo(RootStackName.BOTTOMTAB)
                        StackActions.replace(RootStackName.BOTTOMTAB, {
                            screen: BottomRouteNames.WELNESSSTACK,
                            params: {
                                screen: WellnessRouteNames.WELLNESS_LANDING_PAGE,
                                initial: true,
                                params: {
                                    is: 'test',
                                },
                            },
                            initial: true,
                        })
                    );
                    // dis(WellnessRouteNames.WELLNESS);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    useEffect(() => {
        setIsLoading(true);
        dispatch({
            type: 'GET_WELLNESS_QUESTIONS',
            payload: {
                callback: (wellness: wellnessQuestionType[]) => {
                    setQuestionData(wellness);
                    setIsLoading(false);

                    ans = [];
                },
                errorCallback: () => {},
            },
        });
    }, []);

    const rightButtonPress = () => {
        setIndex((prev) => prev + 1);
        if (index === 3) {
            onSubmit();
        } else {
            carouselRef?.current?.snapToNext();
        }
    };

    const leftButtonPress = () => {
        setIndex((prev) => prev - 1);
        carouselRef?.current?.snapToPrev();
    };

    const onChange = useCallback(
        (val, el, item) => {
            let temp = [...ans];

            const data = {
                option_id: el?.id,
                question_id: item?.id,
                value: val,
            };

            const index = temp.findIndex((el2) => {
                return el2?.option_id === data?.option_id;
            });
            if (index !== -1) {
                temp[index] = data;
            } else {
                temp.push(data);
            }
            // setAnswers([...temp]);
            ans = [...temp];
        },
        [answers]
    );

    const tinderAnimatedStyles = (
        index: any,
        animatedValue: any,
        carouselProps: any,
        cardOffset: any
    ) => {
        const sizeRef = carouselProps.vertical
            ? carouselProps.itemHeight
            : carouselProps.itemWidth;
        const mainTranslateProp = carouselProps.vertical
            ? 'translateY'
            : 'translateX';
        const secondaryTranslateProp = carouselProps.vertical
            ? 'translateX'
            : 'translateY';

        const card1Scale = 0.95;
        const card2Scale = 0.9;
        const card3Scale = 0.85;
        const card4Scale = 0.8;

        const peekingCardsOpacity = true ? 0.92 : 1;

        cardOffset = !cardOffset && cardOffset !== 0 ? 9 : cardOffset;

        const getMainTranslateFromScale = (cardIndex: any, scale: any) => {
            const centerFactor = (1 / scale) * cardIndex;
            return -Math.round(sizeRef * centerFactor);
        };

        return {
            // elevation: carouselProps.data.length - index, // fix zIndex bug visually, but not from a logic point of view
            opacity: animatedValue.interpolate({
                inputRange: [-4, -3, -2, -1, 0, 1],
                outputRange: [0, 1, 1, 1, 1, 1],
                extrapolate: 'clamp',
            }),

            transform: [
                {
                    scale: animatedValue.interpolate({
                        inputRange: [-4, -3, -2, -1, 0],
                        outputRange: [
                            card4Scale,
                            card3Scale,
                            card2Scale,
                            card1Scale,
                            1,
                        ],
                        extrapolate: 'clamp',
                    }),
                },
                {
                    rotate: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '22deg'],
                        extrapolate: 'clamp',
                    }),
                },
                {
                    [mainTranslateProp]: animatedValue.interpolate({
                        inputRange: [-4, -3, -2, -1, 0, 1],
                        outputRange: [
                            getMainTranslateFromScale(-4, card4Scale),
                            getMainTranslateFromScale(-3, card3Scale),
                            getMainTranslateFromScale(-2, card2Scale),
                            getMainTranslateFromScale(-1, card1Scale),
                            0,
                            sizeRef * 1.1,
                        ],
                        extrapolate: 'clamp',
                    }),
                },
                {
                    [secondaryTranslateProp]: animatedValue.interpolate({
                        inputRange: [-4, -3, -2, -1, 0, 1],
                        outputRange: [-120, -90, -60, -30, 0, 30],
                        extrapolate: 'clamp',
                    }),
                },
            ],
        };
    };

    const tinderScrollInterpolator = (index: any, carouselProps: any) => {
        const range = [1, 0, -1, -2, -3, -4];
        const inputRange = getInputRangeFromIndexes(
            range,
            index,
            carouselProps
        );
        const outputRange = range;

        return { inputRange, outputRange };
    };

    const renderItem = ({
        item,
        index: i,
    }: {
        item: wellnessQuestionType;
        index: any;
    }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.defaultWhite,
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                    borderRadius: 40,
                    opacity: i >= index ? 1 : 0.5,
                }}
            >
                <Text style={styles?.question}>
                    {item?.question}
                    <TouchableOpacity
                        onPress={() => {
                            setModalData({
                                content: item?.content,
                                name: item?.name,
                            });
                            setShow(true);
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 15,
                            paddingLeft: 2,
                        }}
                    >
                        <Info height={15} width={15} />
                    </TouchableOpacity>
                </Text>
                {item?.type?.map((el, index) => (
                    <View key={index} style={{ marginVertical: 20 }}>
                        <Text style={styles?.questionText}>{el?.option}</Text>
                        <RangeSlider
                            onChange={(val) => onChange(val, el, item)}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <Container>
                    <ContainerWIthShadow
                        showShadow={false}
                        // showShadow={currStep > 1}
                        mainContainerStyle2={{ paddingBottom: 100 }}
                        rightBtnTitle={index === 3 ? t('wellness:submit') : ''}
                        leftButton={index > 0}
                        rightButton
                        rightButtonPress={rightButtonPress}
                        leftButtonPress={leftButtonPress}
                    >
                        <Carousel
                            layout='tinder'
                            ref={carouselRef}
                            data={questionData}
                            renderItem={renderItem}
                            sliderWidth={SCREEN_WIDTH - 40}
                            itemWidth={SCREEN_WIDTH - 40}
                            inactiveSlideScale={0.8}
                            inactiveSlideOpacity={0.4}
                            initialScrollIndex={3}
                            scrollEnabled={false}
                            scrollInterpolator={tinderScrollInterpolator}
                            slideInterpolatedStyle={tinderAnimatedStyles}
                            slideStyle={{
                                marginTop:
                                    (questionData?.length ?? 0) < 2
                                        ? SCREEN_HEIGHT * 0.01
                                        : SCREEN_HEIGHT * 0.04,
                            }}
                            onSnapToItem={(v) => {
                                // setIndex(v);
                            }}
                            scrollEventThrottle={16}
                            enableMomentum={true}
                            decelerationRate={0.9}
                            bounces={false}
                        />
                    </ContainerWIthShadow>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            left: 0,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                        onPress={() => {
                            // navigate(BottomRouteNames.HOMESTACK);
                            reset({
                                index: 0,
                                routes: [{ name: RootStackName.BOTTOMTAB }],
                            });
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: fonts.regular,
                                color: colors.defaultBlack,
                                opacity: 0.5,
                            }}
                        >
                            Do it later
                        </Text>
                        <Ionicons
                            name='chevron-forward'
                            size={20}
                            color={colors.defaultBlack}
                            style={{ opacity: 0.5 }}
                        />
                    </TouchableOpacity>
                </Container>
            )}
            <CustomModal
                childrenStyle={{ justifyContent: 'center' }}
                // childrenViewStyle={{ flex: 0.4 }}
                onClose={() => setShow(false)}
                isOpen={show}
            >
                <View
                    style={{
                        backgroundColor: colors.defaultWhite,
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShow(false)}
                        style={styles.iconWrapper}
                    >
                        <Ionicons
                            name='close'
                            size={20}
                            color={colors.defaultWhite}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>{modalData?.name}</Text>
                    <Text style={styles.description}>{modalData?.content}</Text>
                </View>
            </CustomModal>
        </>
    );
};

export default WellnessQuestion;
