import { SET_POST_SORT_BY } from '../actions/posts.types'

export const postSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_POST_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}