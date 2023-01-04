import { StyleSheet } from 'react-native';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';

export default StyleSheet.create({
  question: {
    color: colors.defaultBlack,
    fontWeight: '400',
    lineHeight: 29,
    fontSize: 24,
    marginTop: 30,
    fontFamily: fonts.regular,
  },
  questionText: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '400',
    color: colors.defaultBlack,
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: colors.regentBlue,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    top: -15,
  },
  description: {
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'justify',
    fontFamily: fonts.regular,
    color: colors.lightBlack,
    marginTop: 20,
  },
  heading: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
  },
  wellnessPlanBox: {
    borderRadius: 10,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.defaultWhite,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 15,
  },
  boxText: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: colors.defaultBlack,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
  boxIconWrapper: {
    backgroundColor: colors.regentBlue,
    borderRadius: 50,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeBox: {
    backgroundColor: colors.defaultWhite,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    ...globalStyle.shadow4
  }
});
