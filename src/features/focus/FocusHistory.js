import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../component/RoundedButton';
import { Sizes } from '../../../utils/sizes';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems:'center' }}>
      {!!focusHistory.length && (
      <>
        <Text style={styles.title}>Things weve focused on </Text>
         
        
          <FlatList
            style={{ fkex: 1 }}
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
            }}
            data={focusHistory}
            renderItem={HistoryItem}></FlatList>

            <RoundedButton onPress={()=>{clearHistory()}} title='clear' size={75}/>
        
      </>)}
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  historyItem:(status)=>({
    color: status > 1 ?'red':'green',
    fontSize: Sizes.md
  }) ,
  title: {
    color: 'white',
    fontSize: Sizes.lg
  }
})
