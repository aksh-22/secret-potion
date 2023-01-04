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
    color: colors.defaultBlack,
    textAlign: 'center',
  },
  heading1: {
    fontSize: 30,
    lineHeight: 38,
    marginTop: 20,
  },
  description1: {
    opacity: 0.5,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 20,
    color: colors.defaultBlack,
    fontFamily: fonts.regular
  },
  heading2: {
    fontSize: 20,
    lineHeight: 24,
    marginTop: 30,
    fontFamily: fonts.regular
  },
  description2: {
    opacity: 0.5,
    fontSize: 15,
    lineHeight: 18,
    color: colors.defaultBlack,
    fontFamily: fonts.regular
  },
  lowerText: {
    opacity: 0.5,
    fontSize: 15,
    lineHeight: 24,
    color: colors.defaultBlack,
    marginTop: 30,
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: fonts.regular,
  },
  descriptionNew: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.defaultBlack,
    marginTop: 40,
    textAlign: 'center',
    opacity: 0.5,
    fontWeight: '300',
    fontFamily: fonts.regular,
  },
});
