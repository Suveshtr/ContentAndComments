import * as ServerAPI from '../utils/ServerAPI'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'


export const requestCategories = () => ({
    type: REQUEST_CATEGORIES
})

export const receiveCategories = categories => ({
    type: RECEIVE_CATEGORIES,
    categories
})
//thunk async action
export const fetchCategories = () => dispatch => {
    //dispatch the requestCategories action so as to enable a flag isFetchCategoriesPending 
    dispatch(requestCategories())
    //call the server api for fetching the categoires and then dispatche receiveCategories to change the app state
    ServerAPI.getAllCategories()
        .then(categories => dispatch(receiveCategories(categories)))
    
}

export const requestPosts = () => ({
    type: REQUEST_POSTS,
})

export const receivePosts = (data) => ({
    type: RECEIVE_POSTS,
    posts: data,
    //receivedAt: Date.now()
})

export const fetchPosts = category => dispatch => {
    dispatch(requestPosts())
   ServerAPI.getPostsByCategory(category)
        .then(posts => dispatch(receivePosts(posts)))
}