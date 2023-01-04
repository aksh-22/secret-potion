import { View, Text } from 'react-native';
import React from 'react';
import colors from 'src/constants/colors';
import { Bubble } from 'react-native-gifted-chat';
import { fonts } from 'src/constants/fonts';

type Props = {
    props: any;
};

const ChatBubble = ({ props }: Props) => {
    return (
        <View style={{ marginTop: 10 }}>
            <View
                style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderTopWidth: 0,
                    borderRightWidth: 10,
                    borderBottomWidth: 10,
                    borderLeftWidth: 0,
                    borderTopColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor:
                        props?.position === 'left'
                            ? colors.defaultWhite
                            : colors.transparent,
                    borderLeftColor: 'transparent',
                    marginLeft: -10,
                    overflow: 'hidden',
                }}
            />
            <Bubble
                {...props}
                textStyle={{
                    left: {
                        fontFamily: fonts.regular,
                        fontWeight: '400',
                        fontSize: 15,
                        lineHeight: 18,
                        color: colors.defaultBlack,
                    },
                    right: {
                        fontFamily: fonts.regular,
                        fontWeight: '400',
                        fontSize: 15,
                        lineHeight: 18,
                        color: colors.defaultBlack,
                    },
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: colors.defaultWhite,
                        borderRadius: 10,
                        borderBottomLeftRadius: 10,
                        borderTopStartRadius: 0,
                        paddingVertical: 10,
                        marginLeft: -10,
                    },
                    right: {
                        backgroundColor: '#C0E4F7',
                        borderRadius: 10,
                        borderBottomEndRadius: 0,
                        borderTopStartRadius: 10,
                        paddingVertical: 10,
                        marginRight: 5,
                    },
                }}
            />
            <View
                style={{
                    borderTopWidth: 10,
                    borderRightWidth: 0,
                    borderBottomWidth: 0,
                    borderLeftWidth: 10,
                    borderTopColor:
                        props?.position === 'right'
                            ? '#C0E4F7'
                            : colors.transparent,
                    borderRightColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    alignSelf: 'flex-end',
                    marginRight: 5,
                }}
            />
        </View>
    );
};

export default ChatBubble;
