import {GET_TASKS_ON_SPECIFIC_DATE} from '../../../actions/types'
const fetchItemSpecificDate = (selectedDate, hashMap, dispatch, setItemOnSpecificDate)=>{
/**
 * from the date hashmap, extract tasks on a specific date and dispatch to overview-calendar store.
 */
// nếu chọn ngày
if(selectedDate){
    let selectedYear = selectedDate.getFullYear()
    let selectedMonth = selectedDate.getMonth()
    selectedDate = selectedDate.getDate()
    // console.log(selectedYear, selectedMonth, selectedDate)
    if( //check null for every undefined number in the hashmap. Nếu là ngày không null, khi user chọn mỗi ngày để xem tasks
      hashMap[selectedYear] &&
      hashMap[selectedYear][selectedMonth]&&
      hashMap[selectedYear][selectedMonth][selectedDate])
      { 
      setItemOnSpecificDate(hashMap[selectedYear][selectedMonth][selectedDate])
      var tasksOnSpecificDate = hashMap[selectedYear][selectedMonth][selectedDate]
      dispatch({
        type: GET_TASKS_ON_SPECIFIC_DATE,
        tasksOnSpecificDate
      })
    }else{
      dispatch({
        type: GET_TASKS_ON_SPECIFIC_DATE,
        tasksOnSpecificDate: []
      })
    }
  }
  else{ // nếu ngày là null. khi users chuyển trang qua. 
    // alert('1'+ selectedDate)
    var dateToday = new Date().getDate()
    var monthToday = new Date().getMonth()
    var yearToday = new Date().getFullYear()
    if( hashMap[yearToday] &&
        hashMap[yearToday] && hashMap[yearToday][monthToday] &&
        hashMap[yearToday] && hashMap[yearToday][monthToday] && hashMap[yearToday][monthToday][dateToday])
      {
        setItemOnSpecificDate(hashMap[yearToday][monthToday][dateToday])
        var tasksOnSpecificDate = hashMap[yearToday][monthToday][dateToday]
        console.log('tasks when opening calendar overview', tasksOnSpecificDate)
        dispatch({
          type: GET_TASKS_ON_SPECIFIC_DATE,
          tasksOnSpecificDate
        })
        console.log('there is tasks when switching page')
    }else{
      console.log('no task when switching page')
      dispatch({
        type: GET_TASKS_ON_SPECIFIC_DATE,
        tasksOnSpecificDate: []
      })
    }
  
  }
  
}

export default fetchItemSpecificDate