import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTab from 'src/components/container/ContainerTab';
import HomeBox from 'src/components/HomeBox';
import HomeShimmer from 'src/components/shimmers/HomeShimmer';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import { HomeRouteNames, WellnessRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import useAppState from 'src/hooks/useAppState';
import { dateConvertor } from 'src/utils/dateConvertToTimezone';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import moodData from 'src/utils/moodData';
import { moodType } from 'typings/checkIn';
import { reflectionType } from 'typings/reflectionType';

const data = [
    {
        // image: require('src/assets/images/checkIn.png'),
        id: 1,
        lottie: require('src/assets/lottie/checkin'),
        heading: 'Check In',
        description:
            'We would love to know how things are going! How has your day been?',
        routeName: HomeRouteNames.CHECKIN,
        SIZE: 80,
    },
    {
        id: 2,
        // image: require('src/assets/images/reflections.png'),
        lottie: require('src/assets/lottie/reflection'),
        heading: 'Reflections',
        // description:
        //     'When was the last time you did something that made you happy?',
        routeName: HomeRouteNames.REFLECTION,
        SIZE: 120,
    },
    {
        id: 3,
        // image: require('src/assets/images/progress.png'),
        lottie: require('src/assets/lottie/progressLottie'),
        heading: 'Progress',
        description:
            'Keep track of your progress and monitor your Wellness score!',
        SIZE: 170,
        routeName: WellnessRouteNames.PROGRESS,
    },
];
const Home = ({ navigation, route }) => {
    const { user } = useAppSelector((state) => state?.userReducer);

    const { appState } = useAppState();

    const [homeData, setHomeData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);

    const [inIt, setInIt] = useState(true);

    const dailyMoodData: moodType = useAppSelector(
        (state) => state?.userReducer?.moodData
    );

    const reflection: reflectionType = useAppSelector(
        (state) => state?.postReducer?.reflection
    );

    // const isCurrentDate = moment(reflection?.day_date).isSame(
    //     dateConvertor(moment(), user?.time_zone),
    //     'D'
    // );

    const [isCurrentDate, setIsCurrentDate] = useState(null);
    useEffect(() => {
        if (user?.time_zone) {
            setIsCurrentDate(
                moment(reflection?.day_date).isSame(
                    dateConvertor(moment(), user?.time_zone),
                    'D'
                )
            );
        }
    }, [user]);

    const { t } = useTranslation();

    const getReflection = () => {
        // setIsLoading(true);
        dispatch({
            type: 'GET_REFLECTION',
            payload: {
                callback: () => {
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    const getCheckInData = () => {
        // setIsLoading(true);
        dispatch({
            type: 'GET_CHECKIN',
            payload: {
                data: {
                    date: dateFormatForServer(new Date()),
                },
                callback: (data: any) => {
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    // useEffect(() => {
    //     if (appState === 'active') {
    //         getCheckInData();
    //         getReflection();
    //     }
    // }, [appState]);

    useFocusEffect(
        React.useCallback(() => {
            if (inIt) {
                setIsLoading(true);
                setInIt(false);
            } else if (appState === 'active') {
                getCheckInData();
                getReflection();
            }
        }, [appState, inIt])
    );

    useEffect(() => {
        setHomeData((prev) => {
            const temp = [...prev];
            const a = dayjs().isSame(dailyMoodData?.date, 'date');
            if (dailyMoodData?.date) {
                const el = {
                    lottie: moodData[dailyMoodData?.value - 1]?.lottie,
                    description: dailyMoodData?.mood_content,
                };
                temp[0] = { ...temp[0], ...el };
            } else {
                temp[0] = data[0];
            }

            temp[1] = { ...temp[1], description: reflection?.question };
            return temp;
        });
    }, [dailyMoodData, reflection]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'GET_PROFILE' });
    }, []);

    return (
        <ContainerTab
            contentContainerStyle2={{
                paddingBottom: SCREEN_HEIGHT > 810 ? 20 : 60,
            }}
            heading={`Welcome ${user?.fname}!`}
            statusBarColor={colors.defaultWhite}
            headerStyle={{ backgroundColor: colors.defaultWhite }}
            bounces
            onRefresh={() => {
                getReflection();
                getCheckInData();
            }}
        >
            {isLoading ? (
                <HomeShimmer />
            ) : (
                <View style={{ flex: 1, paddingTop: 0 }}>
                    {homeData?.length > 0 &&
                        homeData?.map((el, index) => (
                            <HomeBox key={index} item={el} />
                        ))}
                </View>
            )}
        </ContainerTab>
    );
};

export default Home;
