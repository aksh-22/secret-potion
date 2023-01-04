import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chart from 'src/components/chart/Chart';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import { useAppSelector } from 'src/hooks/reducer';
import { getMonth, getMonth2 } from 'src/utils/dateFormatter';
import { userProfileType } from 'typings/user';

type Props = {
    groupChart?: boolean;
    data1?: any;
    data2?: any;
    onAddDate?: () => void;
    onSubtractDate?: () => void;
    isLoading?: boolean;
    currentDate: any;
};

const ChartComponent = ({
    groupChart,
    data1,
    data2,
    onAddDate,
    onSubtractDate,
    isLoading,
    currentDate,
}: Props) => {
    const { t } = useTranslation();

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );

    let date = '';

    const isSame = dayjs().isSame(currentDate, 'month');
    const isSamePrev = dayjs(currentDate).isSame(user?.create_date, 'month');

    const aa = dayjs(currentDate)
        .subtract(1, 'month')
        .isSame(currentDate, 'year');

    if (!groupChart) {
        date = getMonth(currentDate);
    } else {
        if (
            dayjs(currentDate).subtract(1, 'month').isSame(currentDate, 'year')
        ) {
            date = `${getMonth2(
                dayjs(currentDate).subtract(1, 'month')
            )} vs ${getMonth(dayjs(currentDate))}`;
        } else {
            date = `${getMonth(
                dayjs(currentDate).subtract(1, 'month')
            )} vs ${getMonth(dayjs(currentDate))}`;
        }
    }
    return (
        <View
            style={{
                flex: 1,
                // justifyContent: 'center',
                marginTop: 30,

                backgroundColor: colors.background4,
                minHeight: 300,
                ...globalStyle.shadow4,
                borderRadius: 10,
            }}
        >
            <View style={{ overflow: 'hidden', borderRadius: 10, flex: 1 }}>
                {isLoading && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 20,
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            right: 0,
                            top: 0,
                            backgroundColor: colors.blackOpacity,
                            zIndex: 1001,
                            borderRadius: 10,
                        }}
                    >
                        <ActivityIndicator
                            color={colors.regentBlue}
                            size={80}
                        />
                    </View>
                )}
                {groupChart && (
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingTop: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.defaultWhite,
                            zIndex: 1,
                        }}
                    >
                        <View
                            style={[
                                styles.dot,
                                { borderColor: colors.Candlelight },
                            ]}
                        />
                        <Text style={styles.text}>
                            {dayjs(
                                dayjs(currentDate).subtract(1, 'month')
                            ).format('MMM')}
                        </Text>

                        <View
                            style={[
                                styles.dot,
                                { borderColor: colors.regentBlue },
                            ]}
                        />

                        <Text style={styles.text}>
                            {dayjs(currentDate).format('MMM')}
                        </Text>
                    </View>
                )}
                {groupChart ? (
                    data2 && data2?.length > 0 ? (
                        <Chart
                            data1={data1}
                            data2={data2}
                            groupChart={groupChart}
                        />
                    ) : (
                        <EmptyPlaceholder
                            textStyle={{ fontSize: 24 }}
                            style={{
                                paddingBottom: 20,
                                backgroundColor: colors.defaultWhite,
                                borderRadius: 10,
                            }}
                            size={100}
                            text={t('home:noPrevData')}
                        />
                    )
                ) : data1 && data1?.length > 0 ? (
                    <Chart data1={data1} groupChart={groupChart} />
                ) : (
                    <View style={{ flex: 1 }}>
                        <EmptyPlaceholder
                            style={{
                                paddingBottom: 20,
                                backgroundColor: colors.defaultWhite,
                                borderRadius: 10,
                            }}
                            size={100}
                            text={t('home:noData')}
                        />
                    </View>
                )}
                {/* {data1?.length ? (
        groupChart ? (
          data2?.length ? (
            <Chart data1={data1} data2={data2} groupChart={groupChart} />
          ) : (
            <EmptyPlaceholder
              textStyle={{ fontSize: 24 }}
              style={{
                paddingBottom: 20,
                backgroundColor: colors.defaultWhite,
                borderRadius: 10,
              }}
              size={100}
              text={t('home:noPrevData')}
            />
          )
        ) : (
          <Chart data1={data1} data2={data2} groupChart={groupChart} />
        )
      ) : (
        <EmptyPlaceholder
          style={{ paddingBottom: 20 }}
          size={100}
          text={t('home:noData')}
        />
      )} */}
                <View
                    style={{
                        backgroundColor: colors.background4,
                        flexDirection: 'row',
                        // flex: 1,
                        // width: '100%',
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        padding: 10,
                    }}
                >
                    <TouchableOpacity
                        disabled={isSamePrev}
                        onPress={onSubtractDate}
                    >
                        <Ionicons
                            style={{ paddingLeft: 10 }}
                            name='chevron-back-sharp'
                            size={22}
                            color={
                                isSamePrev
                                    ? colors.linkWater
                                    : colors.regentBlue
                            }
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <MaterialCommunityIcons
                            color={colors.regentBlue}
                            name='calendar-month'
                            size={20}
                        />
                        <Text
                            style={{
                                color: colors.defaultBlack,
                                marginLeft: 10,
                                fontFamily: fonts.regular,
                            }}
                        >
                            {date}
                        </Text>
                    </View>
                    <TouchableOpacity disabled={isSame} onPress={onAddDate}>
                        <Ionicons
                            style={{ paddingLeft: 10 }}
                            name='chevron-forward-sharp'
                            size={22}
                            color={
                                isSame ? colors.linkWater : colors.regentBlue
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChartComponent;

const styles = StyleSheet.create({
    text: {
        fontFamily: fonts.regular,
        color: colors.defaultBlack,
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        marginHorizontal: 5,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 50,
        borderWidth: 2,
    },
});
