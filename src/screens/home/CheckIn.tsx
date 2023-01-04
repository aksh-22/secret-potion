import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BackHandler, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomCarousel from 'src/components/carousel/CustomCarousel';
import ContainerTab from 'src/components/container/ContainerTab';
import InitialLoader from 'src/components/InitialLoader';
import CheckInShimmer from 'src/components/shimmers/CheckInShimmer';
import SuccessFullAnimation from 'src/components/SuccessFullAnimation';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import {
    dateConvertor,
    dateConvertorWithFormat,
} from 'src/utils/dateConvertToTimezone';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { checkInType, moodType } from 'typings/checkIn';
import ChartComponent from './ChartComponent';

type Props = {
    navigation?: any;
};

const CheckIn = ({ navigation }: Props) => {
    const { t } = useTranslation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMoodData, setIsLoadingMoodData] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    // const [CheckInData, setCheckInData] = useState<checkInType>({});
    const [moodData, setMoodData] = useState<checkInType>();
    const [currDate, setCurrDate] = useState<any>(new Date());

    const [showData, setShowData] = useState(false);

    const dailyMoodData: moodType = useAppSelector(
        (state) => state?.userReducer?.moodData
    );

    const { user } = useAppSelector((state) => state?.userReducer);

    const { navigate, goBack, replace, canGoBack } =
        useNavigation<NativeStackNavigationProp<any>>();

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
            if (showSuccess) {
                e.preventDefault();
                setShowSuccess(false);
            }
        });
        return unsubscribe;
    }, [showSuccess]);

    const getMoodData = (date: any) => {
        console.log('date', date);
        console.log(
            'dateConvertorWithFormat(date, user?.time_zone)',
            dateConvertorWithFormat(new Date(date), user?.time_zone)
        );
        console.log(
            'dateConvertorWithFormat(date, user?.time_zone)',
            dateConvertorWithFormat(date, user?.time_zone)
        );
        setIsLoadingMoodData(true);
        dispatch({
            type: 'GET_MOOD_DATA',
            payload: {
                data: {
                    date: dateConvertorWithFormat(
                        new Date(date),
                        user?.time_zone
                    ),
                },
                callback: (data: any) => {
                    setMoodData(data);
                    setIsLoadingMoodData(false);
                },
                errorCallback: () => {
                    setIsLoadingMoodData(false);
                },
            },
        });
    };

    const onMoodUpdate = (mood_number: number) => {
        setIsLoading2(true);
        setShowSuccess(true);
        dispatch({
            type: 'UPDATE_MOOD',
            payload: {
                data: {
                    mood_date: dateFormatForServer(
                        dateConvertor(moment(), user?.time_zone)
                    ),
                    mood_number: mood_number,
                },
                callback: (data: any) => {
                    // setCheckInData(data);
                    setIsLoading2(false);
                    getMoodData(currDate);
                },
                errorCallback: (data: any) => {
                    // setCheckInData(data);
                    setIsLoading2(false);
                    setShowSuccess(false);
                },
                finallyCallback: (data: any) => {
                    // setCheckInData(data);
                    setIsLoading2(false);
                },
            },
        });
    };

    useEffect(() => {
        // getCheckInData();
        getMoodData(new Date());
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (canGoBack()) {
                goBack();
            } else {
                replace(RootStackName.BOTTOMTAB);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return showData ? (
        <>
            <ContainerTab
                isBack
                backBtnPress={() => {
                    if (canGoBack()) {
                        goBack();
                    } else {
                        replace(RootStackName.BOTTOMTAB);
                    }
                }}
                heading={t('home:howDay')}
            >
                {isLoading ? (
                    <CheckInShimmer />
                ) : (
                    <>
                        <CustomCarousel
                            startIndex={dailyMoodData?.value}
                            onItemPress={(item) => {
                                onMoodUpdate(item?.value);
                            }}
                        />
                        <ChartComponent
                            currentDate={currDate}
                            isLoading={isLoadingMoodData}
                            data1={moodData?.month_mood?.map((el, index) => {
                                return {
                                    x: `D${dayjs(el?.date).format('D')}`,
                                    y: el?.value,
                                    // y: el?.mood_name,
                                };
                            })}
                            onAddDate={() => {
                                const date = dayjs(currDate).add(1, 'month');
                                setCurrDate(date);
                                getMoodData(date);
                            }}
                            onSubtractDate={() => {
                                // getMoodData();
                                const date = dayjs(currDate).subtract(
                                    1,
                                    'month'
                                );
                                setCurrDate(date);
                                getMoodData(date);
                            }}
                        />
                        <ChartComponent
                            currentDate={currDate}
                            isLoading={isLoadingMoodData}
                            data1={moodData?.month_mood?.map((el) => {
                                return {
                                    x: `D${dayjs(el?.date).format('D')}`,
                                    y: el?.value,
                                    // y: el?.mood_name,
                                };
                            })}
                            data2={moodData?.last_month_mood?.map((el) => {
                                return {
                                    x: `D${dayjs(el?.date).format('D')}`,
                                    y: el?.value,
                                    // y: el?.mood_name,
                                };
                            })}
                            groupChart
                            onAddDate={() => {
                                const date = dayjs(currDate).add(1, 'month');
                                setCurrDate(date);
                                getMoodData(date);
                            }}
                            onSubtractDate={() => {
                                const date = dayjs(currDate).subtract(
                                    1,
                                    'month'
                                );
                                setCurrDate(date);
                                getMoodData(date);
                            }}
                        />
                    </>
                )}
            </ContainerTab>
            {showSuccess ? (
                <SuccessFullAnimation
                    onClose={() => {
                        setShowSuccess(false);
                    }}
                    moodDetails={dailyMoodData}
                    isLoading={isLoading2}
                    onButtonPress={() => setShowSuccess(false)}
                />
            ) : null}
        </>
    ) : (
        <InitialLoader />
    );
};

export default CheckIn;

const styles = StyleSheet.create({});
