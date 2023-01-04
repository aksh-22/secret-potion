import {
    View,
    Text,
    FlatList,
    RefreshControl,
    Image,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { libraryType } from 'typings/libraryType';
import styles from './Library.style';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import Clock from 'src/assets/svg/clock.svg';
import Calendar from 'src/assets/svg/calendar.svg';
import { dateFormatter } from 'src/utils/dateFormatter';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import LoadingComponent from 'src/components/LoadingComponent';
import DiaryShimmer from 'src/components/shimmers/DiaryShimmer';
import { RootStackName } from 'src/constants/routeName';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';

type Props = {};

const Library = (props: Props) => {
    const [libraryData, setLibraryData] = useState<Array<libraryType>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshLoading, setRefreshLoading] = useState(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const getData = () => {
        dispatch({
            type: 'LIBRARY',
            payload: {
                callback: (library) => {
                    setLibraryData(library);
                    setRefreshLoading(false);
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setRefreshLoading(false);
                    setIsLoading(false);
                },
            },
        });
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getData();
    };

    useEffect(() => {
        setIsLoading(true);
        getData();
    }, []);

    const renderItem = ({
        item,
        index,
    }: {
        item: libraryType;
        index: number;
    }) => {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() =>
                    navigate(RootStackName.LIBRARY_DETAILS, { item })
                }
            >
                <Image
                    resizeMode='cover'
                    style={styles.imageStyle}
                    source={{ uri: item?.image }}
                />
                <Text numberOfLines={1} style={styles.heading}>
                    {item?.title}
                </Text>
                <Text numberOfLines={2} style={styles.description}>
                    {item?.content.replace(/<[^>]+>/g, '')}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 3,
                    }}
                >
                    <Calendar height={10} width={10} />
                    <Text style={styles.bottomText}>
                        {dateFormatter(item?.created_at)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Clock height={10} width={10} />
                    <Text
                        style={styles.bottomText}
                    >{`Reading Time < ${item?.reading_time}`}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <ContainerTabWithoutScroll
            statusBarColor={colors.background}
            headerStyle={{ backgroundColor: colors.background }}
            headerHeading={t('settings:library')}
            isBack
        >
            {isLoading ? (
                <DiaryShimmer
                    count={20}
                    numColumns={2}
                    style={{ width: SCREEN_WIDTH * 0.5, height: 200 }}
                />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 120,
                        marginTop: 20,
                    }}
                    data={libraryData}
                    renderItem={renderItem}
                    numColumns={2}
                    ListEmptyComponent={<EmptyPlaceholder text='Coming soon' />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshLoading}
                            onRefresh={onRefresh}
                            tintColor={colors.regentBlue}
                            colors={[colors.regentBlue, colors.red]}
                            title='Pull to refresh'
                            titleColor={colors.regentBlue}
                        />
                    }
                />
            )}
        </ContainerTabWithoutScroll>
    );
};

export default Library;
