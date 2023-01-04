import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import PlanBadge from 'src/assets/svg/planBadge.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { wellnessArrayType } from 'typings/wellnessArrayType';
import styles from './../Wellness.style';

const HEIGHT = 35;

type Props = { el: wellnessArrayType; icon: any; onPress?: () => void };

const BadgeBox = ({ el, icon, onPress }: Props) => {
    return (
        <Pressable onPress={onPress} style={styles.badgeBox}>
            {/* <LinearGradient
                colors={el.background}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {icon && icon}
            </LinearGradient> */}
            <Image
                resizeMode='contain'
                source={{ uri: el?.image }}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
            <View
                style={{
                    marginLeft: 20,
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text
                        style={{
                            color: el?.color,
                            fontFamily: fonts.regular,
                            fontSize: 16,
                            lineHeight: 19,
                            marginVertical: 5,
                            flex: 1,
                        }}
                    >
                        {el?.name}
                    </Text>
                    {el?.total_badge > 0 ? (
                        <View style={{ height: HEIGHT, width: HEIGHT }}>
                            <PlanBadge width={HEIGHT} height={HEIGHT} />
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    left: 0,
                                    bottom: 0,
                                    top: 0,
                                }}
                            >
                                <Text
                                    style={{
                                        color: colors.defaultWhite,
                                        fontFamily: fonts.regular,
                                        fontSize: 10,
                                        lineHeight: 12,
                                    }}
                                >
                                    {el?.total_badge}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                </View>
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 15,
                        lineHeight: 18,
                        color: colors.defaultBlack,
                        opacity: 0.7,
                    }}
                    numberOfLines={2}
                >
                    {el?.content}
                </Text>
            </View>
        </Pressable>
    );
};

export default BadgeBox;
