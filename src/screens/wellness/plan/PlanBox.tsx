import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    Pressable,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddIcon from 'src/assets/svg/add.svg';
import RightArrow from 'src/assets/svg/rightArrow.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
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
    onDeletePress?: (data?: any) => void;
    disabledBox?: boolean;
    showDays?: boolean;
};

const PlanBox = ({
    item,
    style,
    wellnessId,
    onItemAdd,
    isEdit,
    index,
    text = 'Edit',
    onDeletePress,
    disabledBox,
    showDays = true,
}: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <TouchableOpacity
            style={[
                {
                    minHeight: 120,
                    // flex: 0.5,
                    borderRadius: 10,
                    overflow: 'hidden',
                    marginLeft: 20,
                    marginVertical: 10,
                    width: '45%',
                },
                globalStyle.shadow4,
                style,
            ]}
            disabled={disabledBox}
            onPress={() => {
                !disabledBox &&
                    navigate(WellnessRouteNames.ADD_PLAN, {
                        wellness_id: item?.wellness_id,
                        name: item?.name,
                        description: item?.description,
                        isAdmin: item?.is_admin,
                        activity_id: item?.id,
                        onItemAdd: onItemAdd,
                        isEdit,
                        index,
                        heading: item?.name,
                        modalDescription: item?.description,
                        dayData: item?.day?.map((el) => el?.day_name),
                    });
            }}
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
                {item?.type === 'add' ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.background,
                                padding: 7,
                                borderRadius: 30,
                                marginTop: 5,
                            }}
                        >
                            <AddIcon height={15} width={15} />
                        </View>
                        <Text
                            style={{
                                fontSize: 20,
                                lineHeight: 24,
                                fontFamily: fonts.regular,
                                color: colors.regentBlue,
                                marginTop: 10,
                            }}
                        >
                            Add New
                        </Text>
                    </View>
                ) : (
                    <>
                        <View style={{ padding: 10 }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text
                                    numberOfLines={2}
                                    style={styles.itemHeading}
                                >
                                    {item?.name}
                                </Text>
                                {onDeletePress && (
                                    <Pressable
                                        hitSlop={10}
                                        onPress={onDeletePress}
                                        style={{ marginLeft: 10 }}
                                    >
                                        <MaterialIcons
                                            name='delete-forever'
                                            color={colors.Carnation}
                                            size={20}
                                        />
                                    </Pressable>
                                )}
                            </View>
                            {
                                showDays && item?.day?.length ? (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            marginTop: 10,
                                        }}
                                    >
                                        {item?.day.length === 7 ? (
                                            <View
                                                style={{
                                                    paddingHorizontal: 5,
                                                    borderRightWidth: 0,
                                                    borderColor:
                                                        colors.lightBlack3,
                                                    marginTop: 10,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily:
                                                            fonts.regular,
                                                        color: colors.lightBlack3,
                                                        textTransform:
                                                            'capitalize',
                                                    }}
                                                >
                                                    Daily
                                                </Text>
                                            </View>
                                        ) : (
                                            item?.day.map((el, index) => (
                                                <View
                                                    key={index}
                                                    style={{
                                                        paddingHorizontal: 5,
                                                        borderRightWidth:
                                                            index ===
                                                            item?.day.length - 1
                                                                ? 0
                                                                : 1,
                                                        borderColor:
                                                            colors.lightBlack3,
                                                        marginTop: 5,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontFamily:
                                                                fonts.regular,
                                                            color: colors.lightBlack3,
                                                            textTransform:
                                                                'capitalize',
                                                        }}
                                                    >
                                                        {el?.day_name?.substring(
                                                            0,
                                                            3
                                                        )}
                                                    </Text>
                                                </View>
                                            ))
                                        )}
                                    </View>
                                ) : null
                                // <Text
                                //     numberOfLines={2}
                                //     style={styles.itemDescription}
                                // >
                                //     {item?.description}
                                // </Text>
                            }
                        </View>
                        {!onDeletePress && (
                            <View
                                style={{
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor:
                                            colors.placeholderColor,
                                        width: '100%',
                                        height: 1,
                                        opacity: 0.2,
                                        // marginTop: 10,
                                    }}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // flex: 1,
                                        height: 35,
                                    }}
                                >
                                    <Text>{text}</Text>
                                    <RightArrow
                                        height={10}
                                        width={20}
                                        fill={colors.defaultBlack}
                                        style={{ marginLeft: 8 }}
                                    />
                                </View>
                            </View>
                        )}
                    </>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default PlanBox;
