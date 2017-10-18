import { SET_COMMENT_SORT_BY } from '../actions/comments.types'

export const commentSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_COMMENT_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}