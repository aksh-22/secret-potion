import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CognitiveIcon from 'src/assets/svg/cognitive.svg';
import EmotionalIcon from 'src/assets/svg/emotional.svg';
import PhysicalIcon from 'src/assets/svg/physical.svg';
import SocialIcon from 'src/assets/svg/social.svg';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import GrayText from 'src/components/GrayText';
import RequestShimmer from 'src/components/shimmers/RequestShimmer';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import BadgeDetailsBox from './BadgeDetailsBox';
import styles from './ExtraStyle';

const SIZE = 15;
const SIZE2 = 8;

const icons = {
    Cognitive: { icon: <CognitiveIcon width={SIZE} height={SIZE} /> },
    Emotional: { icon: <EmotionalIcon width={SIZE + 10} height={SIZE + 10} /> },
    Physical: { icon: <PhysicalIcon width={SIZE + 8} height={SIZE + 8} /> },
    Social: { icon: <SocialIcon width={SIZE + 5} height={SIZE + 5} /> },
};

type Props = {
    route: any;
};

type DProps = {
    name: string;
    description: string;
    background: Array<string>;
    totalBadge: number;
    wellnessId: number;
    badgeScreen: string;
    threeInRow: string;
    bonus: string;
};

const BadgeDetails = ({ route }: Props) => {
    const data: DProps = route?.params?.data;

    const [isLoading, setIsLoading] = useState(false);

    const [badgeList, setBadgeList] = useState([]);
    const [bonus, setBonus] = useState(false);

    const [page, setPage] = useState(1);
    const [shouldNext, setShouldNext] = useState(true);
    const [refreshLoading, setRefreshLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        getData(page);
    }, []);

    const onEndReached = () => {
        if (shouldNext && !isLoading) {
            setIsLoading(true);
            getData(page + 1);
            setPage((prev) => prev + 1);
        }
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        setShouldNext(true);
        getData(1);
        setPage(1);
    };

    const getData = (page: number) => {
        dispatch({
            type: 'BADGES_LIST',
            payload: {
                data: {
                    wellness_id: data?.wellnessId,
                },
                page,
                callback: (data, next, isBonus) => {
                    !next && setShouldNext(false);
                    setBonus(isBonus);
                    if (page === 1) {
                        setBadgeList(data);
                    } else {
                        setBadgeList((prev) => [...prev, ...data]);
                    }
                },
                errorCallback: () => {},
                finallyCallback: () => {
                    setIsLoading(false);
                    setRefreshLoading(false);
                },
            },
        });
    };

    const renderItem = ({ item, index }) => {
        return (
            <BadgeDetailsBox image={item?.type_image} data={data} item={item} />
        );
    };

    return (
        <ContainerTabWithoutScroll isBack statusBarColor={colors.defaultWhite}>
            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 120,
                    }}
                    onEndReached={onEndReached}
                    onRefresh={onRefresh}
                    refreshing={refreshLoading}
                    ListEmptyComponent={
                        isLoading ? (
                            <RequestShimmer count={10} />
                        ) : !bonus ? (
                            <EmptyPlaceholder
                                style={{ flex: 0.5 }}
                                text='No data found'
                            />
                        ) : null
                    }
                    ListFooterComponent={isLoading ? <RequestShimmer /> : null}
                    ListHeaderComponent={
                        <>
                            <View style={[styles.textContainer]}>
                                <View style={styles.textContainer2}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            numberOfLines={2}
                                            style={styles.heading}
                                        >
                                            {data?.name}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Image
                                                resizeMode='contain'
                                                source={{
                                                    uri: data?.badgeScreen,
                                                }}
                                                style={{
                                                    width: SIZE + 15,
                                                    height: SIZE + 15,
                                                    borderRadius: 80,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            />
                                            {/* <LinearGradient
                                                colors={data.background}
                                                style={{
                                                    width: SIZE + 15,
                                                    height: SIZE + 15,
                                                    borderRadius: 80,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {icons[data?.name].icon}
                                            </LinearGradient> */}
                                            <Text
                                                style={{
                                                    fontFamily: fonts.regular,
                                                    fontSize: 20,
                                                    lineHeight: 24,
                                                    marginLeft: 5,
                                                }}
                                            >
                                                {data?.totalBadge}
                                            </Text>
                                        </View>
                                    </View>
                                    <GrayText style={{ textAlign: 'justify' }}>
                                        {data?.description}
                                    </GrayText>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: colors.defaultWhite,
                                }}
                            >
                                <View
                                    style={[
                                        styles.bottomContainer,
                                        { borderTopStartRadius: 60 },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            fontFamily: fonts.regular,
                                            fontSize: 21,
                                            lineHeight: 25,
                                            color: colors.defaultBlack,
                                            marginBottom: 15,
                                        }}
                                    >
                                        Activities
                                    </Text>
                                </View>
                            </View>
                            {bonus && (
                                <BadgeDetailsBox
                                    image={data?.bonus}
                                    data={data}
                                    bonus={bonus}
                                />
                            )}
                        </>
                    }
                    renderItem={renderItem}
                    data={badgeList}
                />
            </View>
        </ContainerTabWithoutScroll>
    );
};

export default BadgeDetails;
