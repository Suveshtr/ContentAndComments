import { HIDE_POST_DELTETE } from '../actions/posts.types'

export const hideDeletePost = (state=true, action) => {
    switch(action.type) {
        case HIDE_POST_DELTETE:        
            return action.option
        default:
            return state
    }
}
