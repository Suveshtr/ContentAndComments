import * as ServerAPI from '../utils/ServerAPI'
import {  normalize } from 'normalizr'

import { postSchema, categorySchema } from '../schema/schemas'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'


export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SET_POSTS  = 'SET_POSTS'
export const SET_POSTIDS = 'SET_POSTIDS'
export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const INCREMENT_VOTE_POST = 'INCREMENT_VOTE'
export const DECREMENT_VOTE_POST = 'DECREMENT_VOTE'
export const INCREMENT_VOTE_COMMENT = 'INCREMENT_VOTE_COMMENT'
export const DECREMENT_VOTE_COMMENT = 'DECREMENT_VOTE_COMMENT'

export const SET_POST_SORT_BY = 'SET_POST_SORT_BY'
export const SET_COMMENT_SORT_BY = 'SET_COMMENT_SORT_BY'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const HIDE_POST_DELTETE = 'HIDE_POST_DELTETE'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const HIDE_COMMENT_DELTETE = 'HIDE_COMMENT_DELTETE'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const normalizeNestedResponse = (response) => dispatch => {
    
    const normalizedResponse = normalize(response, postSchema )    
    dispatch(setPosts( normalizedResponse.entities.posts ))
    dispatch(setPostIds( normalizedResponse.result ) )
    dispatch(setComments( normalizedResponse.entities.comments) )
}



export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
})

export const setPostIds = (postIds) => ({
    type: SET_POSTIDS,
    postIds
})

export const setComments = comments => ({
    type: SET_COMMENTS,
    comments
})

export const setCategories = categories => ({
    type: SET_CATEGORIES,
    categories
})

export const addCategory = category => ({
    type: ADD_CATEGORY,
    category
})


export const receiveCategories = (categories, categoryIds) => ({
    type: RECEIVE_CATEGORIES,
    categories,
    categoryIds
})
//thunk async action
export const normalizeCategories = (categories) => dispatch => {
    
    const normalizedCategories = normalize(categories, categorySchema )
    
    dispatch(receiveCategories(normalizedCategories.entities.categories, normalizedCategories.result))

}

export const incrementPostVote = postId => ({
    type: INCREMENT_VOTE_POST,
    postId
})

export const decrementPostVote = postId => ({
    type: DECREMENT_VOTE_POST,
    postId
})

export const incrementCommentVote = commentId => ({
    type: INCREMENT_VOTE_COMMENT,
    commentId
})

export const decrementCommentVote = commentId => ({
    type: DECREMENT_VOTE_COMMENT,
    commentId
})


export const setPostSortBy = sortBy => ({
    type: SET_POST_SORT_BY,
    sortBy
})

export const setCommentSortBy = sortBy => ({
    type: SET_COMMENT_SORT_BY,
    sortBy
})

export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = (data) => ({
    type: RECEIVE_POSTS,
    posts: data
    //receivedAt: Date.now()
})

const addPost = post => ({
    type: ADD_POST,
    post
})

export const addNewPost = post => dispatch => (
    
    ServerAPI.addPost(post)
        .then(post => {   
            dispatch(addPost(post))
            dispatch(setPostIds([post.id]))            
        })
)

const editPost = (post) => ({
    type: EDIT_POST,
    post
})

export const EditPostRequest = post => dispatch => {
    ServerAPI.updatePost(post)
        .then(post => {
            dispatch(editPost(post))
        })
}

//option: true or false
export const hidePostDelete = (option) => ({
    type: HIDE_POST_DELTETE,
    option
})

export const deletePostRequest = id => dispatch => {
    ServerAPI.deletePost(id)
        .then(res => {
            dispatch(deletePost(id))
        })
}

const deletePost = id => ({
    type: DELETE_POST,
    id
})

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})

export const addNewComment = comment => dispatch => (
    
    ServerAPI.addComment(comment)
        .then(comment => {   
            dispatch(addComment(comment))                        
        })
)

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

export const EditCommentRequest = comment => dispatch => {
    ServerAPI.updateComment(comment)
        .then(comment => {
            dispatch(editComment(comment))
        })
}

//option: true or false
export const hideCommentDelete = (option) => ({
    type: HIDE_COMMENT_DELTETE,
    option
})

export const deleteCommentRequest = id => dispatch => {
    ServerAPI.deleteComment(id)
        .then(res => {
            dispatch(deleteComment(id))
        })
}

const deleteComment = id => ({
    type: DELETE_COMMENT,
    id
})