import { View, Text, Pressable } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Send } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/constants/colors';
import SendIcon from 'src/assets/svg/send.svg';

type Props = {
    props?: any;
    input?: any;
    myId?: any;
    is_newChat?: boolean;
    chId?: any;
    members?: any;
    name?: any;
    onSend?: any;
};

const ChatSend = ({
    props,
    input,
    myId,
    is_newChat,
    chId,
    members,
    name,
    onSend,
}: Props) => {
    const time = moment().unix();
    const messageId = props.messageIdGenerator();
    let message = [
        {
            _id: messageId,
            text: input.trim(),
            createdAt: time,
            user: {
                _id: myId,
                // avatar: currUserInfo?.image,
                // name: currUserInfo?.name,
            },
            type: 'text',
        },
    ];
    let channel;
    if (is_newChat) {
        channel = {
            channelId: chId,
            lastMessage: input.trim(),
            members: members,
            unseen: members.reduce(function (obj, v) {
                obj[v] = {
                    count:
                        myId === v
                            ? 0
                            : firebase.database.ServerValue.increment(1),
                };
                return obj;
            }, {}),
            type: 'text',
            name,
            // name: groupChat ? name : `${name}-${currUserInfo?.name ?? ''}`,
            createdAt: time,
            // chatType: 'single',
        };
    } else {
        channel = {
            lastMessage: input.trim(),
            // seenBy: [user?.uid],
            type: 'text',
            createdAt: time,
            name,
            // name: groupChat
            //   ? name
            //   : `${userData?.name}-${currUserInfo?.name ?? ''}`,
            unseen: members.reduce(function (obj, v) {
                obj[v] = {
                    count:
                        myId === v
                            ? 0
                            : firebase.database.ServerValue.increment(1),
                };
                return obj;
            }, {}),
        };
    }

    return (
        <Send
            disabled={!input.trim().length}
            {...props}
            containerStyle={{
                right: 30,
                position: 'absolute',
                top: 20,
            }}
        >
            <Pressable
                onPress={() => onSend(message, true, channel)}
                disabled={!input.trim().length}
            >
                <LinearGradient
                    style={{
                        borderRadius: 100,
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 10,
                    }}
                    colors={
                        input.trim().length
                            ? [colors.mintTulip, colors.downy]
                            : [colors.borderColor, colors.borderColor]
                    }
                >
                    <SendIcon />
                </LinearGradient>
            </Pressable>
        </Send>
    );
};

export default ChatSend;
