import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import InitialLoader from 'src/components/InitialLoader';
import RequestShimmer from 'src/components/shimmers/RequestShimmer';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT } from 'src/constants/deviceInfo';
import numberFormatter from 'src/utils/numberFormatter';
import { receiveItemType, sendItemType } from 'typings/requestType';
import styles from './Connection.style';
import ReceiveRequestBox from './ReceiveRequestBox';
import SentRequestBox from './SentRequestBox';

type Props = {
    receivedRequest?: receiveItemType[];
    sentRequest?: sendItemType[];
    receiveLoading?: boolean;
    sendLoading?: boolean;
    onEndReachedReceive?: () => void;
    onEndReachedSend?: () => void;
    onAccept?: (index: number, data: any) => void;
    onDecline?: (index: number) => void;
    onCancel?: (index: number) => void;
    onReceiveRefresh?: () => void;
    onSendRefresh?: () => void;
};

const RequestList = ({
    receivedRequest,
    sentRequest,
    receiveLoading,
    sendLoading,
    onEndReachedReceive,
    onEndReachedSend,
    onAccept,
    onDecline,
    onCancel,
    onReceiveRefresh,
    onSendRefresh,
}: Props) => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const [showData, setShowData] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setShowData(true);
        }, [])
    );

    useEffect(() => {
        setData1(receivedRequest);
    }, [receivedRequest]);

    useEffect(() => {
        setData2(sentRequest);
    }, [sentRequest]);

    const renderItem = ({
        item,
        index,
    }: {
        item: receiveItemType;
        index: number;
    }) => {
        return (
            <ReceiveRequestBox
                onAccept={onAccept}
                onDecline={onDecline}
                index={index}
                item={item}
            />
        );
    };

    const renderItem2 = ({
        item,
        index,
    }: {
        item: sendItemType;
        index: number;
    }) => {
        return <SentRequestBox onCancel={() => onCancel(index)} item={item} />;
    };

    const Header = ({ type, length }) => (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: colors.background,
            }}
        >
            <Text style={styles.headerText}>
                {type} ({numberFormatter(length)})
            </Text>
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.lightBlack2,
                    height: 1,
                    marginLeft: 10,
                }}
            />
        </View>
    );

    return showData ? (
        <View style={{ flex: 1, marginTop: 20 }}>
            <View style={{ maxHeight: SCREEN_HEIGHT * 0.4 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    contentContainerStyle={{}}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onReceiveRefresh}
                            tintColor={colors.regentBlue}
                            colors={[colors.regentBlue, colors.red]}
                            title='Pull to refresh'
                            titleColor={colors.regentBlue}
                        />
                    }
                    data={data1}
                    renderItem={renderItem}
                    onEndReached={onEndReachedReceive}
                    ListHeaderComponent={
                        <Header type='Received' length={data1.length} />
                    }
                    ListEmptyComponent={
                        !receiveLoading ? (
                            <EmptyPlaceholder
                                textStyle={{ fontSize: 20 }}
                                size={160}
                                text='No requests received yet'
                            />
                        ) : (
                            <RequestShimmer count={5} />
                        )
                    }
                    ListFooterComponent={
                        receiveLoading ? <RequestShimmer count={5} /> : null
                    }
                    stickyHeaderIndices={[0]}
                />
            </View>
            <View style={{ maxHeight: SCREEN_HEIGHT * 0.4 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    contentContainerStyle={{
                        paddingBottom: 100,
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onSendRefresh}
                            tintColor={colors.regentBlue}
                            colors={[colors.regentBlue, colors.red]}
                            title='Pull to refresh'
                            titleColor={colors.regentBlue}
                        />
                    }
                    onEndReached={onEndReachedSend}
                    data={data2}
                    renderItem={renderItem2}
                    ListEmptyComponent={
                        sendLoading ? (
                            <RequestShimmer count={5} />
                        ) : (
                            <EmptyPlaceholder
                                textStyle={{ fontSize: 20 }}
                                size={160}
                                text='No requests sent yet'
                            />
                        )
                    }
                    ListFooterComponent={
                        sendLoading ? <RequestShimmer count={5} /> : null
                    }
                    ListHeaderComponent={
                        <Header type='Sent' length={data2.length} />
                    }
                    stickyHeaderIndices={[0]}
                />
            </View>
        </View>
    ) : (
        <InitialLoader />
    );
};

export default RequestList;
