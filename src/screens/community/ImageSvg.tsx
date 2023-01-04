import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Image,
  Polygon,
  Rect,
} from 'react-native-svg';
import colors from 'src/constants/colors';

type Props = {};

const ImageSvg = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <Svg height='100' width='100'>
        <Defs>
          <ClipPath id='clip'>
            <Circle cx='0%' cy='20%' r='40%' />
          </ClipPath>
        </Defs>
        <Image
          width={100}
          height={50}
          href={require('src/assets/images/lib.png')}
          clipPath='url(#clip)'
        />
      </Svg>
    </View>
  );
};

export default ImageSvg;

const styles = StyleSheet.create({});
