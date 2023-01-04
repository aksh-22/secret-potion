import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ContainerTab from 'src/components/container/ContainerTab';
import CustomButton from 'src/components/customButton/CustomButton';
import CustomInput from 'src/components/customInput/CustomInput';
import DaySelector from 'src/components/DaySelector';
import LoadingComponent from 'src/components/LoadingComponent';
import { showMessage } from 'src/components/messageModal/MessageModal';
import Toggler from 'src/components/Toggler';
import colors from 'src/constants/colors';
import { fonts } from 'src/constants/fonts';
import { join_communityItemType } from 'typings/activityType';
import styles from './Plan.style';
import PlanModal from './PlanModal';

type Props = {
    route?: any;
};

const days = [
    { id: 1, name: 'Mon', selected: false, value: 'monday' },
    { id: 2, name: 'Tue', selected: false, value: 'tuesday' },
    { id: 3, name: 'Wed', selected: false, value: 'wednesday' },
    { id: 4, name: 'Thu', selected: false, value: 'thursday' },
    { id: 5, name: 'Fri', selected: false, value: 'friday' },
    { id: 6, name: 'Sat', selected: false, value: 'saturday' },
    { id: 7, name: 'Sun', selected: false, value: 'sunday' },
];

const daysSelected = [
    { id: 1, name: 'Mon', selected: true, value: 'monday' },
    { id: 2, name: 'Tue', selected: true, value: 'tuesday' },
    { id: 3, name: 'Wed', selected: true, value: 'wednesday' },
    { id: 4, name: 'Thu', selected: true, value: 'thursday' },
    { id: 5, name: 'Fri', selected: true, value: 'friday' },
    { id: 6, name: 'Sat', selected: true, value: 'saturday' },
    { id: 7, name: 'Sun', selected: true, value: 'sunday' },
];

