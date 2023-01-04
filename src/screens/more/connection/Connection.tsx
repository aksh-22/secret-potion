import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import InitialLoader from 'src/components/InitialLoader';
import TabSelector from 'src/components/TabSelector';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { connectionsItemType } from 'typings/connectionType';
import {
    receiveItemType,
    requestType,
    sendItemType,
} from 'typings/requestType';
import ConnectionList from './ConnectionList';
import RequestList from './RequestList';

const data = [
    { name: 'Connections', key: 1, badge: 3 },
    { name: 'Requests', key: 2, badge: 5 },
];

type Props = {};

const Connection = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState(1);

    const [connection, setConnection] = useState<Array<connectionsItemType>>(
        []
    );
    const [connectionLoading, setConnectionLoading] = useState(false);
    const [connectionPage, setConnectionPage] = useState(1);
    const [shouldNextConnection, setShouldNextConnection] = useState(true);
    const [connectionCount, setConnectionCount] = useState(0);

    const [requestSent, setRequestSent] = useState<Array<sendItemType>>([]);
    const [requestLoading, setRequestLoading] = useState(false);
    const [sentPage, setSentPage] = useState(1);
    const [shouldNextSent, setShouldNextSent] = useState(true);
    const [sendCount, setSendCount] = useState(0);

    const [requestReceived, setRequestReceived] = useState<
        Array<receiveItemType>
    >([]);
    const [requestReceiveLoading, setRequestReceiveLoading] = useState(false);
    const [receivePage, setReceivePage] = useState(1);
    const [shouldNextReceive, setShouldNextReceive] = useState(true);
    const [receiveCount, setReceiveCount] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getConnection(1);
        getSendRequest(1);
        getReceiveRequest(1);
    }, []);

    const getConnection = (page) => {
        setConnectionLoading(true);
        dispatch({
            type: 'GET_CONNECTION',
            payload: {
                page,
                callback: (data, next) => {
                    setConnectionCount(data?.count);
                    !next && setShouldNextConnection(false);
                    if (page === 1) {
                        setConnection(data?.connections);
                    } else {
                        setConnection((prev) => [
                            ...prev,
                            ...data?.connections,
                        ]);
                    }
                    setConnectionLoading(false);
                },
                errorCallback: () => {
                    setConnectionLoading(false);
                },
            },
        });
    };

    const getSendRequest = (page) => {
        setRequestLoading(true);
        dispatch({
            type: 'GET_SEND_REQUEST',
            payload: {
                page,
                callback: (data: requestType, next: boolean) => {
                    setSendCount(data?.count);
                    !next && setShouldNextSent(false);
                    if (page === 1) {
                        setRequestSent(data?.send);
                    } else {
                        setRequestSent((prev) => [...prev, ...data?.send]);
                    }
                    setRequestLoading(false);
                },
                errorCallback: () => {
                    setRequestLoading(false);
                },
            },
        });
    };

    const getReceiveRequest = (page) => {
        setRequestReceiveLoading(true);
        dispatch({
            type: 'GET_RECEIVE_REQUEST',
            payload: {
                page,
                callback: (data: requestType, next: boolean) => {
                    setReceiveCount(data?.count);
                    !next && setShouldNextReceive(false);
                    if (page === 1) {
                        setRequestReceived(data?.receive);
                    } else {
                        setRequestReceived((prev) => [
                            ...prev,
                            ...data?.receive,
                        ]);
                    }
                    setRequestReceiveLoading(false);
                },
                errorCallback: () => {
                    setRequestReceiveLoading(false);
                },
            },
        });
    };

    const onEndReached = () => {
        if (shouldNextConnection && !connectionLoading) {
            getConnection(connectionPage + 1);
            setConnectionPage((prev) => prev + 1);
        }
    };
    const onEndReachedReceive = () => {
        if (shouldNextReceive && !requestReceiveLoading) {
            getReceiveRequest(receivePage + 1);
            setReceivePage((prev) => prev + 1);
        }
    };
    const onEndReachedSend = () => {
        if (shouldNextSent && !requestLoading) {
            getSendRequest(sentPage + 1);
            setSentPage((prev) => prev + 1);
        }
    };

    const onConnectionRefresh = () => {
        getConnection(1);
        setConnectionPage(1);
        setShouldNextConnection(true);
    };

    const onReceiveRefresh = () => {
        getReceiveRequest(1);
        setReceivePage(1);
        setShouldNextReceive(true);
    };

    const onSendRefresh = () => {
        getSendRequest(1);
        setSentPage(1);
        setShouldNextSent(true);
    };

    const onAccept = (index: number, data: any) => {
        const temp = [...requestReceived];
        temp.splice(index, 1);
        setRequestReceived(temp);
        setConnection((prev) => [data, ...prev]);
        if (receiveCount > 0) {
            setReceiveCount((prev) => prev - 1);
        }
        setConnectionCount((prev) => prev + 1);
    };
    const onDecline = (index: number) => {
        const temp = [...requestReceived];
        temp.splice(index, 1);
        setRequestReceived(temp);
        if (receiveCount > 0) {
            setReceiveCount((prev) => prev - 1);
        }
    };

    const onCancel = (index: number) => {
        const temp = [...requestSent];
        temp.splice(index, 1);
        setRequestSent(temp);
        if (sendCount > 0) {
            setSendCount((prev) => prev - 1);
        }
    };

    const onDelete = (index: number) => {
        const temp = [...connection];
        temp.splice(index, 1);
        setConnection(temp);
        if (connectionCount > 0) {
            setConnectionCount((prev) => prev - 1);
        }
    };

    const [showData, setShowData] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    return showData ? (
        <ContainerTabWithoutScroll
            isBack
            // menuIcon={selectedTab === 2}
            // onMenuIconPress={onMenuIconPress}
        >
            <TabSelector
                activeTab={selectedTab - 1}
                onChange={(item) => setSelectedTab(item?.key)}
                tabs={data}
                badges={[connectionCount, sendCount + receiveCount]}
                tabStyle={{ width: SCREEN_WIDTH * 0.5 }}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                }}
            >
                {selectedTab === 1 ? (
                    <ConnectionList
                        isLoading={connectionLoading}
                        connection={connection}
                        onEndReached={onEndReached}
                        onDelete={onDelete}
                        onRefresh={onConnectionRefresh}
                    />
                ) : (
                    <RequestList
                        receivedRequest={[...requestReceived]}
                        sentRequest={requestSent}
                        receiveLoading={requestReceiveLoading}
                        sendLoading={requestLoading}
                        onEndReachedReceive={onEndReachedReceive}
                        onEndReachedSend={onEndReachedSend}
                        onAccept={onAccept}
                        onDecline={onDecline}
                        onCancel={onCancel}
                        onReceiveRefresh={onReceiveRefresh}
                        onSendRefresh={onSendRefresh}
                    />
                )}
            </View>
        </ContainerTabWithoutScroll>
    ) : (
        <InitialLoader />
    );
};

export default Connection;
