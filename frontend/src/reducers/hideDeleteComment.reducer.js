import { HIDE_COMMENT_DELTETE } from '../actions/comments.types'

export const hideDeleteComment = (state=true, action) => {
    switch(action.type) {
        case HIDE_COMMENT_DELTETE:        
            return action.option
        default:
            return state
    }
}
