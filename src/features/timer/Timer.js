import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { Sizes } from '../../../utils/sizes.js';
import Countdown from '../../component/Countdown';
import { RoundedButton } from '../../component/RoundedButton';
import TimerBtn from '../../component/TimerBtn';
import { ProgressBar } from 'react-native-paper';

import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject, setFocusSubject, setFocusHistory, focusHistory }) => {
  useKeepAwake();
  let DEFAULT_TIME = 0.1;
  const [ispaused, setIspaused] = useState(true);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    // setIspaused(false)
  };

  const vibrate = () => {
    if (Platform === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const STATUS = {
    COMPLETED: 1,
    CANCELED: 2,
  };

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
    setFocusSubject(null);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    // setIspaused(false)
    addFocusHistorySubjectWithStatus(focusSubject, STATUS.COMPLETED)
    setFocusSubject(null);
  };

  const clearSubject = () => {
    addFocusHistorySubjectWithStatus(focusSubject, STATUS.CANCELED)
    setFocusSubject(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          ispaused={ispaused}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.focusText}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.empty}>
        <ProgressBar
          color="#5E84E2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.timerBtn}>
        <TimerBtn onChangeTime={changeTime} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <RoundedButton
          title={ispaused ? 'start' : 'Pause'}
          size={130}
          onPress={() => {
            setIspaused(!ispaused);
          }}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            clearSubject();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  task: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  empty: {
    marginTop: 20,
  },
  timerBtn: {
    alignItems: 'center',
  },
  clearSubject: {
    paddingLeft: 10,
    paddingTop: 10,
  },
});
