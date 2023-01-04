import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-gifted-chat';
import ImageComponent from 'src/components/imageComponent/ImageComponent';
import colors from 'src/constants/colors';

type Props = {
    props: any;
};

const ChatAvatar = ({ props }: Props) => {
    return (
        <Avatar
            {...props}
            renderAvatar={(props) => {
                return (
                    <View>
                        <ImageComponent
                            uri={props?.currentMessage?.user?.avatar?.url}
                            style={{
                                width: 0,
                                height: 0,
                                borderRadius: 8,
                            }}
                        />
                    </View>
                );
            }}
            showAvatarForEveryMessage={false}
            containerStyle={{
                left: {
                    height: 20,
                    width: 20,
                    borderRadius: 8,
                    backgroundColor: colors.transparent,
                    overflow: 'hidden',
                    marginRight: -8,
                },
            }}
        />
    );
};

export default ChatAvatar;
