import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BarChart as StackBarChart } from 'react-native-gifted-charts';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { wellnessDataItemType } from 'typings/wellnessData';

type Props = {
    data: Array<wellnessDataItemType>;
    stackedChart?: boolean;
};

const BarChart = ({ data, stackedChart = false }: Props) => {
    const barData = data?.map((el) => {
        return {
            value: parseInt(el?.percentage) - 15,
            gradientColor: el?.color,
            borderRadius: 5,
            topLabelComponent: () => (
                <Text
                    style={{
                        // color: 'blue',
                        // fontSize: 18,
                        marginBottom: 2,
                        fontSize: 10,
                        fontFamily: fonts.regular,
                        color: colors.defaultBlack,
                    }}
                >
                    {parseInt(el?.percentage)}%
                </Text>
            ),
        };
    });

    const stackData = [];

    data?.forEach((el) => {
        stackData.push({
            value: parseInt(el?.percentage),
            gradientColor: `${colors?.gray}33`,
            // gradientColor: `${el?.color}33`,
            color: colors.defaultWhite,
            spacing: 3,
            topLabelComponent: () => (
                <Text
                    style={{
                        fontSize: 8,
                        fontFamily: fonts.regular,
                        color: colors.defaultBlack,
                        marginBottom: 5,
                    }}
                >
                    {parseInt(el?.percentage)}%
                </Text>
            ),
        });
        stackData.push({
            value: el?.current,
            gradientColor: el?.color,
            color: colors.defaultWhite,
            topLabelComponent: () => (
                <Text
                    style={{
                        fontSize: 8,
                        fontFamily: fonts.regular,
                        color: colors.defaultBlack,
                        marginBottom: 5,
                    }}
                >
                    {parseInt(el?.current)}%
                </Text>
            ),
        });
    });

    return (
        <View>
            {stackedChart ? (
                <StackBarChart
                    width={SCREEN_WIDTH - 80}
                    // rotateLabel
                    noOfSections={4}
                    data={stackData}
                    // disableScroll
                    disablePress
                    // barBorderRadius={7}
                    xAxisColor={colors.borderColor}
                    xAxisType='dashed'
                    yAxisColor={colors.borderColor}
                    yAxisTextStyle={{ color: colors.borderColor }}
                    showYAxisIndices
                    dashGap={10}
                    isAnimated
                    rulesType={'dashed'}
                    // roundedTop
                    // roundedBottom={false}
                    maxValue={100}
                    initialSpacing={
                        Platform.OS === 'ios'
                            ? SCREEN_WIDTH * 0.04
                            : SCREEN_WIDTH * 0.03
                    }
                    spacing={
                        Platform.OS === 'ios'
                            ? SCREEN_WIDTH * 0.07
                            : SCREEN_WIDTH * 0.05
                    }
                    stepValue={25}
                    roundedBottom={false}
                    showGradient
                    barBorderRadius={7}
                    barWidth={Platform.OS === 'ios' ? 25 : 22}
                    // showLine
                    // referenceLine2Config={{
                    //     color: 'gray',
                    //     dashWidth: 2,
                    //     dashGap: 3,
                    // }}
                    // barBackgroundPattern={MyPattern}
                    frontColor='#fff'
                    // barBackgroundPattern={MyPattern}
                />
            ) : (
                <StackBarChart
                    width={SCREEN_WIDTH - 80}
                    data={barData}
                    disableScroll
                    disablePress
                    barWidth={30}
                    maxValue={100}
                    initialSpacing={SCREEN_WIDTH * 0.07}
                    spacing={SCREEN_WIDTH * 0.1}
                    yAxisTextStyle={{ color: colors.borderColor }}
                    noOfSections={4}
                    barBorderRadius={5}
                    xAxisColor={colors.borderColor}
                    xAxisType='dashed'
                    yAxisColor={colors.borderColor}
                    showGradient
                    frontColor='#fff'
                    roundedBottom={false}
                    // showVerticalLines={true}
                    // verticalLinesZIndex={1}
                    // verticalLinesColor='#000'
                    // rulesType={'dashed'}
                    // noOfVerticalLines={5}
                />
            )}
        </View>
        // <View
        //   style={{
        //     alignItems: 'flex-start',
        //     paddingTop: 30,
        //     paddingRight: 20,
        //     overflow: 'hidden',
        //     // backgroundColor: 'red',
        //     width: SCREEN_WIDTH - 70,
        //   }}
        // >
        //   <Bar
        //     data={data1}
        //     width={SCREEN_WIDTH + 20}
        //     height={220}
        //     fromZero={true}
        //     withInnerLines={true}
        //     chartConfig={{
        //       backgroundGradientFrom: '#fff',
        //       backgroundGradientFromOpacity: 0,
        //       backgroundGradientTo: '#fff',
        //       backgroundGradientToOpacity: 0.5,
        //       decimalPlaces: 0, // optional, defaults to 2dp
        //       color: (o) => `rgba(0, 0, 0, ${o})`,
        //       labelColor: () => colors.defaultBlack,
        //       style: {
        //         borderRadius: 30,
        //       },
        //       // formatYLabel: () => yLabelIterator.next().value,
        //       useShadowColorFromDataset: false, // optional
        //       formatTopBarValue: (val: any) => `${parseInt(val)}%`,
        //       paddingTop: 10,
        //       barRadius: 5,
        //       barPercentage: 0.7,
        //       propsForBackgroundLines: {
        //         strokeDasharray: '4 8',
        //         strokeDashoffset: 5,
        //         strokeWidth: 1,
        //         x: 40,
        //       },
        //       propsForLabels: {
        //         fontFamily: fonts.regular,
        //         fill: colors.defaultBlack,
        //       },
        //     }}
        //     yAxisInterval={25}
        //     yLabelsOffset={20}
        //     withHorizontalLabels
        //     withVerticalLabels
        //     // yLabelsOffset={0}
        //     withCustomBarColorFromData={true}
        //     showValuesOnTopOfBars
        //     showBarTops={false}
        //   />
        // </View>
    );
};

export default BarChart;

const styles = StyleSheet.create({
    a: {
        borderTopStartRadius: 10,
    },
});
