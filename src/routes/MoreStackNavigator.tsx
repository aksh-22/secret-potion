import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import colors from 'src/constants/colors';
import { MoreRouteNames } from 'src/constants/routeName';
import Connection from 'src/screens/more/connection/Connection';
import More from 'src/screens/more/More';
import NotificationSettings from 'src/screens/more/settings/NotificationSettings';
import Settings from 'src/screens/more/settings/Settings';
import { MoreStackParamList } from './types/navigation';

const Stack = createStackNavigator<MoreStackParamList>();

const MoreStackNavigator = ({ navigation }) => {
    const { Navigator, Screen } = Stack;

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen name={MoreRouteNames.MORE} component={More} />
            <Screen name={MoreRouteNames.CONNECTION} component={Connection} />

            <Screen name={MoreRouteNames.SETTINGS} component={Settings} />
            <Screen
                name={MoreRouteNames.NOTIFICATION_SETTINGS}
                component={NotificationSettings}
            />
        </Navigator>
    );
};

export default MoreStackNavigator;
