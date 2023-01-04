import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import moodData from 'src/utils/moodData';
import InitialLoader from '../InitialLoader';
import styles from './Carousel.style';

type Props = {
    onItemPress?: (data?: any) => void;
    startIndex?: any;
};

const CustomCarousel = ({ onItemPress, startIndex = 2 }: Props) => {
    let carouselRef: any = useRef(null);
    const [activeIndex, setActiveIndex] = useState(startIndex);

    const [showData, setShowData] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setTimeout(() => {
                setShowData(true);
            }, 500);
        }, [])
    );

    const renderItem = ({ item, index }: { item: any; index: any }) => {
        return (
            <TouchableOpacity
                style={styles.slide}
                onPress={() => {
                    carouselRef?.current?.snapToItem(index, { animated: true });
                    setTimeout(() => {
                        onItemPress && onItemPress(item);
                    }, 10);
                }}
            >
                <LottieView
                    source={item.lottie}
                    autoPlay
                    style={{ width: 110, height: 110 }}
                    // onAnimationFinish={onAnimationFinish}
                    loop={true}
                />
                <Text
                    style={[
                        styles.title,
                        { fontWeight: activeIndex === index ? '900' : '400' },
                    ]}
                >
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    };

    // useEffect(() => {
    //   setTimeout(() => {
    //     carouselRef?.current?.snapToItem(2, { animated: true });
    //   }, 500);
    // }, [activeIndex]);

    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{t('home:rateMood')}</Text>
            {showData ? (
                <Carousel
                    ref={carouselRef}
                    data={moodData}
                    renderItem={renderItem}
                    sliderWidth={SCREEN_WIDTH - 40}
                    itemWidth={SCREEN_WIDTH * 0.3}
                    inactiveSlideScale={0.8}
                    inactiveSlideOpacity={0.4}
                    enableSnap
                    onSnapToItem={(v) => {
                        setActiveIndex(v);
                    }}
                    onLayout={() =>
                        setTimeout(
                            () => {
                                carouselRef?.current?.snapToItem(
                                    startIndex - 1,
                                    {
                                        animated: true,
                                    }
                                );
                            },
                            Platform.OS === 'ios' ? 500 : 0
                        )
                    }
                />
            ) : (
                <InitialLoader />
            )}
        </View>
    );
};

export default CustomCarousel;
