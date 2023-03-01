import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../component/RoundedButton';
import {Sizes} from '../../../utils/sizes.js'


export const Focus = ({ addSubject, addHistory }) => {
  const [tmpItem, setTmpItem] = useState(null);
  console.log(tmpItem);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What will you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            onSubmitEditing={({ nativeEvent }) => {
              setTmpItem(nativeEvent.text);
            }}
          />

          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(tmpItem);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: Sizes.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:Sizes.lg,
  },
  inputContainer: {
    paddingTop: Sizes.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
