import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
  dotActive: {
    marginLeft: 1,
    width: 12,
    height: 12,
    backgroundColor: colors.regentBlue,
    borderRadius: 50,
    opacity: 1,
  },
  dotInActive: {
    width: 8,
    height: 8,
    backgroundColor: colors.regentBlue,
    borderRadius: 50,
    marginLeft: 1,
    // opacity: 0.5,
  },
  text: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: colors.defaultBlack,
    textAlign: 'center',
  },
  heading1: {
    fontSize: 36,
    lineHeight: 43,
    marginTop: 40,
  },
  description1: {
    opacity: 0.5,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 25,
  },
  heading2: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 30,
  },
  description2: {
    opacity: 0.5,
    fontSize: 15,
    lineHeight: 18,
  },
});
