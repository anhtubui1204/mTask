import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
export default function DayCell ({ date }, style) {
    // var hashMap = useSelector(state => state.calendarOverViewReducer.dateHashMap)

    return (
        <View
          style={[styles.dayContainer, style.container]}>
          <Text style={style.text}>{`${date.getDate()}`}</Text>
          <Text style={[style.text, styles.value]}>
          {
                hashMap[date.getFullYear()] &&
                hashMap[date.getFullYear()][date.getMonth()] &&
              hashMap[date.getFullYear()][date.getMonth()][date.getDate()] ? <Text>x</Text>: null}
         
          </Text>
        </View>
      );
}

const styles = StyleSheet.create({
    dayContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
    },
    value: {
      fontSize: 12,
      fontWeight: '400',
    },
  });