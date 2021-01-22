import { GET_USER, GET_ALL_USERS, SEARCH_USERS } from "../actions/types"

const initialState = {
    users: [],
    searchUsers:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return { ...state, users: action.payload }
        case SEARCH_USERS:
            return {searchUsers: action.payload }
        default:
            return state
    }
}

export default reducer