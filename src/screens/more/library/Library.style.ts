import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';

const MARGIN = 10;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    width: SCREEN_WIDTH / 2 - MARGIN * 2,
    minHeight: 220,
    margin: MARGIN,
    borderRadius: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
    fontWeight: '400',
  },
  description: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: fonts.regular,
    color: colors.defaultBlack2,
    fontWeight: '400',
  },
  bottomText: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: fonts.regular,
    color: colors.regentBlue,
    fontWeight: '400',
    marginLeft: 5,
  },
  bottomText2: {
    fontSize: 13,
    // lineHeight: 12,
    fontFamily: fonts.regular,
    color: colors.regentBlue,
    fontWeight: '400',
    marginLeft: 5,
  },
  imageStyle: {
    height: 100,
    width: '100%',
    backgroundColor: colors.regentBlue,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageDetailsStyle: {
    height: 200,
    width: '100%',
    backgroundColor: colors.regentBlue,
    borderRadius: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    lineHeight: 20
    // opacity: 0.5,
  },
  headingText: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    lineHeight: 25,
    fontSize: 20,
    opacity: 1
  },
  liStyles: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    // lineHeight: 25,
    marginBottom: 20
  },
  olStyles: {
    lineHeight: 20
    // justifyContent: 'space-between',
    // alignItems: 'center'
  }
});
