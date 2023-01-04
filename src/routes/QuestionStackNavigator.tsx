import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { QuestionsRouteNames } from "src/constants/routeName";
import Questions from "src/screens/questions/Questions";
import { QuestionStackParamList } from "./types/navigation";

const Stack = createStackNavigator<QuestionStackParamList>();
const QuestionStackNavigator = () => {
  const { Navigator, Screen } = Stack;
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={QuestionsRouteNames.QUESTIONS} component={Questions} />
    </Navigator>
  );
};

export default QuestionStackNavigator;
