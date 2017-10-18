import {
    REQUEST_POSTS,
    SET_POSTS,
    INCREMENT_VOTE_POST,
    DECREMENT_VOTE_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_POST
} from '../actions/posts.types'

import { ADD_COMMENT } from '../actions/comments.types'
import { updateVotingScore } from './updateVotingScore.reducer'

export const posts = (state = { isPostFetching: true }, action) => {

    switch (action.type) {

        case REQUEST_POSTS:
            return {
                ...state,
                isPostFetching: true
            }

        case SET_POSTS:
            return {
                ...state,
                ...action.posts,
                isPostFetching: false
            }
        case ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post
            }
        case ADD_COMMENT:
            const { parentId, id } = action.comment
            return {
                ...state,
                [parentId]: {
                    ...state[parentId],
                    comments: [...state[parentId].comments, id]
                }
            }
        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: { ...state[action.post.id], ...action.post }
            }
        case DELETE_POST:
            return {
                ...state,
                [action.id]: { ...state[action.id], deleted: true }
            }
        case INCREMENT_VOTE_POST:
        case DECREMENT_VOTE_POST:
            return {
                ...state,
                [action.postId]: updateVotingScore({ ...state[action.postId] }, action)
            }
        default:
            return state
    }
}