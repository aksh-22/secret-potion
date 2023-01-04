import { Platform, StyleSheet } from "react-native";
import colors from "src/constants/colors";
import { SCREEN_HEIGHT } from "src/constants/deviceInfo";
import { fonts } from "src/constants/fonts";

export default StyleSheet.create({
  writeText: {
    fontFamily: fonts.regular,
    color: colors.lightBlack,
    marginVertical: 20,
    paddingHorizontal: 10,
    fontSize: 15,
    lineHeight: 18,
  },
  inputContainer: {
    backgroundColor: colors.defaultWhite,
    flex: 0.9,
    borderRadius: 10,
    padding: 10,
    paddingBottom: 50,
    // height: 300,
    paddingTop: 0,
  },
  button: {
    marginTop: -30,
    alignSelf: "center",
  },
  textView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 5,
  },
  title: {
    fontFamily: fonts.regular,
    color: colors.defaultBlack,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
    // marginTop: 5,
    flex: 1,
  },
  date: {
    fontFamily: fonts.regular,
    color: colors.lightBlack,
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    // marginBottom: 5,
  },
});
