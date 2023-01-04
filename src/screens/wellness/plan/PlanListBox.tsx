import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Pressable,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Right from 'src/assets/svg/right.svg';
import colors from 'src/constants/colors';
import { globalStyle } from 'src/constants/global.style';
import { WellnessRouteNames } from 'src/constants/routeName';
import { join_communityItemType } from 'typings/activityType';
import styles from './Plan.style';

type Props = {
    item: join_communityItemType;
    style?: ViewStyle;
    wellnessId?: number;
    onItemAdd?: (data: any, index?: number) => void;
    isEdit?: boolean;
    index?: number;
    text?: string;
    onRightPress?: (data?: any) => void;
    activityDisabled?: boolean;
};

const PlanListBox = ({
    item: data,
    style,
    onRightPress,
    activityDisabled,
    wellnessId,
    onItemAdd,
    index,
}: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const [item, setItem] = useState<join_communityItemType>();

    useEffect(() => {
        setItem(data);
    }, [data]);

    return (
        <Pressable
            style={[
                {
                    // height: 80,
                    flex: 1,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginHorizontal: 20,
                    marginVertical: 10,
                },
                globalStyle.shadow4,
                style,
            ]}
            onPress={() =>
                navigate(WellnessRouteNames.ADD_PLAN, {
                    wellness_id: wellnessId,
                    name: item?.name,
                    description: item?.description,
                    isAdmin: item?.is_admin,
                    activity_id: item?.id,
                    onItemAdd: onItemAdd,
                    isEdit: true,
                    index,
                    heading: item?.name,
                    modalDescription: item?.description,
                    dayData: item?.day?.map((el) => el?.day_name),
                })
            }
        >
            <LinearGradient
                style={{
                    // height: 110,
                    flex: 1,
                    // margin: 10,
                    // borderRadius: 10,
                    // padding: 10,
                }}
                // colors={color}
                colors={
                    item?.background ?? [
                        colors.regentBlue,
                        colors.regentBlueOpacity,
                    ]
                }
            >
                <View style={{ padding: 10 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={[styles.itemHeading, { fontSize: 15 }]}
                        >
                            {item?.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Pressable
                                hitSlop={30}
                                onPress={onRightPress}
                                disabled={activityDisabled}
                                style={{
                                    backgroundColor: item?.is_completed
                                        ? colors.downy
                                        : colors.lightBlack2,
                                    borderRadius: 30,
                                    height: 25,
                                    width: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Right
                                    fill={
                                        item?.is_completed
                                            ? colors.defaultWhite
                                            : colors.blackOpacity2
                                    }
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    );
};

export default PlanListBox;
