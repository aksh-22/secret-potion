import React from 'react';
import { View, ViewStyle } from 'react-native';
import Shimmer from './Shimmer';
interface ShimmerProps {
  count?: number;
  style?: ViewStyle;
}

const HomeShimmer = ({ count, style }: ShimmerProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Shimmer
        style={{
          width: '100%',
          height: 130,
          borderRadius: 10,
        }}
      />
      <Shimmer
        style={{
          width: '100%',
          height: 130,
          borderRadius: 10,
          marginTop: 50,
        }}
      />
      <Shimmer
        style={{
          width: '100%',
          height: 130,
          borderRadius: 10,
          marginTop: 50,
        }}
      />
    </View>
  );
};

export default HomeShimmer;
