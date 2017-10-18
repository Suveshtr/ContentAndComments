import { combineReducers } from 'redux'
import { posts } from './posts.reducer'
import { postIds } from './postIds.reducer'
import { postSortBy } from './postSortBy.reducer'
import { hideDeletePost } from './hideDeletePost.reducer'

import { comments } from './comments.reducer'
import { categories, categoryIds } from './categories.reducer'
import { commentSortBy } from './commentSortBy.reducer'
import { hideDeleteComment } from './hideDeleteComment.reducer'

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