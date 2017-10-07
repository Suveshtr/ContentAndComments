import { combineReducers } from 'redux'
import {
  REQUEST_ALL, RECEIVE_ALL,
  SELECT_CATEGORY, REQUEST_CATEGORIES,RECEIVE_CATEGORIES,ADD_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS, SET_POSTS,SET_COMMENTS, SET_POSTIDS, INCREMENT_VOTE,
  DECREMENT_VOTE
} from '../actions'


const updateVotingScore = (state, action) => {
    
    let score = Number(state.voteScore)
    
    switch (action.type) {
        
        case INCREMENT_VOTE:
            console.log("updateVotingScore_state", state)
            return {
                ...state,
                voteScore: score+1
            }
        case DECREMENT_VOTE:
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
        case INCREMENT_VOTE:
        case DECREMENT_VOTE:
            return {
                ...state,
                [action.postId]: updateVotingScore({...state[action.postId]}, action)
            }
        default:
            return state
    }
}

const postIds = (state={}, action) => {
    switch (action.type) {
        
        case SET_POSTIDS:
            return {
                ...state,
                [action.category]: action.postIds
            }
        default:
            return state
    }
}

const comments = (state = {}, action) => {
    switch (action.type) {
        
        case SET_COMMENTS:
            return {
                ...state,                
                ...action.comments                
            }
        default:
            return state
    }
}



const categories = (state = [] , action) => {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES:
            return {
                ...state,                
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

const rootReducer = combineReducers({
  posts,
  postIds,
  comments,
  categories,
  categoryIds
})

export default rootReducer