const AddPlan = ({ route }: Props) => {
    const activityName = route?.params?.name;
    const activityDescription = route?.params?.description;
    const isAdmin = route?.params?.isAdmin;
    const wellness_id = route?.params?.wellness_id;
    const activity_id = route?.params?.activity_id;
    const isEdit = route?.params?.isEdit;
    const onItemAdd = route?.params?.onItemAdd;
    const index = route?.params?.index;
    const heading = route?.params?.heading;
    const modalDescription = route?.params?.modalDescription;
    const day = route?.params?.dayData;

    let temp2 = [];

    if (day) {
        temp2 = days.map((el) => {
            return { ...el, selected: day.includes(el?.value) };
        });
    }

    const [On, setOn] = useState(day?.length === 7 ? false : true);
    const [dayData, setDayData] = useState(temp2.length ? temp2 : days);
    const [description, setDescription] = useState(activityDescription ?? '');
    const [name, setName] = useState(activityName ?? '');
    const [nameError, setNameError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [show, setShow] = useState(false);

    const ref = useRef(null);

    const dispatch = useDispatch();

    const { goBack } = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        if (isEdit) {
            // isEdit && getData();
        } else {
            if (activityName && isAdmin) setShow(true);
        }
    }, []);

    const addActivity = () => {
        let days = [];
        let days2 = [];

        dayData.forEach((el) => {
            days.push({ value: el?.value, selected: el?.selected });
            if (el.selected) {
                days2.push({ day_name: el?.value });
            }
        });
        if (!name.trim().length) {
            setNameError('Name is required');
        }
        // else if (!description.trim().length) {
        //     showMessage({
        //         isVisible: true,
        //         message: 'Description is required',
        //     });
        // }
        else if (!days2.length) {
            showMessage({
                isVisible: true,
                message: 'Select a day',
            });
        } else {
            setIsLoading(true);
            const data = {
                schedule_type: On ? 'day' : 'daily',
                name,
                description,
                wellness_id,
                user_type: isAdmin ? 'admin' : 'user',
                days,
            };

            if (activity_id) {
                data['activity_id'] = activity_id;
            }

            // activity_id && data.activity_id=activity_id
            dispatch({
                type: isEdit ? 'UPDATE_SCHEDULE' : 'ADD_SCHEDULE',
                payload: {
                    data,
                    callback: (data) => {
                        let temp: join_communityItemType = {
                            ...data,
                            day: days2,
                        };
                        setIsLoading(false);
                        if (isEdit) {
                            onItemAdd(temp, index);
                        } else {
                            onItemAdd(temp);
                        }
                        goBack();
                    },
                    errorCallback: () => {
                        setIsLoading(false);
                    },
                },
            });
        }
    };

    return (
        <>
            <ContainerTab
                contentContainerStyle={{
                    paddingTop: 0,
                    backgroundColor: colors.defaultWhite,
                    paddingBottom: 100,
                }}
                contentContainerStyle2={{
                    backgroundColor: colors.defaultWhite,
                }}
                isBack
                headingHeader='Schedule Activity'
                message={false}
                bell={false}
            >
                {isDataLoading ? (
                    <LoadingComponent />
                ) : (
                    <>
                        <CustomInput
                            editable={!isAdmin}
                            maxLength={30}
                            placeholder='Name'
                            onChangeText={(txt) => {
                                setName(txt);
                                nameError && setNameError('');
                            }}
                            value={name}
                            errorMessage={nameError}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 10,
                            }}
                        >
                            <Text style={styles.addPlanText}>
                                Schedule for:
                            </Text>
                            <View
                                style={{
                                    marginLeft: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.addPlanText,
                                        {
                                            color: On
                                                ? colors.lightBlack
                                                : colors.regentBlue,
                                            fontWeight: '400',
                                        },
                                    ]}
                                >
                                    Daily
                                </Text>
                                <View style={{ marginHorizontal: 5 }}>
                                    <Toggler
                                        isOn={On}
                                        onValueChange={(val) => {
                                            setOn(val);
                                            val
                                                ? setDayData(days)
                                                : setDayData(daysSelected);
                                        }}
                                        barHeight={20}
                                        circleSize={15}
                                        switchWidthMultiplier={3.5}
                                        backgroundActive={colors.toggleActive}
                                        backgroundInactive={colors.toggleActive}
                                    />
                                </View>
                                <Text
                                    style={[
                                        styles.addPlanText,
                                        {
                                            color: !On
                                                ? colors.lightBlack
                                                : colors.regentBlue,
                                            fontWeight: '400',
                                        },
                                    ]}
                                >
                                    Days
                                </Text>
                            </View>
                        </View>
                        {On && (
                            <DaySelector
                                disabled={!On}
                                data={dayData}
                                onChange={(index, newData) => {
                                    const temp = [...dayData];
                                    temp[index] = newData;

                                    setDayData(temp);
                                }}
                            />
                        )}
                        <Pressable
                            onPress={() => {
                                ref.current.focus();
                            }}
                            style={{
                                backgroundColor: colors.background3,
                                borderRadius: 10,
                                padding: 10,
                                // flex: 1,
                                marginTop: 20,
                                // height: 20,
                                paddingBottom: 30,
                                minHeight: 220,
                            }}
                        >
                            <TextInput
                                ref={ref}
                                onChangeText={(text) => {
                                    setDescription(text);
                                }}
                                editable={!isAdmin}
                                multiline
                                placeholder='Write your Notes here...'
                                value={description}
                                scrollEnabled
                                placeholderTextColor={colors.lightBlack}
                                textAlignVertical='top'
                                style={{
                                    color: colors.defaultBlack,
                                    // paddingVertical:
                                    //     Platform.OS === 'ios' ? 10 : 5,
                                    fontFamily: fonts.regular,
                                }}
                            />
                        </Pressable>
                        <CustomButton
                            isLoading={isLoading}
                            title='Save'
                            onPress={addActivity}
                            style={{
                                alignSelf: 'flex-end',
                                marginTop: -30,
                                marginRight: 20,
                            }}
                        />
                    </>
                )}
            </ContainerTab>
            <PlanModal
                heading={heading}
                description={modalDescription}
                show={show}
                onClose={() => setShow(false)}
            />
        </>
    );
};

export default AddPlan;
