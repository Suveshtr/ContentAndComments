import { combineReducers } from 'redux'
import { posts, postIds, postSortBy, hideDeletePost } from './posts.reducer'
import { comments, commentSortBy, hideDeleteComment } from './comments.reducer'
import { categories, categoryIds } from './categories.reducer'

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