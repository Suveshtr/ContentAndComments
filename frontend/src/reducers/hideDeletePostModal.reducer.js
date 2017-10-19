import { HIDE_POST_DELTETE } from '../actions/posts.types'

export const hideDeletePostModal = (state={hide:true, id:'', author:''}, action) => {
    switch(action.type) {
        case HIDE_POST_DELTETE:        
            return {
                ...state,
                hide: action.option,
                id: action.id,
                author: action.author
            } 
        default:
            return state
    }
}
