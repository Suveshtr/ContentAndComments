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
import { getPostIds } from './postIds.reducer'
import { getComment } from './comments.reducer'

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


export const getPostByCategory = (state, selectedCategory) => {

  return getPostIds(state).reduce((result, id) => {
    if (((selectedCategory === 'all') || (state.posts[id].category === selectedCategory) ) &&
      !state.posts[id].deleted)
      result.push(state.posts[id])
    
    return result
  }, [])

}

export const getCommentsForPost = (state, id) => {
    
    if (!getPost(state,id))
        return
    const comments = getPost(state,id).comments.map( commentId => (
        getComment(state, commentId)

    ))

    return comments.filter(comment => comment.deleted === false)
}

export const getPost = (state, id) => {
    return state.posts[id] && state.posts[id].deleted === false ? state.posts[id] : null
}