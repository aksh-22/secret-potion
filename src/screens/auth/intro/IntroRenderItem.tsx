import React from "react";
import { Text, View } from "react-native";
import { IntroType } from "src/types/introType";
import { introStyle } from "./Intro.style";
type TIntroRenderItem = {
  item: IntroType;
};
const IntroRenderItem = ({ item }: TIntroRenderItem) => {
  return (
    <View style={[introStyle.containerRow]}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {item?.icon}
        <View style={{ marginVertical: 20 }}>
          <Text style={introStyle.headingText}>{item?.heading}</Text>
          {item?.heading2 ? (
            <Text style={introStyle.headingText}>{item?.heading2}</Text>
          ) : null}
        </View>
        <Text style={introStyle.textDescription}>{item?.description}</Text>

      </View>
    </View>
  );
};

export default IntroRenderItem;
