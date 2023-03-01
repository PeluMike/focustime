import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundedButton } from './RoundedButton';


export default TimerBtn = ({onChangeTime}) => {
  return (
      <View style={styles.bttnCon}>
        <RoundedButton title="10" size={60} onPress={() => {onChangeTime(10)}} />

        <RoundedButton title="15" size={60} onPress={() => {{onChangeTime(15)}}} />

        <RoundedButton title="20" size={60} onPress={() => {{onChangeTime(20)}}} />
      </View>
  );
};

const styles = StyleSheet.create({
  bttnCon: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});
