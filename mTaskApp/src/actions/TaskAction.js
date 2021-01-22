import { GET_TASKS, DELETE_TASK, ADD_TASK, EDIT_TASK, GET_MY_TASKS, GET_TASK_ITEM, CLEAR_TASK_ITEM, DELETE_LIST_FROM_ITEM } from './types'
import axios from 'axios';
import _ from 'lodash'
import moment from 'moment-timezone'
import * as url from '../constants/url/url'
function between(x, min, max) {
    return x >= min && x <= max;
}


//get all tasks
export const getTasksAction = (is5days = false) => async dispatch => {
    const res = await axios.get(url.tasks)
    dispatch({
        type: GET_TASKS,
        payload: is5days ? _.filter(res.data, task=>
            between(moment(task.dateTime).diff(moment(), 'days'), 0, 5)
            ) : res.data
    })
}

//get my tasks
export const getMyTasksAction = (id) => async dispatch => {
    const res = await axios.get(url.tasksByUserId + '/' + id)
    dispatch({
        type: GET_MY_TASKS,
        payload: res.data
    })
}

//get Task Item
export const getTaskItemAction = (id) => async dispatch => {
    const res = await axios.get(url.tasks + '/' + id)
    dispatch({
        type: GET_TASK_ITEM,
        payload: res.data
    })
}

//delete Task
export const deleteTaskAction = (id) => async dispatch => {
    axios.delete(url.tasks + '/' + id)
        .then(res => dispatch({
            type: DELETE_TASK,
            payload: id
        }))
        // .then(res => dispatch(getTasksAction()))
        .catch(err => console.log(err))
}

//add new Task
export const addTaskAction = (data) => async dispatch => {
    var resp = await axios.post(url.tasks, data)
    dispatch({type: ADD_TASK, payload: resp.data})
       
}

//edit Task
export const editTaskAction = (id, data) => async dispatch => {
    var res = await axios.put(url.tasks + '/' + id, data) 
            dispatch({
                type: EDIT_TASK,
                payload: res.data
            })
}

//delete list from task
export const deleteListFromItemAction = (id, data) => async dispatch => {
    axios.put(url.delListFromTask + '/' + id, data)
        .then(res=>{
            dispatch({
                type: DELETE_LIST_FROM_ITEM,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
    // console.log(url.delListFromTask + '/' + id)
    // console.log(data)
}

//clear task item
export const clearTaskItemAction = () => dispatch => {
    dispatch({
        type: CLEAR_TASK_ITEM
    })
}