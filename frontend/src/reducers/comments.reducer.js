import {
  INCREMENT_VOTE_COMMENT, DECREMENT_VOTE_COMMENT,SET_COMMENTS,
  SET_COMMENT_SORT_BY, ADD_COMMENT, EDIT_COMMENT, HIDE_COMMENT_DELTETE, 
  DELETE_COMMENT
} from '../actions/comments.types'

import { updateVotingScore } from './UpdateVotingScore.reducer'

export const comments = (state = {isCommentFetching: true}, action) => {
    switch (action.type) {
        
        case SET_COMMENTS:
            return {
                ...state,
                isCommentFetching: false,              
                ...action.comments                
            }
        case ADD_COMMENT:        
            return {
                ...state,                
                [action.comment.id]: action.comment                              
            }
        case EDIT_COMMENT:
            return {
                ...state,
                [action.comment.id]: {...state[action.comment.id], ...action.comment}
            }
        case DELETE_COMMENT:
            return {
                ...state,
                [action.id]: {...state[action.id], deleted: true}
            }
        case INCREMENT_VOTE_COMMENT:
        case DECREMENT_VOTE_COMMENT:
            return {
                ...state,
                [action.commentId]: updateVotingScore({...state[action.commentId]}, action)
            }
        default:
            return state
    }
}

export const commentSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_COMMENT_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}

export const hideDeleteComment = (state=true, action) => {
    switch(action.type) {
        case HIDE_COMMENT_DELTETE:        
            return action.option
        default:
            return state
    }
}
