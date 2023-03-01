import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus.js';
import { Timer } from './src/features/timer/Timer.js';
import { Sizes } from './utils/sizes.js';
import { FocusHistory } from './src/features/focus/FocusHistory';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const STATUS = {
    COMPLETED: 1,
    CANCELED: 2,
  };

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusSubject([...focusHistory, { subject, status }]);
    setFocusSubject(null);
  };

  console.log(focusHistory);

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () =>{
    try{
      const history = await AsyncStorage.getItem('focusHistory')
      if (history && Json.parse(history).length){
        setFocusHistory(history)
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    loadFocusHistory()
  }, [])

  useEffect(()=>{
    saveFocusHistory()
  }, [focusHistory])
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          setFocusSubject={setFocusSubject}
          focusHistory={focusHistory}
          setFocusHistory={setFocusHistory}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform !== 'ios' ? Sizes.md : Sizes.lg,
    backgroundColor: '#252250',
  },
});
