import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';

type Props = {};

const InitialLoader = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={colors.regentBlue} size={50} />
    </View>
  );
};

export default InitialLoader;
