import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from 'src/constants/colors';
import Check from 'src/assets/svg/check.svg';

type Props = {
  onPress?: (checked: boolean) => void;
  isChecked?: boolean;
};

const Checkbox = ({ isChecked, onPress }: Props) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    onPress && onPress(checked);
  }, [checked]);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <Pressable
      hitSlop={30}
      onPress={() => setChecked((prev) => !prev)}
      style={styles.container}
    >
      {checked && <Check />}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderColor: colors.checkBox,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
});
