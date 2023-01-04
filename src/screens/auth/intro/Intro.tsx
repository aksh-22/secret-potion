import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import ContainerWithButton from 'src/components/container/ContainerWithButton';
import colors from 'src/constants/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { AuthRouteNames } from 'src/constants/routeName';
import { useAppDispatch } from 'src/hooks/reducer';
import { setInitialAppLaunch } from 'src/redux/reducer/appReducer';
import { AuthStackParamList } from 'src/routes/types/navigation';
import styles from './Intro.style';

const Intro = () => {
    const [index, setIndex] = useState(0);
    const flatListRef = useRef<any>(null);

    const { replace } =
        useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const data = [
        {
            heading: t('intro:screen_1.heading'),
            description: t('intro:screen_1.description'),
            image: require('src/assets/images/intro1.png'),
            SIZE: 0.5,
        },
        {
            heading: t('intro:screen_2.heading'),
            description: t('intro:screen_2.description'),
            image: require('src/assets/images/intro2.png'),
            SIZE: 0.5,
        },
    ];

    const renderItem = ({ item, index }: { item: any; index: any }) => (
        <View
            style={{
                width: SCREEN_WIDTH,
                alignItems: 'center',
                // justifyContent: 'space-between',
                // minHeight: 340,
            }}
        >
            <Image
                source={item.image}
                resizeMode='contain'
                style={{
                    // width: SCREEN_WIDTH * item?.SIZE,
                    height: SCREEN_WIDTH * item?.SIZE,
                    // height: (SCREEN_HEIGHT * 30) / 100,
                    marginTop: 10,
                }}
            />
            <View style={{ paddingHorizontal: 25, marginTop: 10 }}>
                <Text style={[styles.heading2, styles.text]}>
                    {item.heading}
                </Text>
                <Text style={[styles.lowerText]}>{item.description}</Text>
            </View>
        </View>
    );

    const rightArrowPress = () => {
        if (index === 0) {
            setIndex(1);
            flatListRef?.current?.scrollToIndex({
                index: index + 1,
                animated: true,
            });
        } else {
            dispatch(setInitialAppLaunch(false));
            // replace(AuthRouteNames.LOGIN);
        }
    };

    return (
        <ContainerWithButton
            rightArrowPress={rightArrowPress}
            rightArrow
            style={{ paddingHorizontal: 0 }}
        >
            <View style={{ flex: 1, backgroundColor: colors.defaultWhite }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={[styles.heading1, styles.text]}>
                        {t('intro:mainHeading')}
                    </Text>
                    <Text style={styles.descriptionNew}>
                        {t('intro:mainDescription')}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <SwiperFlatList
                        ref={flatListRef}
                        paginationStyleItemActive={styles.dotActive}
                        paginationStyleItemInactive={styles.dotInActive}
                        paginationStyle={{
                            alignItems: 'center',
                            position: 'relative',
                            marginTop: 20,
                        }}
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        index={index}
                        onChangeIndex={(i) => setIndex(i.index)}
                        showPagination
                        data={data}
                        renderItem={renderItem}
                    />
                </View>
            </View>
        </ContainerWithButton>
    );
};

export default Intro;
