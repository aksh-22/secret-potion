import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from 'src/firebase';

type Props = {
    is_newChat?: boolean;
    chId?: any;
    myId?: any;
};

const useFetchMessages = ({ is_newChat, chId, myId }: Props) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.ref(`${__DEV__ ? '/Local' : '/Production'}/messages/${chId}`)
            .orderByValue()
            .on('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((el): any => {
                    temp.push(el.val());
                    // return true;
                });
                setMessages(temp.reverse());
                if (is_newChat) {
                    db.ref(
                        `${
                            __DEV__ ? '/Local' : '/Production'
                        }/chatMenu/${myId}/${chId}`
                    )
                        .once('value')
                        .then((snapshot) => {
                            if (snapshot.hasChildren()) {
                                db.ref(
                                    `${
                                        __DEV__ ? '/Local' : '/Production'
                                    }/chatMenu/${myId}/${chId}/unseen/${myId}`
                                ).update({
                                    count: 0,
                                });
                            }
                        });
                } else {
                    db.ref(
                        `${
                            __DEV__ ? '/Local' : '/Production'
                        }/chatMenu/${myId}/${chId}/unseen/${myId}`
                    ).update({
                        count: 0,
                    });
                }
            });

        return () =>
            db
                .ref(`${__DEV__ ? '/Local' : '/Production'}/messages/${chId}`)
                .off();
    }, []);

    return {
        messages,
    };
};

export default useFetchMessages;
