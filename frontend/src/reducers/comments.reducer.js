import {
  INCREMENT_VOTE_COMMENT, DECREMENT_VOTE_COMMENT,SET_COMMENTS,
  ADD_COMMENT, EDIT_COMMENT, 
  DELETE_COMMENT
} from '../actions/comments.types'

import { updateVotingScore } from './updateVotingScore.reducer'

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

export const getComment = (state, commentId) => {
    return state.comments[commentId]
}

export const getComments = state => {
    return state.comments.filter(comment => !comment.deleted)
}