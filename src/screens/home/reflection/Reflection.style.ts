import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

export default StyleSheet.create({
  writeBox: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.defaultWhite,
    opacity: 0.5,
    // marginTop: 20,
  },
  writeText: {
    color: colors.lightBlack,
    fontSize: 15,
    lineHeight: 18,
    fontFamily: fonts.regular,
  },
  textContainer: {
    backgroundColor: colors.background,
    // minHeight: 180,
    // flex: 1,
  },
  textContainer2: {
    backgroundColor: colors.defaultWhite,
    // paddingVertical: 20,
    borderBottomEndRadius: 60,
    paddingHorizontal: 20,
  },
  heading: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 29,
    lineHeight: 35,
    color: colors.defaultBlack,
  },
  description: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
    color: colors.lightBlack,
    marginTop: 10,
  },
  hashTag: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 21,
    color: colors.blueTextColor,
    marginTop: 10,
  },
  bottomContainer: {
    backgroundColor: colors.background,
    paddingTop: 40,
    flex: 1,
  },
  writePageHeading: {
    fontFamily: fonts.regular,
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '300',
    color: colors.defaultBlack,
  },
  writePageDescription: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '300',
    color: colors.lightBlack,
    marginTop: 10,
  },
});
