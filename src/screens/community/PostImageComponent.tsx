import { Image, ImageStyle, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  style?: ImageStyle;
  source?: any;
};

const PostImageComponent = ({ style, source }: Props) => {
  return <Image resizeMode='cover' source={source} style={style} />;
};

export default PostImageComponent;

const styles = StyleSheet.create({});
