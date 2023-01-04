import { StyleSheet } from "react-native";
import colors from "src/constants/colors";
import { fonts } from "src/constants/fonts";

export default StyleSheet.create({
  topText: {
    color: colors.defaultBlack,
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 22,
  },
  activeTab: {
    borderBottomColor: colors.defaultBlack,
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginRight: 40,
  },
  inActiveTab: {
    paddingBottom: 10,
    marginRight: 40,
    // opacity: 0.4,
    borderBottomColor: colors.transparent,
    borderBottomWidth: 2,
  },
  welcomeTxt: {
    marginTop: 70,
    color: colors.defaultBlack,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: "300",
    fontFamily: fonts.regular
  },
  forgotPassText: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "300",
    fontFamily: fonts.regular,
  },
});
