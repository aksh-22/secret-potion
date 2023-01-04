import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import colors from 'src/constants/colors';
import { HomeRouteNames } from 'src/constants/routeName';
import CheckIn from 'src/screens/home/CheckIn';
import Home from 'src/screens/home/Home';
import Reflection from 'src/screens/home/reflection/Reflection';
import ReflectionList from 'src/screens/home/reflection/ReflectionList';
import ReflectionReport from 'src/screens/home/reflection/ReflectionReport';
import { HomeStackParamList } from './types/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = ({ navigation }) => {
    const { Navigator, Screen } = Stack;

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name={HomeRouteNames.HOME} component={Home} />
            <Screen name={HomeRouteNames.CHECKIN} component={CheckIn} />
            <Screen name={HomeRouteNames.REFLECTION} component={Reflection} />
            <Screen
                name={HomeRouteNames.REFLECTION_LIST}
                component={ReflectionList}
            />
            <Screen
                name={HomeRouteNames.REFLECTION_REPORT}
                component={ReflectionReport}
            />
        </Navigator>
    );
};

export default HomeStackNavigator;
