import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from 'react-native-svg';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import moodData from 'src/utils/moodData';

import { fonts } from 'src/constants/fonts';
import {
    VictoryArea,
    VictoryAxis,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
} from 'victory-native';
type Props = {
    groupChart?: boolean | undefined;
    data1?: any[];
    data2?: any[];
};

const month1 = [...Array(31).fill('')];

const a = [...moodData];
a.reverse();

const Chart = ({ groupChart, data1, data2 }: Props) => {
    const month3 = month1.map((el, index) => `D${index + 1}`);

    const DotYellow = ({ x, y }: { x?: any; y?: any }): any => {
        return <Circle x={x} y={y + 3} r={3} fill={colors.Candlelight} />;
    };

    const DotBlue = ({ x, y }: { x?: any; y?: any }): any => {
        return <Circle x={x} y={y} r={3} fill={colors.regentBlue} />;
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: colors.defaultWhite,
                    position: 'absolute',
                    top: 133,
                    bottom: 73,
                    left: 28,
                    width: 20,
                    justifyContent: 'space-between',
                    zIndex: 10,
                    alignItems: 'center',
                }}
            >
                {a?.map((item, index) => (
                    <LottieView
                        key={index}
                        source={item.lottie}
                        autoPlay
                        style={{ width: item.size, height: item.size }}
                        // onAnimationFinish={onAnimationFinish}
                        loop={true}
                        autoSize
                    />
                ))}
            </View>
            <VictoryChart
                // style={{ parent: { marginLeft: 20, padding: 0 } }}
                width={SCREEN_WIDTH - 40}
                height={300}
                // padding={30}
                style={{ background: { overflow: 'visible' } }}
            >
                {/* <VictoryLabel  /> */}
                <VictoryAxis
                    style={{
                        grid: {
                            stroke: colors.lightBlack2,
                            strokeWidth: 1.5,
                            strokeDasharray: '4 , 8',
                        },
                        ticks: { fontSize: 10 },
                        axis: {
                            stroke: colors.lightBlack2,
                            strokeWidth: 1.5,
                            strokeDasharray: '4 , 8',
                        },
                        axisLabel: {
                            fontSize: 10,
                            fontFamily: fonts.regular,
                            color: colors.lightBlack,
                        },
                    }}
                    label='(Mood)'
                    axisLabelComponent={<VictoryLabel dx={-5} />}
                    // axisLabelComponent={<Label />}
                    // axisLabelComponent={<VictoryLabel dy={20} />}
                    dependentAxis
                    // tickFormat={['Good', 'Bad', 'Awful', 'Awesome', 'Okay']}]
                    tickValues={['1', '2', '3', '4', '5', '0']}
                    tickFormat={['', '', '', '', '', '']}
                    // tickFormat={['😣', '😟', '😐', '😇', '😎', '']}
                />
                <VictoryAxis
                    style={{
                        grid: {
                            stroke: colors.lightBlack2,
                            strokeWidth: 1.5,
                            strokeDasharray: '4 , 8',
                        },
                        axisLabel: {
                            fontSize: 10,
                            fontFamily: fonts.regular,
                            color: colors.lightBlack,
                        },
                        axis: {
                            stroke: colors.lightBlack2,
                            strokeWidth: 1.5,
                            strokeDasharray: '4 , 8',
                        },
                        ticks: { fontFamily: fonts.regular },
                        tickLabels: {
                            color: colors.red,
                            fontFamily: fonts.regular,
                        },
                    }}
                    // labelComponent={<VictoryLabel angle={-45} textAnchor='end' />}
                    fixLabelOverlap
                    axisLabelComponent={<VictoryLabel dy={5} />}
                    // tickCount={5}
                    tickFormat={month3}
                    label='(Date)'
                />

                <VictoryGroup
                    style={{
                        data: { strokeWidth: 3, fillOpacity: 0.4 },
                        border: { padding: 0 },
                        parent: { padding: 0 },
                    }}
                >
                    {data2?.length ? (
                        <VictoryArea
                            labels={({ data, index }) => {
                                return index;
                            }}
                            labelComponent={<DotYellow />}
                            style={{
                                data: {
                                    fill: colors.Candlelight,
                                    stroke: colors.Candlelight,
                                },
                            }}
                            data={[{ x: 'D0', y: 0 }, ...data2]}
                        />
                    ) : null}
                    {data1?.length ? (
                        <VictoryArea
                            labels={({ data, index }) => {
                                return index;
                            }}
                            labelComponent={<DotBlue />}
                            style={{
                                data: {
                                    fill: colors.regentBlue,
                                    stroke: colors.regentBlue,
                                },
                                parent: { padding: 0 },
                            }}
                            data={[{ x: 'D1', y: 0 }, ...data1]}
                        />
                    ) : null}
                </VictoryGroup>
            </VictoryChart>
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        // minHeight: 220,
    },
    container: {
        flex: 1,
        marginTop: -80,
        backgroundColor: colors.defaultWhite,
        borderRadius: 10,
        paddingTop: 60,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
});
