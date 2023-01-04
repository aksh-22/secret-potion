import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import CognitiveIcon from 'src/assets/svg/cognitive.svg';
import EmotionalIcon from 'src/assets/svg/emotional.svg';
import PhysicalIcon from 'src/assets/svg/physical.svg';
import SocialIcon from 'src/assets/svg/social.svg';
import ContainerTab from 'src/components/container/ContainerTab';
import { WellnessRouteNames } from 'src/constants/routeName';
import { useAppSelector } from 'src/hooks/reducer';
import { wellnessArrayType } from 'typings/wellnessArrayType';
import { wellnessDataType } from 'typings/wellnessData';
import BadgeBox from './BadgeBox';

const icons = {
    Cognitive: { icon: <CognitiveIcon /> },
    Emotional: { icon: <EmotionalIcon /> },
    Physical: { icon: <PhysicalIcon /> },
    Social: { icon: <SocialIcon /> },
};

type Props = {};

const Badges = (props: Props) => {
    const [refreshLoading, setRefreshLoading] = useState(false);

    const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

    const wellnessTypes: wellnessArrayType[] = useAppSelector(
        (state) => state?.wellnessReducer?.wellnessTypes
    );

    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        getWellness();
    }, []);

    const getWellness = () => {
        dispatch({
            type: 'WELLNESS_TYPE',
            payload: {
                callback: (res: wellnessDataType) => {
                    setRefreshLoading(false);
                },
                errorCallback: () => {
                    setRefreshLoading(false);
                },
            },
        });
    };

    const onRefresh = () => {
        setRefreshLoading(true);
        getWellness();
    };

    return (
        <ContainerTab
            refreshLoading={refreshLoading}
            onRefresh={onRefresh}
            bounces
            isBack
            headingHeader='Badges Earned'
        >
            {wellnessTypes?.map((el: wellnessArrayType, index) => (
                <BadgeBox
                    onPress={() =>
                        navigate(WellnessRouteNames.BADGE_DETAILS, {
                            data: {
                                name: el?.name,
                                description: el?.content,
                                background: el?.background,
                                totalBadge: el?.total_badge,
                                wellnessId: el?.key,
                                badgeScreen: el?.badge_screen,
                                threeInRow: el?.three_image,
                                bonus: el?.bonus_image,
                            },
                        })
                    }
                    el={el}
                    icon={icons?.[el?.name]?.icon}
                    key={index}
                />
            ))}
        </ContainerTab>
    );
};

export default Badges;
