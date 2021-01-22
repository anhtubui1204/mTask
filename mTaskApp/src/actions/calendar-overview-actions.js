import {STORE_DATEHASHMAP, GET_TASKS_ON_SPECIFIC_DATE} from './types'

export function fetchSpecificDate(tasks){
    return {
        type: GET_TASKS_ON_SPECIFIC_DATE,
        tasks
    }
}

export const storeDateHashMap = (dateHashMap)=>{
    return {
        type: STORE_DATEHASHMAP,
        dateHashMap
    }
}