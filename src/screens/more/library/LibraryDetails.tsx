import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import RenderHTML, { defaultSystemFonts } from 'react-native-render-html';
import Calendar from 'src/assets/svg/calendar.svg';
import Clock from 'src/assets/svg/clock.svg';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import colors from 'src/constants/colors';
import { SCREEN_WIDTH } from 'src/constants/deviceInfo';
import { fonts } from 'src/constants/fonts';
import { dateFormatter } from 'src/utils/dateFormatter';
import styles from './Library.style';
type Props = {
    route?: any;
};

const LibraryDetails = ({ route }: Props) => {
    const item = route?.params?.item;

    return (
        <ContainerTabWithoutScroll isBack>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    marginHorizontal: 20,
                    backgroundColor: colors.background,

                    marginTop: 20,

                    marginBottom: 30,
                    paddingBottom: 50,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.defaultWhite,
                        paddingBottom: 50,
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Image
                        resizeMode='cover'
                        style={styles.imageDetailsStyle}
                        source={{ uri: item?.image }}
                    />
                    <Text style={styles.heading}>{item?.title}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 3,
                            }}
                        >
                            <Calendar height={10} width={10} />
                            <Text style={styles.bottomText2}>
                                {dateFormatter(item?.created_at)}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <Clock height={10} width={10} />
                            <Text
                                style={styles.bottomText2}
                            >{`Reading Time < ${item?.reading_time}`}</Text>
                        </View>
                    </View>
                    <RenderHTML
                        contentWidth={SCREEN_WIDTH}
                        source={{ html: `${item?.content}` }}
                        systemFonts={[...defaultSystemFonts, fonts.regular]}
                        tagsStyles={{
                            p: styles.textStyle,
                            div: styles.textStyle,
                            h1: styles.headingText,
                            h2: styles.headingText,
                            h3: styles.headingText,
                            h4: styles.headingText,
                            span: styles.textStyle,
                            strong: styles.textStyle,
                            li: styles.liStyles,
                            ol: styles.olStyles,
                        }}
                        allowedStyles={['fontSize', 'color']}
                        baseStyle={{
                            fontFamily: fonts.regular,
                            // lineHeight: 20,
                            fontStyle: 'normal',
                            opacity: 0.5,
                        }}
                    />
                </View>
            </ScrollView>
        </ContainerTabWithoutScroll>
    );
};

export default LibraryDetails;
