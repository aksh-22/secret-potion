import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from 'src/constants/colors';
import OptionSelect from 'src/assets/svg/optionSelect.svg';
import { fonts } from 'src/constants/fonts';
import { optionsItemType, questionType } from 'typings/question';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  question: questionType;
  onChange?: (data: any) => void;
};

const SIZE = 25;

const QuestionEl = ({ question, onChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState<optionsItemType>();

  useEffect(() => {
    setSelectedOption(question?.selectedQuestion);
  }, [question]);

  return (
    <View
      style={{
        backgroundColor: colors.defaultWhite,
        borderRadius: 40,
        flex: 1,
        paddingBottom: 40,
      }}
    >
      <Text style={styles.question}>{question?.question}</Text>
      <View style={{ marginTop: 20 }}>
        {question?.options.map((el, index) => (
          <LinearGradient
            key={index}
            colors={
              selectedOption?.option_id === el?.option_id
                ? [colors.option1, colors.option2]
                : [colors.optionNon, colors.optionNon]
            }
            style={styles.element}
          >
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedOption(el);
                const a = {
                  ...el,
                  question_id: question?.question_id,
                  type: question?.type,
                };
                onChange && onChange(a);
              }}
              style={styles.element2}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      selectedOption?.option_id === el?.option_id
                        ? colors.defaultWhite
                        : colors.defaultBlack,
                  },
                ]}
              >
                {el?.option}
              </Text>
              {selectedOption?.option_id === el?.option_id ? (
                <OptionSelect height={SIZE} width={SIZE} />
              ) : null}
            </TouchableOpacity>
          </LinearGradient>
        ))}
      </View>
    </View>
  );
};

export default QuestionEl;

const styles = StyleSheet.create({
  question: {
    color: colors.defaultBlack,
    fontWeight: '400',
    lineHeight: 29,
    fontSize: 24,
    marginTop: 30,
    fontFamily: fonts.regular,
  },
  element: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: colors.regentBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 55,
  },
  element2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingVertical: 20,
    // minHeight: 60,
  },
  optionText: {
    color: colors.defaultBlack,
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
    fontFamily: fonts.regular,
  },
});
