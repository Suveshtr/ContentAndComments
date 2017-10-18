import { SET_POSTIDS } from '../actions/posts.types'

export const postIds = (state=[], action) => {
    switch (action.type) {
        
        case SET_POSTIDS:
            return [
                ...state,
                ...action.postIds
            ]
        default:
            return state
    }
}