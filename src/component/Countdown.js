import React, { useRef, useState, useEffect } from 'react';
import { Sizes } from '../../utils/sizes';

import { View, Text, StyleSheet, Platform } from 'react-native';

const minuteToMillisec = (mins) => {
  return mins * 60 * 1000;
};
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

export default Countdown = ({ minutes , ispaused, onProgress, onEnd }) => {
  let interval = useRef();
  const [millis, setMillis] = useState(minuteToMillisec(minutes));

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        onEnd()
        return time;
      }

      let timeLeft = time - 1000;
      onProgress(timeLeft/minuteToMillisec(minutes))
      return timeLeft;
    });
  };

  let minute = Math.floor((millis / (60 * 1000)) % 60);
  let seconds = Math.floor((millis / 1000) % 60);

  useEffect(()=>{
    setMillis(minuteToMillisec(minutes))
  }, [minutes])

  useEffect(() => {
    if (ispaused){
      if (interval.current) clearInterval(interval.current);
      return
    }

    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [ispaused, countDown]);

  return (
    <View style={styles.con}>
      <Text style={styles.timeContainer}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    backgroundColor: 'blue',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.lg,
  },

  timeContainer: {
    color: '#fff',
    fontSize: Platform == 'ios' ? 100 : Sizes.xxxxl,
    textAlign: 'center',
  },
});
