import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY, REQUEST_CATEGORIES,RECEIVE_CATEGORIES,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

// const selectedCategory = (state = 'all', action) => {
//   switch (action.type) {
//     case SELECT_CATEGORY:
//       return action.category
//     default:
//       return state
//   }
// }



const availableCategories = (state = {isCategoriesFetching:false, categories: []} , action) => {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return {
                ...state,
                isCategoriesFetching: true
            }
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                isCategoriesFetching: false,
                categories: action.categories
            }
        default:
            return state
    }
}


const allPosts = (state = { isPostFetching: false, posts: [] }, action) => {
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isPostFetching: true
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                isPostFetching: false,
                posts: action.posts
            }
        default:
            return state
    }
}


const rootReducer = combineReducers({
  //selectedCategory,
  availableCategories,
  allPosts
})

export default rootReducer

