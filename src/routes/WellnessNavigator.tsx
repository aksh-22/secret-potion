import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { WellnessRouteNames } from 'src/constants/routeName';
import BadgeDetails from 'src/screens/wellness/badges/BadgeDetails';
import Badges from 'src/screens/wellness/badges/Badges';
import AddPlan from 'src/screens/wellness/plan/AddPlan';
import CreatePlan from 'src/screens/wellness/plan/CreatePlan';
import MyPlan from 'src/screens/wellness/plan/MyPlan';
import Progress from 'src/screens/wellness/Progress';
import Wellness from 'src/screens/wellness/Wellness';
import WellnessLandingPage from 'src/screens/wellness/WellnessLandingPage';
import WellnessMessage from 'src/screens/wellness/WellnessMessage';
import { WellnessStackParamList } from './types/navigation';

const Stack = createStackNavigator<WellnessStackParamList>();

const WellnessNavigator = () => {
    const { Navigator, Screen } = Stack;

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name={WellnessRouteNames.WELLNESS_LANDING_PAGE}
                component={WellnessLandingPage}
            />
            <Screen
                name={WellnessRouteNames.WELLNESSFIRSTMESSAGE}
                component={WellnessMessage}
            />
            <Screen name={WellnessRouteNames.WELLNESS} component={Wellness} />
            <Screen
                name={WellnessRouteNames.CREATE_PLAN}
                component={CreatePlan}
            />
            <Screen name={WellnessRouteNames.MY_PLAN} component={MyPlan} />
            <Screen name={WellnessRouteNames.PROGRESS} component={Progress} />
            <Screen name={WellnessRouteNames.BADGES} component={Badges} />
            <Screen name={WellnessRouteNames.ADD_PLAN} component={AddPlan} />
            <Screen
                name={WellnessRouteNames.BADGE_DETAILS}
                component={BadgeDetails}
            />
        </Navigator>
    );
};

export default WellnessNavigator;

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
// import React, { useLayoutEffect } from 'react';
// import { WellnessRouteNames } from 'src/constants/routeName';
// import { useAppSelector1 } from 'src/hooks/reducer';
// import Wellness from 'src/screens/wellness/Wellness';
// import WellnessLandingPage from 'src/screens/wellness/WellnessLandingPage';
// import WellnessMessage from 'src/screens/wellness/WellnessMessage';
// import WellnessQuestion from 'src/screens/wellness/WellnessQuestion';
// import WellnessQuestionUpdate from 'src/screens/wellness/WellnessQuestionUpdate';
// import { WellnessStackParamList } from './types/navigation';

// const Stack = createStackNavigator<WellnessStackParamList>();

// const WellnessNavigator = () => {
//     const { Navigator, Screen } = Stack;

//     const {
//         userReducer: { user },
//     } = useAppSelector1();

//     const show = user?.social_wellness_avg === null;

//     return (
//         <Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             {show && (
//                 <>
//                     <Screen
//                         name={WellnessRouteNames.WELLNESS_LANDING_PAGE}
//                         component={WellnessLandingPage}
//                     />
//                     <Screen
//                         name={WellnessRouteNames.WELLNESSFIRSTMESSAGE}
//                         component={WellnessMessage}
//                     />
//                 </>
//             )}
//             <Screen name={WellnessRouteNames.WELLNESS} component={Wellness} />
//         </Navigator>
//     );
// };

// export default WellnessNavigator;
