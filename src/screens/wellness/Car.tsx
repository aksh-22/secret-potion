import React from 'react';
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';
import FeedCard from 'src/components/cards/FeedCard';
import LoadingComponent from 'src/components/loadingComponent/LoadingComponent';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { useFeed } from 'src/react-query/home/feed/useFeed';
const FeedCardCarousal = () => {
  const { isLoading, data } = useFeed();

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return <FeedCard index={index} item={item} />;
  };

  const tinderScrollInterpolator = (index: any, carouselProps: any) => {
    const range = [1, 0, -1, -2, -3, -4];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return { inputRange, outputRange };
  };
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

    const getSecondaryTranslateFromScale = (cardIndex: any, scale: any) => {
      return Math.round((cardOffset * Math.abs(cardIndex)) / scale);
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
            outputRange: [card4Scale, card3Scale, card2Scale, card1Scale, 1],
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
  return isLoading ? (
    <LoadingComponent height={0.2} />
  ) : (
    <Carousel
      data={data?.feeds ?? []}
      renderItem={_renderItem}
      sliderWidth={SCREEN_WIDTH * 0.9}
      itemWidth={SCREEN_WIDTH * 0.9}
      layout='tinder'
      scrollInterpolator={tinderScrollInterpolator}
      slideInterpolatedStyle={tinderAnimatedStyles}
      slideStyle={{
        marginTop:
          (data?.feeds?.length ?? 0) < 2
            ? SCREEN_HEIGHT * 0.05
            : SCREEN_HEIGHT * 0.09,
      }}
      loop={true}
      swipeThreshold={60}
      enableSnap
      scrollEventThrottle={16}
      enableMomentum={true}
      decelerationRate={0.2}
      bounces={false}
    />
  );
};

export default FeedCardCarousal;
