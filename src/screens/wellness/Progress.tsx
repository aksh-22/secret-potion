import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import TabSelector from 'src/components/TabSelector';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { WellnessRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { userProfileType } from 'typings/user';
import ListView from './plan/ListView';
import WellnessDataComponent from './WellnessDataComponent';

const data = [
    { name: 'Today', key: 1 },
    { name: 'Wellness Score', key: 2 },
];

type Props = {
    route: any;
};

const Progress = ({ route }: Props) => {
    const init = route?.params?.init ?? 1;
    const date = route?.params?.date;

    const [selectedTab, setSelectedTab] = useState(parseInt(init) ?? 1);

    useFocusEffect(
        React.useCallback(() => {
            setSelectedTab(parseInt(init));
            setCurrDate(date);
        }, [route?.params])
    );

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );
    const [currDate, setCurrDate] = useState<any>(date ?? new Date());

    const [disablePrev, setDisablePrev] = useState(false);

    useEffect(() => {
        const isSame = dayjs().subtract(1, 'd').isSame(currDate, 'day');
        const isSamePrev = dayjs(currDate).isSame(user?.create_date, 'day');
        if (isSamePrev) {
            setDisablePrev(true);
        } else {
            if (isSame) {
                setDisablePrev(true);
            } else {
                setDisablePrev(false);
            }
        }
    }, [currDate]);

    const { replace } = useNavigation<NativeStackNavigationProp<any>>();

    const isSame = dayjs().isSame(currDate, 'day');

    return (
        <>
            <ContainerTabWithoutScroll
                backBtnPress={() => {
                    replace(WellnessRouteNames.WELLNESS_LANDING_PAGE);
                }}
                isBack
                headerHeading='Track Progress'
            >
                <TabSelector
                    activeTab={selectedTab - 1}
                    onChange={(item) => setSelectedTab(item?.key)}
                    tabs={data}
                    tabStyle={{ width: SCREEN_WIDTH * 0.5 }}
                    containerStyle={{ paddingTop: 20 }}
                />

                {selectedTab === 1 ? (
                    <ListView
                        onCurrDateChange={(date) => setCurrDate(date)}
                        tabType
                        maxDate={isSame}
                        minDate={disablePrev}
                        statusEnabled={false}
                        disableDatePress
                        date={currDate}
                        calMinDate={new Date(user?.create_date)}
                    />
                ) : (
                    <>
                        <WellnessDataComponent />
                    </>
                )}
            </ContainerTabWithoutScroll>
        </>
    );
};

export default Progress;
