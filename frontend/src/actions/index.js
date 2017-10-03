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



export const normalizeNestedResponse = (response, category='all') => dispatch => {
    
    const normalizedResponse = normalize(response, postSchema )
    console.log("normalizedPost", normalizedResponse)
    dispatch(setPosts( normalizedResponse.entities.posts ))
    dispatch(setPostIdsByCategory( normalizedResponse.result, category ) )
    dispatch(setComments( normalizedResponse.entities.comments) )
    //dispatch(normalizedResponse.)
}



export const setPosts = (posts) => ({
    type: SET_POSTS,
    posts
})

export const setPostIdsByCategory = (postIds, category) => ({
    type: SET_POSTIDS,
    postIds,
    category
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

export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = (data) => ({
    type: RECEIVE_POSTS,
    posts: data
    //receivedAt: Date.now()
})

export const fetchPosts = category => dispatch => {
   dispatch(requestPosts())
   ServerAPI.getPostAndComments(category)
        .then(posts => dispatch(normalizeNestedResponse(posts, category)))
   
}