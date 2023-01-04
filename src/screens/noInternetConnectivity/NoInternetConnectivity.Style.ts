import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
// import fonts from 'src/constants/fonts';

const NoInternetConnectivityStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    backgroundColor: colors.background,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: 32,
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
    opacity: 0.6,
    marginVertical: 30,
  },
});

export default NoInternetConnectivityStyle;
