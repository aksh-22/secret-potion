import React from 'react';
import { View, ViewStyle } from 'react-native';
import Shimmer from './Shimmer';
interface ShimmerProps {
  count?: number;
  style?: ViewStyle;
}

const CheckInShimmer = ({ count, style }: ShimmerProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Shimmer
        style={{
          width: '100%',
          height: 200,
          borderRadius: 10,
        }}
      />
      <Shimmer
        style={{
          width: '100%',
          height: 250,
          borderRadius: 10,
          marginTop: 30,
        }}
      />
      <Shimmer
        style={{
          width: '100%',
          height: 250,
          borderRadius: 10,
          marginTop: 30,
        }}
      />
    </View>
  );
};

export default CheckInShimmer;
