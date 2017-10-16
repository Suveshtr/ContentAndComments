import { combineReducers } from 'redux'
import {
  
  RECEIVE_CATEGORIES,ADD_CATEGORY,
  REQUEST_POSTS, SET_POSTS,SET_COMMENTS, SET_POSTIDS, INCREMENT_VOTE_POST,
  DECREMENT_VOTE_POST, INCREMENT_VOTE_COMMENT, DECREMENT_VOTE_COMMENT,SET_POST_SORT_BY,
  SET_COMMENT_SORT_BY, ADD_POST, EDIT_POST, HIDE_POST_DELTETE, DELETE_POST,
  ADD_COMMENT, EDIT_COMMENT, HIDE_COMMENT_DELTETE, DELETE_COMMENT
} from '../actions'


const updateVotingScore = (state, action) => {
    
    let score = Number(state.voteScore)
    
    switch (action.type) {
        
        case INCREMENT_VOTE_POST:
        case INCREMENT_VOTE_COMMENT:
            
            return {
                ...state,
                voteScore: score+1
            }
        case DECREMENT_VOTE_POST:
        case DECREMENT_VOTE_COMMENT:
            return {
                ...state,
                voteScore: score-1
            }
        default:
            return state
    }
}

const posts = (state = {isPostFetching: true}, action) => {

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

const postIds = (state=[], action) => {
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

const comments = (state = {isCommentFetching: true}, action) => {
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

const categories = (state = { isCategoryFetching: true} , action) => {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                isCategoryFetching: false,
                ...action.categories
            }
        case ADD_CATEGORY:
            return {                
                [action.category.name]: {...action.category},
                ...state,
            }
        default:
            return state
    }
}

const categoryIds = (state=[], action) => {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES:
            return [
                ...state,                                
                ...action.categoryIds
            ]
        case ADD_CATEGORY:
            return [
                action.category.name,
                ...state,                
            ]
        default:
            return state
    }
}

const postSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_POST_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}

const commentSortBy = (state = "timestamp", action) => {
    switch(action.type) {
        case SET_COMMENT_SORT_BY:
            return action.sortBy
        default:
            return state

    }
}


const hideDeletePost = (state=true, action) => {
    switch(action.type) {
        case HIDE_POST_DELTETE:        
            return action.option
        default:
            return state
    }
}

const hideDeleteComment = (state=true, action) => {
    switch(action.type) {
        case HIDE_COMMENT_DELTETE:        
            return action.option
        default:
            return state
    }
}

const rootReducer = combineReducers({
  posts,
  postIds,
  comments,
  categories,
  categoryIds,
  postSortBy,
  commentSortBy,
  hideDeletePost,
  hideDeleteComment
})

export default rootReducer