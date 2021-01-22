import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Calendar,
  Text,
} from '@ui-kitten/components';
import { useDispatch, useSelector } from "react-redux";
import overviewCalendar_API from './API'

const now = new Date();
const minDate = new Date(100, now.getMonth(), 15);
const maxDate = new Date(99999, now.getMonth() + 1, 15);

var hashMap = {}


export default function CalendarCustomDayShowcase  () {
  
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [itemsOnSpecificDate, setItemOnSpecificDate] = React.useState([])
  const dispatch = useDispatch();
  const todos = useSelector(state => state.taskReducer.tasks);
  if(Object.keys(hashMap).length ===0) //debugging overpopulate data in each date in the hashmap
  hashMap = overviewCalendar_API.setUpDateHashmap(hashMap, todos)

  /**
   *  DayCell, MonthCell and YearCell is for customizing ui for each cell.
   *  implemented logic to mark cells with events. 
   * 
   */
  const DayCell = ({ date }, style) => (
    <View
      style={[styles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>
      {
            hashMap[date.getFullYear()] &&
            hashMap[date.getFullYear()][date.getMonth()] &&
          hashMap[date.getFullYear()][date.getMonth()][date.getDate()] ? <Text >x</Text>: null}
     
      </Text>
    </View>
  );

  const MonthCell = ({ date }, style) => 
  { 
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      <View
        style={[styles.dayContainer, style.container]}>
        <Text style={style.text}>{`${monthArr[date.getMonth()]}`}</Text>
        <Text style={[style.text, styles.value]}>
        {
              hashMap[date.getFullYear()] &&
              hashMap[date.getFullYear()][date.getMonth()] ? <Text>x</Text>: null}
       
        </Text>
      </View>
    );
  }

  const YearCell = ({ date }, style) => 
  { 
    return (
      <View
        style={[styles.dayContainer, style.container]}>
        <Text style={style.text}>{`${date.getFullYear()}`}</Text>
        <Text style={[style.text, styles.value]}>
        {
              hashMap[date.getFullYear()]  ? <Text>x</Text>: null}
       
        </Text>
      </View>
    );
  }
  

  const fetchItemSpecificDate = (selectedDate) =>{
    overviewCalendar_API.fetchItemSpecificDate(selectedDate, hashMap, dispatch, setItemOnSpecificDate)
    // console.log('itemOSD', itemsOnSpecificDate)
  }




  useEffect(() => { // onComponentDidUpdate
    fetchItemSpecificDate(selectedDate)
  });
 
 
  return (
      <React.Fragment>
           <Calendar
            style={{width: '100%'}}
            
            date={selectedDate}
            onSelect={setSelectedDate}
            renderDay={DayCell}
            renderMonth={MonthCell}
            renderYear={YearCell}
            min={minDate}
            max={maxDate}
          />
      </React.Fragment>
   
  );
};

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
  eventMarker: {
    backgroundColor: 'green',
    height: 1,
    width: 10
  }
  
    // calendar: {
    //   flexDirection: 'column',
    //   alignItems: 'stretch',
    //   flex: 1,
    // //   justifyContent: 'center',
    // //   aspectRatio: 1

    // },
});