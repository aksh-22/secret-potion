import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';

type IProps = {
    id: number;
    name: string;
    value: string;
    selected: boolean;
};

type Props = {
    data?: IProps[];
    onAdd?: (index: any) => void;
    onRemove?: (index: any) => void;
    onChange?: (index: any, el: IProps) => void;
    disabled?: boolean;
};

const days = [
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thu' },
    { id: 5, name: 'Fri' },
    { id: 6, name: 'Sat' },
    { id: 7, name: 'Sun' },
];

const DaySelector = ({ data, onAdd, onRemove, onChange, disabled }: Props) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            {data.map((el, index) => {
                return (
                    <TouchableOpacity
                        disabled={disabled}
                        onPress={() => {
                            // el?.selected
                            //     ? onRemove(index, {
                            //           ...el,
                            //           selected: !el?.selected,
                            //       })
                            //     : onAdd(index);
                            onChange(index, { ...el, selected: !el?.selected });
                        }}
                        key={el?.id}
                    >
                        <LinearGradient
                            colors={
                                el?.selected
                                    ? [colors.mintTulip, colors.downy]
                                    : [colors.defaultWhite, colors.defaultWhite]
                            }
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 5,
                                paddingHorizontal: 25,
                                borderRadius: 13,
                                margin: 7,
                                borderWidth: 1,
                                borderColor: el?.selected
                                    ? colors.transparent
                                    : colors.lightBlack,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: fonts.regular,
                                    color: el?.selected
                                        ? colors.defaultWhite
                                        : colors.lightBlack,
                                }}
                            >
                                {el?.name}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default DaySelector;
