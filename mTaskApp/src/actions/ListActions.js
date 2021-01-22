import axios from 'axios';
import * as url from '../constants/url/url'
import { GET_LIST, GET_MY_LIST, GET_LIST_ITEM, DELETE_LIST, ADD_LIST, EDIT_LIST, CLEAR_LIST_ITEM, DELETE_TASK_FROM_LIST } from './types';

//get all lists
export const getListAction = () => async dispatch => {
    const res = await axios.get(url.list)
    dispatch({
        type: GET_LIST,
        payload: res.data
    })
}

//get my lists
export const getMyListsAction = (id) => async dispatch => {
    const res = await axios.get(url.listByUserId + '/' + id)
    dispatch({
        type: GET_MY_LIST,
        payload: res.data
    })
}

//get List Item
export const getListItemAction = (id) => async dispatch => {
    const res = await axios.get(url.list + '/' + id)
    dispatch({
        type: GET_LIST_ITEM,
        payload: res.data
    })
}

//delete list
export const deleteListAction = (id) => async dispatch => {
    axios.delete(url.list + '/' + id)
        .then(res => dispatch({
            type: DELETE_LIST,
            payload: id
        }))
        // .then(res => dispatch(getTasksAction()))
        .catch(err => console.log(err))
}

//add new List
export const addListAction = (data) => async dispatch => {
    axios.post(url.list, data)
        .then(res => {
            dispatch({
                type: ADD_LIST,
                payload: res.data
            })
        })
        // .then(res=>dispatch(getTasksAction))
        .catch(err => console.log(err))
}

//edit list
export const editListAction = (id, data) => async dispatch => {
    axios.put(url.list + '/' + id, data)
        .then(res => {
            dispatch({
                type: EDIT_LIST,
                payload: res.data
            })
        })
        // .then(res => dispatch(getTasksAction))
        .catch(err => console.log(err))
}

//clear task item
export const clearListItemAction = () => dispatch => {
    dispatch({
        type: CLEAR_LIST_ITEM
    })
}

//remove task from list
export const deleteTaskFromListAction = (id,data) => async dispatch => {
    axios.put(url.delTaskFromList + '/' + id, data)
        .then(res=>{
            dispatch({
                type: DELETE_TASK_FROM_LIST,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}
