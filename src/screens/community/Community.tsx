import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import ContainerTab2 from 'src/components/container/ContainerTab2';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import DiaryShimmer from 'src/components/shimmers/DiaryShimmer';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { communityItemType } from 'typings/communityItemType';
import CommunityBox from './CommunityBox';

import { useFocusEffect } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';
import styles from './Community.style';
import { EventRegister } from 'react-native-event-listeners';

const Community = () => {
    // ! loading state
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [shouldNext, setShouldNext] = useState(true);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [name, setName] = useState('');

    const [value] = useDebounce(name, 1000);

    useFocusEffect(
        React.useCallback(() => {
            if (value.length > 0) {
                setSearchLoading(true);
                setShouldNext(true);
                getData(1, value);
                setPage(1);
            } else {
                setIsLoading(true);
                getData(1, '');
            }
        }, [value])
    );

    // useEffect(() => {
    //     if (value.length > 0) {
    //         setSearchLoading(true);
    //         setShouldNext(true);
    //         getData(1, value);
    //         setPage(1);
    //     } else {
    //         setIsLoading(true);
    //         getData(1, '');
    //     }
    // }, [value]);

    const { t } = useTranslation();

    const [Communities, setCommunities] = useState<Array<communityItemType>>(
        []
    );

    useEffect(() => {
        const listener: any = EventRegister.on('communityReload', onRefresh);

        return () => {
            EventRegister.removeEventListener(listener);
        };
    }, []);

    const updateData = () => {};

    const dispatch = useDispatch();

    const onEndReached = () => {
        if (shouldNext && !isLoading) {
            setIsLoading(true);
            getData(page + 1, name);
            setPage((prev) => prev + 1);
        }
    };

    const onRefresh = () => {
        setIsLoading(true);
        setCommunities([]);
        setShouldNext(true);
        getData(1, '');
        setPage(1);
    };

    // useEffect(() => {
    //     setIsLoading(true);
    //     getData(1, '');
    // }, []);

    const getData = (page: number, searchText: string) => {
        dispatch({
            type: 'GET_COMMUNITY',
            payload: {
                page,
                name: searchText,
                callback: (data: communityItemType[], next: boolean) => {
                    if (page === 1) {
                        setCommunities(data);
                    } else {
                        setCommunities((prev) => [...prev, ...data]);
                    }
                    !next && setShouldNext(false);
                    setRefreshLoading(false);
                    setIsLoading(false);
                    setSearchLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                    setSearchLoading(false);
                },
            },
        });
    };

    const renderItem = ({ item, index }) => <CommunityBox item={item} />;

    return (
        <ContainerTab2
            textContainerStyle2={{ paddingVertical: 20, paddingTop: 0 }}
            contentContainerStyle={{ paddingBottom: 0, paddingTop: 0 }}
            heading={t('community:communities')}
        >
            <View
                style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}
            >
                <FlatList
                    style={{ flex: 1 }}
                    onEndReached={onEndReached}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 100,
                        paddingTop: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <View style={styles.searchBox}>
                            <TextInput
                                value={name}
                                placeholderTextColor={colors.placeholderColor}
                                style={styles.searchInput}
                                placeholder='Search'
                                onChangeText={(txt) => {
                                    setName(txt);
                                }}
                            />
                            {searchLoading ? (
                                <ActivityIndicator />
                            ) : name ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        // setIsLoading(true);
                                        setName('');
                                        setShouldNext(true);
                                        // getData(1, '');
                                        setPage(1);
                                    }}
                                >
                                    <Ionicons
                                        name='close'
                                        color={colors.defaultBlack}
                                        size={20}
                                    />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    }
                    ListFooterComponent={
                        isLoading && (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <DiaryShimmer
                                    count={20}
                                    numColumns={2}
                                    style={{
                                        width: SCREEN_WIDTH * 0.4,
                                        height: 200,
                                    }}
                                />
                            </View>
                        )
                    }
                    ListEmptyComponent={
                        !isLoading ? (
                            <EmptyPlaceholder text='No data found' />
                        ) : (
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <DiaryShimmer
                                    count={20}
                                    numColumns={2}
                                    style={{
                                        width: SCREEN_WIDTH * 0.4,
                                        height: 200,
                                    }}
                                />
                            </View>
                        )
                    }
                    data={Communities}
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
            </View>
        </ContainerTab2>
    );
};

export default Community;
