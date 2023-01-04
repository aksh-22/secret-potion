import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, BackHandler, Platform } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import InitialLoader from 'src/components/InitialLoader';
import colors from 'src/constants/colors';
import { RootStackName } from 'src/constants/routeName';
import { db } from 'src/firebase';
import { useAppSelector } from 'src/hooks/reducer';
import { chatOnSend } from './chat_helper/chatOnSend';
import useFetchMessages from './chat_helper/useFetchMessages';
import ChatAvatar from './Components/ChatAvatar';
import ChatBubble from './Components/ChatBubble';
import ChatDay from './Components/ChatDay';
import ChatInputToolbar from './Components/ChatInputToolbar';
import ChatSend from './Components/ChatSend';

type Props = {
    route?: any;
};

const ChatScreen = ({ route }: Props) => {
    const is_newChat = route?.params?.is_newChat;
    const myId = route?.params?.myId;
    const otherUserID = route?.params?.otherUserID;
    const members = [myId, otherUserID];
    const name = route?.params?.name;
    let changeImage = route?.params?.changeImage;

    let playerId = route?.params?.playerId;
    let chId = route?.params?.channelId;

    if (changeImage) {
        playerId = `${playerId}`.split(',');
    }

    const { replace, canGoBack, goBack, addListener } =
        useNavigation<NativeStackNavigationProp<any>>();

    const { messages: message } = useFetchMessages({
        chId,
        is_newChat,
        myId,
    });

    // !------state
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isChatDisabled, setIsChatDisabled] = useState(false);
    const [currUserInfo, setCurrUserInfo] = useState<any>();
    const [isUserDeleted, setIsUserDeleted] = useState(false);

    const [inputHeight, setInputHeight] = useState(
        Platform.OS === 'ios' ? 150 : 120
    );

    const chatRef = useRef(null);

    useEffect(() => {
        // setIsLoading(true);
        const onValueChange = db
            .ref(
                `${
                    __DEV__ ? '/Local' : '/Production'
                }/chatMenu/${myId}/${chId}/disabled`
            )
            .on('value', (snapshot) => {
                setIsChatDisabled(snapshot.val());
                // setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (nextAppState === 'active') {
                    db.ref(
                        `${__DEV__ ? '/Local' : '/Production'}/Users/${myId}`
                    ).update({ currentChannel: chId });
                } else {
                    db.ref(
                        `${__DEV__ ? '/Local' : '/Production'}/Users/${myId}`
                    ).update({ currentChannel: null });
                }
            }
        );
    }, []);

    useEffect(() => {
        db.ref(`${__DEV__ ? '/Local' : '/Production'}/Users/${myId}`).update({
            currentChannel: chId,
        });
        return () => {
            db.ref(
                `${__DEV__ ? '/Local' : '/Production'}/Users/${myId}`
            ).update({ currentChannel: null });
        };
    }, []);

    useEffect(() => {
        db.ref(`${__DEV__ ? '/Local' : '/Production'}/Users/${otherUserID}`).on(
            'value',
            (snapshot) => {
                const usr = snapshot.val();
                setCurrUserInfo(usr);
                usr?.is_deleted
                    ? setIsUserDeleted(true)
                    : setIsUserDeleted(false);
            }
        );
        return () =>
            db
                .ref(
                    `${__DEV__ ? '/Local' : '/Production'}/Users/${otherUserID}`
                )
                .off();
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (canGoBack()) {
                goBack();
            } else {
                replace(RootStackName.BOTTOMTAB);
            }
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        setMessages(message);
    }, [message]);

    // !------------- send message ---------------- // // // // // //

    const onSend = useCallback(
        async (
            message = [],
            shouldInputEmpty: boolean = true,
            channel?: object
        ) => {
            chatOnSend({
                setMessages,
                message,
                shouldInputEmpty,
                setInput,
                members,
                chId,
                channel,
                playerId,
                otherUserID,
                myId,
                currUserInfo,
            });
        },
        [currUserInfo]
    );

    // !--------------------------- renderers------------------------------!

    const renderAvatar = (props) => {
        return <ChatAvatar props={props} />;
    };

    const renderBubble = (props) => <ChatBubble props={props} />;

    const renderInputToolbar = (props) => {
        return (
            <ChatInputToolbar
                onChangeText={(text) => setInput(text)}
                currUserInfo={currUserInfo}
                input={input}
                isChatDisabled={isChatDisabled}
                props={props}
                renderSend={renderSend}
                isUserDeleted={isUserDeleted}
            />
        );
    };

    const renderSend = (props) => (
        <ChatSend
            props={props}
            chId={chId}
            input={input}
            is_newChat={is_newChat}
            members={members}
            myId={myId}
            name={name}
            onSend={onSend}
        />
    );

    return (
        <ContainerTabWithoutScroll
            isBack
            bell={false}
            message={false}
            headerHeading={currUserInfo?.name}
            image={currUserInfo?.image}
            backBtnPress={() => {
                if (!canGoBack()) {
                    replace(RootStackName.BOTTOMTAB);
                } else {
                    goBack();
                }
            }}
        >
            <GiftedChat
                ref={chatRef}
                maxInputLength={500}
                scrollToBottom
                renderAvatar={renderAvatar}
                showUserAvatar={false}
                onInputTextChanged={(text1) => setInput(text1)}
                text={input}
                showAvatarForEveryMessage={true}
                renderTime={(props: any) => {
                    return null;
                }}
                minInputToolbarHeight={inputHeight}
                renderBubble={renderBubble}
                messagesContainerStyle={{ backgroundColor: colors.background }}
                messages={messages}
                inverted={true}
                renderInputToolbar={renderInputToolbar}
                onSend={onSend}
                renderChatEmpty={() =>
                    isLoading ? (
                        <InitialLoader />
                    ) : (
                        <EmptyPlaceholder text='No chats' inverted={true} />
                    )
                }
                user={{
                    _id: myId,
                }}
                renderDay={(props) => <ChatDay props={props} />}
                alwaysShowSend
                keyboardShouldPersistTaps='never'
            />
        </ContainerTabWithoutScroll>
    );
};

export default ChatScreen;
