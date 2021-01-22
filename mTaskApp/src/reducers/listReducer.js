import { GET_LIST, GET_MY_LIST, GET_LIST_ITEM, DELETE_LIST, ADD_LIST, EDIT_LIST, CLEAR_LIST_ITEM, DELETE_TASK_FROM_LIST } from "../actions/types"

const initialState = {
    lists: [],
    listItem: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_LIST:
            return {...state, lists: action.payload}
        case GET_MY_LIST:
            return {...state, lists: action.payload}
        case GET_LIST_ITEM:
            return {...state, listItem: action.payload}
        case DELETE_LIST:
            return {...state}
        case ADD_LIST:
            return {...state}
        case EDIT_LIST:
            return {...state}
        case DELETE_TASK_FROM_LIST:
            return {...state}
        case CLEAR_LIST_ITEM:
            return {...state, listItem:{}}
        default:
            return state
    }
}


export default reducer