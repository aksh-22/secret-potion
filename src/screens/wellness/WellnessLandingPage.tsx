import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Assessment from 'src/assets/svg/assessment.svg';
import Badge from 'src/assets/svg/badge.svg';
import CreatePlan from 'src/assets/svg/createPlan.svg';
import MyPlan from 'src/assets/svg/myPlan.svg';
import Right from 'src/assets/svg/right.svg';
import TrackProgress from 'src/assets/svg/trackProgress.svg';
import ContainerTab from 'src/components/container/ContainerTab';
import { showMessage } from 'src/components/messageModal/MessageModal';
import colors from 'src/constants/colors';
import { WellnessRouteNames } from 'src/constants/routeName';
import { useAppSelector1 } from 'src/hooks/reducer';
import styles from './Wellness.style';

type Props = {
    route: any;
};

const WellnessLandingPage = ({ route }: Props) => {
    const {
        userReducer: { user },
    } = useAppSelector1();

    useEffect(() => {
        if (route?.params) {
            navigate(WellnessRouteNames.WELLNESS);
        }
    }, []);

    const assessment = user?.social_wellness_avg !== null;

    const planCreated = user?.is_plan_created;

    const badgeEarned = user?.is_badge_earned;

    const data = [
        {
            id: 0,
            status: assessment ? 'added' : 'shouldAdd',
            disabled: false,
            icon: <Assessment />,
            name: 'Assessment',
            route: assessment
                ? WellnessRouteNames.WELLNESS
                : WellnessRouteNames.WELLNESSFIRSTMESSAGE,
        },
        {
            id: 1,
            status:
                assessment && !planCreated
                    ? 'shouldAdd'
                    : planCreated
                    ? 'added'
                    : 'toAdd',
            disabled: !assessment,
            icon: <CreatePlan />,
            name: 'Manage Plan',
            route: WellnessRouteNames.CREATE_PLAN,
        },
        {
            id: 2,
            status: planCreated ? 'added' : 'toAdd',
            disabled: !planCreated,
            icon: <MyPlan />,
            name: 'My Plan',
            route: WellnessRouteNames.MY_PLAN,
        },
        {
            id: 3,
            status: planCreated ? 'added' : 'toAdd',
            disabled: !planCreated,
            icon: <TrackProgress />,
            name: 'Track Progress',
            route: WellnessRouteNames.PROGRESS,
        },
        {
            id: 4,
            status:
                planCreated && !badgeEarned
                    ? 'shouldAdd'
                    : badgeEarned
                    ? 'added'
                    : 'toAdd',
            disabled: !badgeEarned,
            icon: <Badge />,
            name: 'badges Earned',
            route: WellnessRouteNames.BADGES,
        },
    ];
    const { t } = useTranslation();

    const { navigate, replace } =
        useNavigation<NativeStackNavigationProp<any>>();

    return (
        <ContainerTab
            isBack
            textContainerStyle={{ height: 100 }}
            heading={t('wellness:createWellnessPlan')}
            statusBarColor={colors.defaultWhite}
            headerStyle={{ backgroundColor: colors.defaultWhite }}
        >
            <View style={{ flex: 1 }}>
                {data?.map((el, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            if (el?.route) {
                                navigate(el?.route);
                            } else {
                                showMessage({
                                    isVisible: true,
                                    message: 'Coming Soon',
                                    type: 'Info',
                                });
                            }
                        }}
                        disabled={el.disabled}
                        key={index}
                        activeOpacity={0.5}
                        style={[
                            styles.wellnessPlanBox,
                            { opacity: el.disabled ? 0.5 : 1 },
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {el?.icon}
                            <Text style={styles.boxText}>{el.name}</Text>
                        </View>
                        <View
                            style={[
                                styles.boxIconWrapper,
                                {
                                    backgroundColor:
                                        el.status === 'shouldAdd'
                                            ? colors.regentBlue
                                            : el.status !== 'added'
                                            ? colors.linkWater
                                            : colors.profile2,
                                },
                            ]}
                        >
                            {el.status === 'shouldAdd' ? (
                                <Ionicons
                                    name='add'
                                    size={20}
                                    color={colors.defaultWhite}
                                    // style={{ backgroundColor: 'red' }}
                                />
                            ) : el.status === 'added' ? (
                                <Right />
                            ) : (
                                <Ionicons
                                    name='add'
                                    size={20}
                                    color={colors.defaultWhite}
                                    // style={{ backgroundColor: 'red' }}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ContainerTab>
    );
};

export default WellnessLandingPage;
