import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Animated,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
type ImagePropTypes = {
  style: StyleProp<ImageStyle> | { height: number; width: number };
} & (
  | {
      source: ImageSourcePropType;
      uri?: never;
      dummyGroupImage?: boolean;
      resizeMode?: ImageResizeMode;
      thumbnail?: never;
    }
  | {
      source?: never;
      uri: string;
      dummyGroupImage?: boolean;
      resizeMode?: ImageResizeMode;
      thumbnail?: string;
    }
);

const ImageComponent = ({
  source,
  style,
  uri,
  dummyGroupImage = false,
  resizeMode,
  thumbnail,
  ...rest
}: ImagePropTypes) => {
  const [loading, setLoading] = useState(true);

  const thumbnailAnimated = new Animated.Value(0);

  const imageAnimated = new Animated.Value(0);
  const navigation = useNavigation();
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (uri) {
    return (
      <View style={[styles.container, style]}>
        <Animated.Image
          {...rest}
          source={{ uri: uri, cache: 'force-cache' }}
          style={[style]}
          onLoad={handleThumbnailLoad}
          blurRadius={1}
        />
        {/* <Animated.Image
          {...rest}
          source={{ uri: uri, cache: 'force-cache' }}
          style={[styles.imageOverlay, { opacity: imageAnimated }, style]}
          onLoad={onImageLoad}
        /> */}
      </View>
    );
  } else
    return source ? (
      <>
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={source}
          style={[style]}
          resizeMode={resizeMode}
          {...rest}
        />
        {/* {loading ? <Shimmer style={[style, { borderRadius: 15 }]} /> : null} */}
      </>
    ) : (
      <Image
        source={
          dummyGroupImage
            ? require('src/assets/images/dummyPersonGroup.png')
            : require('src/assets/images/dummyPerson.png')
        }
        style={style}
      />
    );
};

export default React.memo(ImageComponent);
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});
