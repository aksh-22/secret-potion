import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import NoteYellow from 'src/assets/svg/noteRegentBlue.svg';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import DiaryShimmer from 'src/components/shimmers/DiaryShimmer';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { DiaryRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { dateFormatter } from 'src/utils/dateFormatter';
import { diaryDetailType } from 'typings/diaryDetail';
import styles from './Diary.style';

const HEIGHT = (SCREEN_WIDTH - 30) * 0.3;

type Props = {
    diaryData?: Array<diaryDetailType>;
    isLoading?: boolean;
    onEndReached?: () => void;
    onRefresh?: () => void;
};

type renderItemProps = {
    item?: diaryDetailType;
    index: number;
};

const DayView = ({ isLoading, onEndReached, onRefresh }: Props) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const diaryData = useAppSelector((state) => state?.postReducer?.diaryData);

    const onItemPres = (item: any, index: number) => {
        navigate(DiaryRouteNames.DIARYDETAILS, { item, index });
    };

    const renderItem = ({ item, index }: renderItemProps) => {
        return (
            <TouchableOpacity
                style={{ margin: 5 }}
                onPress={() => onItemPres(item, index)}
                key={index}
            >
                <NoteYellow fill={item?.color} height={HEIGHT} width={HEIGHT} />
                <View style={styles.textView}>
                    <Text numberOfLines={1} style={styles.title}>
                        {item?.title?.trim()?.length ? item?.title : 'No title'}
                    </Text>
                    <Text numberOfLines={1} style={styles.date}>
                        {dateFormatter(item?.date)}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 15,
                paddingBottom: 30,
                justifyContent: 'center',
                // alignItems: 'center',
            }}
        >
            <FlatList
                style={{ flex: 1 }}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                refreshing={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingTop: 20,
                    paddingBottom: 100,
                    // justifyContent: 'center',
                }}
                onEndReached={onEndReached}
                ListFooterComponent={
                    <View>{isLoading && <DiaryShimmer count={6} />}</View>
                }
                ListEmptyComponent={
                    <View
                        style={{
                            flex: 1,
                            // justifyContent: 'center',
                            // alignItems: 'center',
                        }}
                    >
                        {isLoading ? (
                            <DiaryShimmer count={30} />
                        ) : (
                            <EmptyPlaceholder text='No data found' />
                        )}
                    </View>
                }
                numColumns={SCREEN_WIDTH > 450 ? 4 : 3}
                data={diaryData}
                renderItem={renderItem}
            />
        </View>
    );
};

export default memo(DayView);
