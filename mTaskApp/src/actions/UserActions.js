import { GET_ALL_USERS, SEARCH_USERS } from "./types"
import axios from 'axios';

//Get All Users
export const getUsersAction = () => async dispatch => {
    const res = await axios.get('https://bigquery-project-medium.df.r.appspot.com/user')
    dispatch({
        type: GET_ALL_USERS,
        payload: res.data
    })
}

//Search user Action
export const searchUserAction = (term) => async dispatch => {
    const res = await axios.post('https://bigquery-project-medium.df.r.appspot.com/search-members', {term})
    dispatch({
        type: SEARCH_USERS,
        payload: res.data
    })
}