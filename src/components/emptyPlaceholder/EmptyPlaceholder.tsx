import React from 'react';
import {
  ImageSourcePropType,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import ImageComponent from '../imageComponent/ImageComponent';
import LottieView from 'lottie-react-native';
const SIZE = 300;

interface EmptyProps {
  text: string;
  image?: ImageSourcePropType;
  style?: ViewStyle;
  inverted?: boolean;
  size?: number;
  textStyle?: TextStyle;
}
const EmptyPlaceholder = ({
  text,
  image,
  style,
  inverted = false,
  size = SIZE,
  textStyle,
}: EmptyProps) => {
  // const userRole: userType = useAppSelector1(
  //   (state) => state?.userReducer?.userType
  // );
  // if (!userRole) {
  //   return null;
  // }
  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {
              rotateX: inverted ? '180deg' : '0deg',
            },
          ],
        },
        style,
      ]}
    >
      {/* <ImageComponent
        source={
          image ?? true
            ? require('src/assets/images/noData.png')
            : require('src/assets/images/noData.png')
        }
        style={{
          height: 190,
          width: 130,
          marginBottom: 20,
        }}
        resizeMode='cover'
      /> */}
      <LottieView
        source={require('src/assets/lottie/Logo.json')}
        autoPlay
        style={{ width: size, height: size }}
        // onAnimationFinish={onAnimationFinish}
        loop={true}
      />
      <Text
        style={[
          {
            color: colors.black,
            fontSize: 28,
            textAlign: 'center',
            fontFamily: fonts.regular,
            marginTop: 30,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default EmptyPlaceholder;
