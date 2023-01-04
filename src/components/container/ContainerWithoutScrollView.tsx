import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import colors from 'src/constants/colors';

interface TContainer {
  style?: StyleProp<ViewStyle>;
  flex?: boolean;
  statusBarColor?: string;
  children: ReactNode;
  notUseView?: boolean;
  barStyle?: 'default' | 'light-content' | 'dark-content';
}
const ContainerWithoutScroll = ({
  style,
  flex,
  statusBarColor,
  children,
  notUseView,
  barStyle,
}: TContainer) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.background }]}>
      {/* <ScrollView
          showsVerticalScrollIndicator={false}
        //   onPress={Keyboard.dismiss}
          contentContainerStyle={[style, flex && { flex: 1 }]}
        > */}
      <StatusBar
        translucent={false}
        backgroundColor={statusBarColor ?? colors.background}
        barStyle={'dark-content'}
      />
      {notUseView === undefined ? (
        <View style={[{ flex: 1, backgroundColor: colors.background }, style]}>
          {children}
        </View>
      ) : (
        children
      )}
      {/* </ScrollView> */}
      {/* <View style={{ height: isKeyBoardOpen ? 60 : 0 }} /> */}
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default ContainerWithoutScroll;
