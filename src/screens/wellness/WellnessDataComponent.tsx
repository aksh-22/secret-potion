import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import CustomModal from 'src/components/CustomModal';
import InitialLoader from 'src/components/InitialLoader';
import CheckInShimmer from 'src/components/shimmers/CheckInShimmer';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { wellnessDataType } from 'typings/wellnessData';
import BarChartComponent from './BarChartComponent';
import CircularChartComponent from './CircularChartComponent';

const fail = {
    wellness: [
        {
            id: 1,
            name: 'Cognitive Wellness',
            content:
                'Cognitive wellness refers to the ability to clearly think, learn, and remember information.',
            color: '#0DC41D',
            avg: 1,
            percentage: '0.00',
        },
        {
            id: 2,
            name: 'Emotional Wellness',
            content:
                "Emotional wellness is the ability to successfully handle life's stresses and adapt to change and difficult times",
            color: '#74DCE1',
            avg: 1,
            percentage: '0.00',
        },
        {
            id: 3,
            name: 'Physical Wellness',
            content:
                'Physical wellness is the ability to maintain a quality of life that allows you to get the most out of your daily activities without undue fatigue or physical stress.',
            color: '#FFDA25',
            avg: 1,
            percentage: '0.00',
        },
        {
            id: 4,
            name: 'Social Wellness',
            content:
                'Social wellness is the ability to form and maintain relationships with others and to interact and promote healthy communication within those relationships.',
            color: '#F4A0BE',
            avg: 1,
            percentage: '0.00',
        },
    ],
    overall_avg: 0,
    overall_avg_percentag: '0.00',
    overall_content:
        'The overall wellness score indicates how far along you are in achieving your ideal wellness. For example, a 30% Cognitive Wellness score indicates low Cognitive Wellness and you may need to work on this aspect to achieve your ideal overall score.\r\nA 100% wellness score indicates that wellness is at an ideal level. You need to keep working on your wellness plan regularly to ensure that it remains at 100%.',
};

// import BarChartComponent from './barChartComponent';

const WellnessDataComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [show, setShow] = useState(false);

    const [wellnessData, setWellnessData] = useState<wellnessDataType>({});

    const [showData, setShowData] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        getWellness();
    }, []);

    useEffect(() => {
        const listener: any = EventRegister.on('WellnessReload', getWellness);

        return () => {
            EventRegister.removeEventListener(listener);
        };
    }, []);

    const getWellness = () => {
        setIsLoading(true);
        dispatch({
            type: 'GET_WELLNESS',
            payload: {
                callback: (res: wellnessDataType) => {
                    setWellnessData(res);
                },
                errorCallback: () => {
                    !wellnessData && setWellnessData(fail);
                },
                finallyCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
            },
        });
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getWellness();
    };

    return showData ? (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshLoading}
                    onRefresh={onRefresh}
                    tintColor={colors.regentBlue}
                    colors={[colors.regentBlue, colors.red]}
                    title='Pull to refresh'
                    titleColor={colors.regentBlue}
                />
            }
            contentContainerStyle={{ paddingBottom: 120 }}
        >
            <View
                style={{
                    backgroundColor: colors.defaultWhite,
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontWeight: '400',
                        fontSize: 25,
                        lineHeight: 30,
                        color: colors.defaultBlack,
                    }}
                >
                    Current Wellness Score
                </Text>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
                {isLoading ? (
                    <CheckInShimmer />
                ) : (
                    <>
                        <BarChartComponent
                            stackedChart
                            data={wellnessData?.wellness}
                        />
                        <CircularChartComponent
                            onPress={() => setShow(true)}
                            progress={wellnessData?.new_overall_avg_percentag}
                        />
                    </>
                )}
            </View>
            <CustomModal
                childrenStyle={{ justifyContent: 'center' }}
                // childrenViewStyle={{ flex: 0.4 }}
                onClose={() => setShow(false)}
                isOpen={show}
            >
                <View
                    style={{
                        backgroundColor: colors.defaultWhite,
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setShow(false)}
                        style={styles.iconWrapper}
                    >
                        <Ionicons
                            name='close'
                            size={20}
                            color={colors.defaultWhite}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>{t('wellness:overall')}</Text>
                    <Text style={styles.description}>
                        {wellnessData?.overall_content}
                    </Text>
                </View>
            </CustomModal>
        </ScrollView>
    ) : (
        <InitialLoader />
    );
};

export default WellnessDataComponent;

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'center',
        fontFamily: fonts.regular,
        color: colors.defaultBlack,
    },
    description: {
        fontSize: 15,
        lineHeight: 19,
        textAlign: 'justify',
        fontFamily: fonts.regular,
        color: colors.defaultBlack,
        marginTop: 20,
        opacity: 0.5,
    },
    iconWrapper: {
        backgroundColor: colors.regentBlue,
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: -15,
    },
});
