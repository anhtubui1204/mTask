import {SET_ITEMS_TO_SELECTED, REMOVE_ITEMS_FROM_SELECTED, CLEAR_SELECTED} from '../actions/types'

const initialState ={
    selectedItems: []
}

export default function tagMembers(state = initialState, action){
    var {selectedItems} = state
    switch(action.type){
        case SET_ITEMS_TO_SELECTED:
            // handle checking items exists in the array selected items
            var num = 0
            for(let i=0; i< selectedItems.length; i++){
                var unit = selectedItems[i]
                if(unit._id === action.items._id){
                    num +=1
                }
            }
            if(num===0){
                selectedItems.push(action.items)
            }
            return{...state}
        case REMOVE_ITEMS_FROM_SELECTED:
            for(let i=0; i< state.selectedItems.length; i++){
                var unit = state.selectedItems[i]
                if(unit._id === action.items._id){
                    state.selectedItems.splice(i, 1)
                }
            }
            return {...state}
        case CLEAR_SELECTED:
            return {selectedItems:[]}
        default: 
            return state
    }
}