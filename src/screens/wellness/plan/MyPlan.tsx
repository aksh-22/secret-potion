import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import { useAppSelector } from 'src/hooks/reducer';
import { userProfileType } from 'typings/user';
import GridView from './GridView';
import ListView from './ListView';

type Props = {
    route?: any;
};

const MyPlan = ({ route }: Props) => {
    const initial = route?.params?.initialTab;

    const onItemDelete = route?.params?.onItemDelete;

    const [gridView, setGridView] = useState(true);

    const onListViewPress = () => {
        setGridView(false);
    };

    const onGridViewPress = () => {
        setGridView(true);
    };

    const user: userProfileType = useAppSelector(
        (state) => state?.userReducer?.user
    );
    const [currDate, setCurrDate] = useState<any>(new Date());

    const [disablePrev, setDisablePrev] = useState(false);

    const isSame = dayjs().isSame(currDate, 'day');

    useEffect(() => {
        const isSamePrev = dayjs(currDate).isSame(user?.create_date, 'day');
        if (isSamePrev) {
            setDisablePrev(true);
        } else {
            setDisablePrev(false);
        }
    }, [currDate]);

    return (
        <>
            <ContainerTabWithoutScroll
                isBack
                onListViewPress={gridView && onListViewPress}
                onGridViewPress={!gridView && onGridViewPress}
                headerHeading='Your Wellness Plan'
            >
                {gridView ? (
                    <GridView
                        tabType={gridView}
                        initialTab={initial}
                        onDelete={onItemDelete}
                    />
                ) : (
                    <ListView
                        onCurrDateChange={(date) => setCurrDate(date)}
                        tabType={gridView}
                        maxDate={isSame}
                        minDate={disablePrev}
                        date={currDate}
                        calMinDate={new Date(user?.create_date)}
                    />
                )}
            </ContainerTabWithoutScroll>
        </>
    );
};

export default MyPlan;
