import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Chat.style';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import { auth, db } from 'src/firebase';
import { useAppSelector } from 'src/hooks/reducer';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import ChatCard from './ChatCard';
import colors from 'src/constants/colors';

type Props = {};

const ChatMenu = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const user_id = useAppSelector(
        (state) => state?.userReducer?.user?.firebase_id
    );
    useEffect(() => {
        setIsLoading(true);
        const onValueChange = db
            .ref(`${__DEV__ ? '/Local' : '/Production'}/chatMenu/${user_id}`)
            .orderByChild('createdAt')
            .on('value', (snapshot) => {
                let temp = [];
                snapshot.forEach((el): any => {
                    temp.push(el.val());
                });
                setUsers(temp.reverse());
                setIsLoading(false);
            });
    }, []);
    return (
        <ContainerTabWithoutScroll
            isBack
            bell={false}
            message={false}
            headerHeading='Chat'
            statusBarColor={colors.background}
            headerStyle={{ backgroundColor: colors.background }}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingBottom: 130,
                    flexGrow: 1,
                    paddingTop: 10,
                }}
                ListEmptyComponent={
                    <EmptyPlaceholder
                        text='No chats found'
                        style={{
                            width: '80%',
                            alignItems: 'center',
                            alignSelf: 'center',
                            // marginTop: 20,
                            flex: 1,
                        }}
                    />
                }
                keyExtractor={(item, index) => String(index)}
                data={users}
                renderItem={({ item }) => (
                    <ChatCard
                        item={item}
                        // chatUpdate={chatUpdate}
                    />
                )}
            />
        </ContainerTabWithoutScroll>
    );
};

export default ChatMenu;
