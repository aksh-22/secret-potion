import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import DateAndTimePicker from 'src/components/dateAndTimePicker/DateAndTimePicker';
import TabSelector from 'src/components/TabSelector';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { dateFormatForServer } from 'src/utils/dateFormatter';
import { diaryDetailType } from 'typings/diaryDetail';
import DayView from './DayView';
import DiaryWrite from './DiaryWrite';

const data = [
    { name: 'Write', key: 1 },
    { name: 'View', key: 2 },
];

const Diary = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const [diaryData, setDiaryData] = useState<Array<diaryDetailType>>([]);

    // ! loading state
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [shouldNext, setShouldNext] = useState(true);

    const dispatch = useDispatch();

    const onDateChange = (date) => {
        setDiaryData([]);
        setShouldNext(true);
        setDate(date);
        setPage(1);
        onGetData(1, date);
    };

    const onMenuIconPress = async () => {
        setShow(true);
    };

    const onClosePress = () => {
        setShow(false);
        setDiaryData([]);
        setDate(null);
        setShouldNext(true);
        setPage(1);
        onGetData(1);
    };

    const onGetData = (page: number, date?: string) => {
        setIsLoading(true);
        // setDiaryData([]);
        dispatch({
            type: 'GET_DIARY',
            payload: {
                page,
                data: {
                    date: date ? dateFormatForServer(date) : undefined,
                },
                callback: (res: any, next: boolean) => {
                    let temp = [];
                    if (page === 1) {
                        temp = [...res];
                    } else {
                        temp = [...diaryData, ...res];
                    }
                    !next && setShouldNext(false);
                    setIsLoading(false);
                    setDiaryData([...temp]);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    useEffect(() => {
        onGetData(1);
    }, []);

    const onEndReached = () => {
        if (shouldNext && !isLoading) {
            onGetData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const onDiaryAdd = () => {
        setSelectedTab(2);
    };

    return (
        <>
            <ContainerTabWithoutScroll
                isBack
                menuIcon={selectedTab === 2}
                onMenuIconPress={onMenuIconPress}
            >
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <TabSelector
                        activeTab={selectedTab - 1}
                        onChange={(item) => setSelectedTab(item?.key)}
                        tabs={data}
                        tabStyle={{ width: SCREEN_WIDTH * 0.5 }}
                    />
                    {selectedTab === 1 ? (
                        <View style={{ flex: 1 }}>
                            <DiaryWrite
                                onDiaryAdd={onDiaryAdd}
                                descriptionInputStyle={{
                                    height: SCREEN_HEIGHT * 0.3,
                                }}
                            />
                        </View>
                    ) : (
                        <DayView
                            onEndReached={onEndReached}
                            isLoading={isLoading}
                            diaryData={diaryData}
                            onRefresh={() => {
                                setDiaryData([]);
                                onGetData(1);
                                setPage(1);
                                setShouldNext(true);
                            }}
                        />
                    )}
                </View>
            </ContainerTabWithoutScroll>
            {show ? (
                <DateAndTimePicker
                    show={show}
                    maxDate={new Date()}
                    value={date ?? new Date()}
                    onChange={onDateChange}
                    onClose={setShow}
                    mode='date'
                    style={{ marginBottom: 100 }}
                    onClearPress={date && onClosePress}
                    // mode=''
                />
            ) : null}
        </>
    );
};

export default Diary;
