import { combineReducers } from 'redux'
import {
  REQUEST_ALL, RECEIVE_ALL,
  SELECT_CATEGORY, REQUEST_CATEGORIES,RECEIVE_CATEGORIES,ADD_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS, SET_POSTS,SET_COMMENTS, SET_POSTIDS
} from '../actions'

// const selectedCategory = (state = 'all', action) => {
//   switch (action.type) {
//     case SELECT_CATEGORY:
//       return action.category
//     default:
//       return state
//   }
// }

const posts = (state = {}, action) => {

    switch (action.type) {
        
        case SET_POSTS:
            return {
                ...state,                
                ...action.posts                
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


// const allPosts = (state = { isPostFetching: false, posts: [] }, action) => {
//     switch (action.type) {
//         case REQUEST_POSTS:
//             return {
//                 ...state,
//                 isPostFetching: true
//             }
//         case RECEIVE_POSTS:
//             return {
//                 ...state,
//                 isPostFetching: false,
//                 posts: action.posts
//             }
//         default:
//             return state
//     }
// }


const rootReducer = combineReducers({
  posts,
  postIds,
  comments,
  categories,
  categoryIds
})

export default rootReducer