import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import { db } from 'src/firebase';
import OneSignal from 'react-native-onesignal';

type Props = {
    members?: any;
    chId?: any;
    playerId?: any;
    myId?: any;
    otherUserID?: any;
    setInput?: any;
};

const useOnSend = ({ members, chId, myId, playerId, otherUserID }: Props) => {
    const [messages, setMessages] = useState([]);

    const [input, setInput] = useState('');

    const onSend = useCallback(
        async (
            message = [],
            shouldInputEmpty: boolean = true,
            channel?: object
        ) => {
            try {
                setMessages(message);
                db.ref(
                    `${__DEV__ ? '/Local' : '/Production'}/messages/${chId}`
                ).push(message[0]);
                shouldInputEmpty && setInput('');
                members.forEach(async (el) => {
                    await db
                        .ref(
                            `${
                                __DEV__ ? '/Local' : '/Production'
                            }/chatMenu/${el}`
                        )
                        .child(`${chId}`)
                        .update(channel);
                });

                db.ref(`${__DEV__ ? '/Local' : '/Production'}/Users/${myId}`)
                    .once('value')
                    .then(async (snapshot) => {
                        const usr = snapshot.val();

                        const a = {
                            android_channel_id:
                                '7a491553-2348-4769-820b-8c821eecadc3',
                            app_id: 'db976a1c-cda0-46bc-8543-79c1c87519af',
                            ios_badgeType: 'Increase',
                            ios_badgeCount: 1,
                            isIos: true,
                            include_player_ids: playerId,
                            data: {
                                is_newChat: false,
                                name: usr?.name,
                                image: usr?.image,
                                channelId: chId,
                                myId: otherUserID,
                                otherUserID: myId,
                                type: 'chat',
                                playerId: usr?.playerId,
                            },
                            headings: {
                                en: usr?.name,
                            },
                            contents: {
                                en: message[0]?.text,
                            },
                        };

                        OneSignal.postNotification(JSON.stringify(a));

                        // const res1 = await notificationSend(a);
                    });

                // await db.ref(`chatMenus`).child(`${chId}`).update(channel);
            } catch (error) {
                console.log('error in sending message', error);
            }
        },
        []
    );

    return { input, messages, onSend };
};

export default useOnSend;
