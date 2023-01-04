import { View, Text } from 'react-native';
import React from 'react';
import { isSameUnixDay } from 'src/utils/isSameUnixDay';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import moment from 'moment';

type Props = {
    props?: any;
};

const ChatDay = ({ props }: Props) => {
    return !isSameUnixDay(
        props.currentMessage.createdAt,
        props.previousMessage?.createdAt
    ) ? (
        <View
            style={{
                height: 26,
                // width: 113,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: colors.background2,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 20,
            }}
        >
            <Text
                style={{
                    fontFamily: fonts.regular,
                    fontSize: 12,
                    color: colors.defaultBlack,
                }}
            >
                {moment.unix(props.currentMessage.createdAt).calendar(null, {
                    lastDay: '[Yesterday]',
                    sameDay: 'hh:mm A',
                    nextDay: '[Tomorrow]',
                    lastWeek: 'dddd',
                    nextWeek: 'dddd',
                    sameElse: 'DD MMM yyyy',
                })}
            </Text>
        </View>
    ) : null;
};

export default ChatDay;
