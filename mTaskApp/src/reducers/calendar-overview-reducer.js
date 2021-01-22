import {STORE_DATEHASHMAP, GET_TASKS_ON_SPECIFIC_DATE} from '../actions/types'
const initiateState ={
    tasksOnSpecificDate: [],
    dateHashMap: {}
}


export default function calendarOverview(state = initiateState, action){
    switch(action.type){
        case GET_TASKS_ON_SPECIFIC_DATE:
            console.log('action in overview calendar reducer: ', action)
            return {...state, tasksOnSpecificDate: action.tasksOnSpecificDate}
        case STORE_DATEHASHMAP:
            return {...state, dateHashMap: action.dateHashMap}
        default: 
            return state
    }
}
