import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import BarChart from 'src/components/BarChart';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import { RootStackName } from 'src/constants/routeName';
import { useAppSelector1 } from 'src/hooks/reducer';
import { wellnessDataItemType } from 'typings/wellnessData';

type Props = {
    data: Array<wellnessDataItemType>;
    stackedChart?: boolean;
    showBottomText?: boolean;
};

type IProps = {
    data1: wellnessDataItemType;
    is_plan_created: boolean;
    style?: ViewStyle;
};

const WellnessBtn = ({ data1, is_plan_created, style }: IProps) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            disabled={!data1?.id}
            onPress={() =>
                navigate(RootStackName.WELLNESS_QUESTION_UPDATE, {
                    id: data1?.id,
                    is_plan_created: is_plan_created,
                })
            }
            style={[styles.btnWrapper, style]}
        >
            <View style={[styles.btnBox, { backgroundColor: data1?.color }]} />
            <Text
                allowFontScaling={false}
                style={[styles.btnText, { textAlignVertical: 'center' }]}
            >
                {data1?.name}
            </Text>
        </TouchableOpacity>
    );
};

const BarChartComponent = ({ data, stackedChart, showBottomText }: Props) => {
    const {
        userReducer: { user },
    } = useAppSelector1();

    return (
        <View
            style={{
                backgroundColor: colors.background,
                borderRadius: 10,
                // overflow: 'hidden',
                ...globalStyle.shadow4,
            }}
        >
            <View
                style={{
                    ...globalStyle.bottomRadius10,
                    backgroundColor: colors.defaultWhite,
                    borderRadius: 10,
                }}
            >
                {data ? (
                    <BarChart stackedChart={stackedChart} data={data} />
                ) : null}
            </View>
            {showBottomText && (
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        marginTop: 10,
                        fontSize: 12,
                        marginLeft: 20,
                        opacity: 0.5,
                    }}
                >
                    Click on any label below to adjust your answer. However, you
                    cannot change it once you have made your plan.
                </Text>
            )}
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1,
                    // justifyContent: 'flex-start',
                    padding: 10,
                }}
            >
                {data?.map((el, index) => (
                    <WellnessBtn
                        is_plan_created={user?.is_plan_created}
                        data1={el}
                        key={index}
                    />
                ))}
            </View>
            {stackedChart && (
                <View style={{ alignSelf: 'center' }}>
                    <WellnessBtn
                        is_plan_created={user?.is_plan_created}
                        data1={{
                            name: 'Initial Score',
                            color: `${colors.gray}33`,
                        }}
                        style={{ marginTop: 0 }}
                    />
                </View>
            )}
        </View>
    );
};

export default BarChartComponent;

const styles = StyleSheet.create({
    btnWrapper: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '50%',
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    btnBox: {
        width: 13,
        height: 13,
        borderRadius: 4,
        marginRight: 10,
    },
    btnText: {
        // fontWeight: '400',
        fontFamily: fonts.regular,
        fontSize: 14,
        lineHeight: 14,
        color: colors.defaultBlack,
    },
});
