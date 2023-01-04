import { StyleSheet } from "react-native";
import colors from "src/constants/colors";
import { fonts } from "src/constants/fonts";
import { globalStyle } from "src/constants/global.style";

export default StyleSheet.create({
  slide: {
    backgroundColor: colors.transparent,
    // height: 120,
    // width: 100,
    justifyContent: "center",
    alignItems: "center",

  },
  title: {
    fontSize: 15,
    color: colors.lightBlack,
    textAlign: "center",
    fontFamily: fonts.regular,
    fontWeight: "900",
  },
  container: {
    backgroundColor: colors.defaultWhite,
    borderRadius: 10,
    paddingVertical: 20,
    // overflow: "hidden",
    paddingBottom: 30,
    minHeight: 200,
    ...globalStyle.shadow4
  },
  heading: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 24,
    color: colors.defaultBlack,
    textAlign: "center",
    marginBottom: 20,
  },
});
