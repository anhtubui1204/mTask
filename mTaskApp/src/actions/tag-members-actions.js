import {SET_ITEMS_TO_SELECTED, REMOVE_ITEMS_FROM_SELECTED, CLEAR_SELECTED} from './types'

export const sendToSelectedAction = (items)=> dispatch =>{
    dispatch({
        type: SET_ITEMS_TO_SELECTED,
        items

    })
}

export const removeFromSelectedAction = (items)=> dispatch=>{
    dispatch({
        type: REMOVE_ITEMS_FROM_SELECTED,
        items
    })
}

export const clearSelectedAction = () => dispatch => {
    dispatch({
        type: CLEAR_SELECTED
    })
}