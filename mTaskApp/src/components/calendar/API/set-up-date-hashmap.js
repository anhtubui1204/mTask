const setUpDateHashMap = (hashMap, tasks)=>{
  //set up hashmap, store tasks in each specific date
  for(let i=0; i < tasks.length; i++){
    var dateTime = new Date(tasks[i].dateTime)
    var date = dateTime.getDate()
    var month = dateTime.getMonth()
    var year = dateTime.getFullYear()
    
    // set up hashmap {year: {month: {date: [tasks]}}}
    if(hashMap[year]){
      if(hashMap[year][month]){
        if(hashMap[year][month][date]){
          hashMap[year][month][date].push(tasks[i])
        }else{
          hashMap[year][month][date] = [tasks[i]]
        }
      }else{
        hashMap[year][month] = {[date]: [tasks[i]]}
      }
    }else{
      hashMap[year] = {[month]: {[date]: [tasks[i]]}}
    }
  }
  return hashMap
}

export default setUpDateHashMap