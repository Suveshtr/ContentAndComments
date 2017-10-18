import {
    REQUEST_POSTS, SET_POSTS, SET_POSTIDS, INCREMENT_VOTE_POST, SET_POST_SORT_BY,
    DECREMENT_VOTE_POST, ADD_POST, EDIT_POST, HIDE_POST_DELTETE, DELETE_POST
} from '../actions/posts.types'

import { ADD_COMMENT } from '../actions/comments.types'

import { updateVotingScore } from './UpdateVotingScore.reducer'

export const posts = (state = {isPostFetching: true}, action) => {

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
            const {parentId, id } = action.comment
            return {
                ...state,                
                [parentId]: {...state[parentId], 
                             comments:[...state[parentId].comments, id]}                           
            }
        case EDIT_POST:
            return {
                ...state,
                [action.post.id]: {...state[action.post.id], ...action.post}
            }
        case DELETE_POST:
            return {
                ...state,
                [action.id]: {...state[action.id], deleted: true}
            }
        case INCREMENT_VOTE_POST:
        case DECREMENT_VOTE_POST:
            return {
                ...state,
                [action.postId]: updateVotingScore({...state[action.postId]}, action)
            }
        default:
            return state
    }
}

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

export const postSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_POST_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}

export const hideDeletePost = (state=true, action) => {
    switch(action.type) {
        case HIDE_POST_DELTETE:        
            return action.option
        default:
            return state
    }
}
