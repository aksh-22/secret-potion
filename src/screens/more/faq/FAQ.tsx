import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import EmptyPlaceholder from 'src/components/emptyPlaceholder/EmptyPlaceholder';
import ExpandableBox from 'src/components/ExpandableBox';
import LoadingComponent from 'src/components/LoadingComponent';
import TabSelector from 'src/components/TabSelector';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { aboutUsType } from 'typings/aboutUsType';
import { faqType } from 'typings/faqType';

type Props = {};

// const data = [
//   { name: "General questions", key: 1 },
//   { name: "How to use app", key: 2 },
//   { name: "Manage Account", key: 3 },
// ];

const FAQ = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(1);
    const [aboutData, setAboutData] = useState<Array<faqType>>([]);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const getData = () => {
        setIsLoading(true);
        dispatch({
            type: 'FAQ',
            payload: {
                callback: (res: aboutUsType[]) => {
                    const temp = res?.map((el, index) => {
                        return {
                            name: el?.name,
                            key: index + 1,
                        };
                    });
                    setData(temp);
                    setAboutData(res);
                    setIsLoading(false);
                },
                errorCallback: () => {
                    setIsLoading(false);
                },
            },
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ContainerTabWithoutScroll headerHeading={t('settings:faq')} isBack>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <>
                    {data.length ? (
                        <TabSelector
                            activeTab={selectedTab - 1}
                            onChange={(item) => setSelectedTab(item?.key)}
                            tabs={data}
                            // tabStyle={{ width: SCREEN_WIDTH * 0.41 }}
                        />
                    ) : null}
                    <ScrollView
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 120,
                            paddingHorizontal: 20,
                            paddingTop: 50,
                            backgroundColor: colors.defaultWhite,
                        }}
                    >
                        {aboutData?.[selectedTab - 1]?.type.length ? (
                            aboutData?.[selectedTab - 1]?.type?.map(
                                (el, index) => (
                                    <ExpandableBox
                                        key={index}
                                        parent={
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    lineHeight: 18,
                                                    fontFamily: fonts.regular,
                                                    color: colors.defaultBlack,
                                                }}
                                            >
                                                {el?.heading}
                                            </Text>
                                        }
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    lineHeight: 20,
                                                    fontFamily: fonts.regular,
                                                    color: colors.defaultBlack,
                                                    padding: 10,
                                                    marginTop: 10,
                                                    textAlign: 'justify',
                                                    flex: 1,
                                                    opacity: 0.5,
                                                }}
                                            >
                                                {/* {el?.content} */}
                                                {el?.content.split('\n')}
                                            </Text>
                                        </View>
                                    </ExpandableBox>
                                )
                            )
                        ) : (
                            <EmptyPlaceholder text='No data found' />
                        )}
                    </ScrollView>
                </>
            )}
        </ContainerTabWithoutScroll>
    );
};

export default FAQ;
