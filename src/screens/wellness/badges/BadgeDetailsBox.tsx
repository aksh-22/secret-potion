import React from 'react';
import { Image, Text, View } from 'react-native';
import CognitiveIcon from 'src/assets/svg/cognitive.svg';
import EmotionalIcon from 'src/assets/svg/emotional.svg';
import PhysicalIcon from 'src/assets/svg/physical.svg';
import SocialIcon from 'src/assets/svg/social.svg';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { globalStyle } from 'src/constants/global.style';
import { dateFormatter } from 'src/utils/dateFormatter';

const SIZE = 15;
const SIZE2 = 30;

const icons2 = {
    Cognitive: { icon: <CognitiveIcon width={SIZE2} height={SIZE2} /> },
    Emotional: {
        icon: <EmotionalIcon width={SIZE2 + 10} height={SIZE2 + 10} />,
    },
    Physical: { icon: <PhysicalIcon width={SIZE2 + 8} height={SIZE2 + 8} /> },
    Social: { icon: <SocialIcon width={SIZE2 + 5} height={SIZE2 + 5} /> },
};

const type = {
    three: '3 in a row',
    seven: '7 in a row',
    ten: '10 in a row',
};

type Props = {
    item?: any;
    data: any;
    bonus?: boolean;
    image?: any;
};

const BadgeDetailsBox = ({ item, data, bonus, image }: Props) => {
    return (
        <View
            style={{
                backgroundColor: colors.defaultWhite,
                minHeight: 65,
                marginVertical: 10,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginHorizontal: 20,
                ...globalStyle.shadow4,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View
                style={
                    {
                        // flexDirection: 'row',
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                    }
                }
            >
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 18,
                        lineHeight: 21,
                    }}
                >
                    {bonus ? 'First Activity' : type[item?.type]}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.regular,
                        fontSize: 12,
                        lineHeight: 14,
                        color: colors.defaultBlack,
                        opacity: 0.5,
                        marginTop: 5,
                    }}
                >
                    {dateFormatter(bonus ?? item?.date)}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* <LinearGradient
                        colors={data.background}
                        style={{
                            width: SIZE2 + 15,
                            height: SIZE2 + 15,
                            borderRadius: 80,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {icons2[data?.name].icon}
                    </LinearGradient> */}
                </View>
            </View>
            <Image
                resizeMode='contain'
                source={{ uri: image }}
                style={{
                    width: 48,
                    height: 48,
                    // borderRadius: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </View>
    );
};

export default BadgeDetailsBox;
