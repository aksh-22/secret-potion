import { API_URL_LIVE_NEW } from '@env';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useDispatch } from 'react-redux';
import ContainerTabWithoutScroll from 'src/components/container/ContainerTabWithoutScroll';
import LoadingComponent from 'src/components/LoadingComponent';
import TabSelector from 'src/components/TabSelector';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { aboutUsType } from 'typings/aboutUsType';

const url1 = `${API_URL_LIVE_NEW}term-condition`;
const url2 = `${API_URL_LIVE_NEW}privacy-policy`;

type Props = {};

// const data = [
//     { name: 'About Us', key: 1 },
//     { name: 'Terms & Conditions', key: 2 },
//     { name: 'Privacy Policy', key: 3 },
// ];

const About = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState(1);
    const [aboutData, setAboutData] = useState<Array<aboutUsType>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const getData = () => {
        setIsLoading(true);
        dispatch({
            type: 'ABOUT_US',
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

    const fontUrl = Platform.select({
        ios: 'AvenirLTStd-Book.otf',
        android: 'file:///android_asset/fonts/AvenirLTStd-Book.otf',
    });

    const pageHtml = `
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <style>
              @font-face {
                font-family: 'AvenirLTStd-Book'; 
                src:url('${fontUrl}') format('opentype');
              }
h1, h2, h3, html, body { font-family: AvenirLTStd-Book; }
</style>
          </head>
          <body>
          ${aboutData[selectedTab - 1]?.content}
          </body>
        </html>
      `;

    const webViewSource = { html: pageHtml, baseUrl: '' };

    return (
        <ContainerTabWithoutScroll isBack>
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
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            // paddingHorizontal: 20,
                            // paddingTop: 50,
                            backgroundColor: colors.defaultWhite,
                        }}
                    >
                        <WebView
                            startInLoadingState={true}
                            renderLoading={() => (
                                <View style={{ flex: 1 }}>
                                    <ActivityIndicator
                                        color={colors.regentBlue}
                                        size={80}
                                    />
                                </View>
                            )}
                            // source={{
                            //     html: `
                            //     <body style="width: 100%;font-size: 40px; text-align: justify;" >
                            //         ${aboutData[selectedTab - 1]?.content}
                            //     </body>
                            //     `,
                            // }}
                            // style={{  }}

                            url
                            source={webViewSource}
                            originWhitelist={['*']}
                        />
                        {/* <RenderHtml
                            contentWidth={SCREEN_WIDTH}
                            source={{
                                html: `${aboutData[selectedTab - 1]?.content}`,
                                body: aboutData[selectedTab - 1]?.name,
                            }}
                            systemFonts={[...defaultSystemFonts, fonts.regular]}
                            ignoredDomTags={['font']}
                            tagsStyles={{
                                p: styles.textStyle,
                                div: styles.textStyle,
                                h1: styles.heading,
                                h2: styles.heading,
                                h3: styles.heading,
                                h4: styles.heading,
                                span: styles.textStyle,
                                strong: styles.textStyle,
                                body: styles.body,
                            }}
                            allowedStyles={['fontSize']}
                            baseStyle={{
                                fontFamily: fonts.regular,
                                lineHeight: 25,
                                fontStyle: 'normal',
                                color: colors.defaultBlack,
                                // opacity: 0.5,
                            }}
                        /> */}
                    </ScrollView>
                </>
            )}
        </ContainerTabWithoutScroll>
    );
};

export default About;

const styles = StyleSheet.create({
    body: {
        fontFamily: fonts.regular,
        textAlign: 'justify',
    },
    textStyle: {
        color: colors.lightBlack,
        fontFamily: fonts.regular,
        // lineHeight: 20,
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 15,
        lineHeight: 20,
        padding: 10,
        marginTop: 10,
        textAlign: 'justify',
        flex: 1,
        // opacity: 0.5,
    },
    textStyle2: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        lineHeight: 25,
        fontWeight: '400',
        fontStyle: 'normal',
        opacity: 0.5,
        // opacity: 0.5,
    },
    heading: {
        color: colors.defaultBlack,
        fontFamily: fonts.regular,
        lineHeight: 25,
        fontWeight: '400',
        fontStyle: 'normal',
        opacity: 1,
    },
});
