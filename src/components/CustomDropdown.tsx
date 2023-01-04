import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { reportOption } from 'src/api/otherService';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { useRequest } from 'src/hooks/useRequest';

type Props = {
    onChange: (id: any) => void;
    value: any;
};

const CustomDropdown = ({ onChange, value }: Props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        sendRequest();
    }, []);

    const onSuccess = (fetchedData) => {
        setList([
            ...fetchedData?.data?.user_options,
            {
                id: 0,
                option: 'Something else',
            },
        ]);
    };

    const { isLoading, sendRequest } = useRequest({
        api: reportOption,
        onSuccess,
    });

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.borderColor,
                paddingLeft: 10,
                marginBottom: 30,
            }}
        >
            {isLoading ? (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: colors.blackOpacity,
                        zIndex: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: fonts.regular,
                            color: colors.defaultWhite,
                        }}
                    >
                        Fetching list...
                    </Text>
                </View>
            ) : null}
            <Dropdown
                placeholderStyle={{
                    color: colors.placeholderColor,
                    fontFamily: fonts.regular,
                    fontSize: 15,
                    lineHeight: 18,
                }}
                containerStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.borderColor,
                }}
                fontFamily={fonts.regular}
                // selectedTextStyle={styles.selectedTextStyle}
                data={list}
                maxHeight={200}
                labelField='option'
                valueField='id'
                placeholder='Select Reason'
                value={value}
                onChange={(item) => {
                    onChange(item.id);
                }}
            />
        </View>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({});
