import * as ServerAPI from '../utils/ServerAPI'
import * as PostTypes from './posts.types'

export const setPosts = (posts) => ({
    type: PostTypes.SET_POSTS,
    posts
})

export const setPostIds = (postIds) => ({
    type: PostTypes.SET_POSTIDS,
    postIds
})

export const setPostSortBy = sortBy => ({
    type: PostTypes.SET_POST_SORT_BY,
    sortBy
})

export const requestPosts = () => ({
    type: PostTypes.REQUEST_POSTS,
})

export const receivePosts = (data) => ({
    type: PostTypes.RECEIVE_POSTS,
    posts: data
    //receivedAt: Date.now()
})

const addPost = post => ({
    type: PostTypes.ADD_POST,
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
    type: PostTypes.EDIT_POST,
    post
})

export const EditPostRequest = post => dispatch => {
    ServerAPI.updatePost(post)
        .then(post => {
            dispatch(editPost(post))
        })
}

export const deletePostRequest = id => dispatch => {
    ServerAPI.deletePost(id)
        .then(res => {
            dispatch(deletePost(id))
        })
}

//option: true or false
export const hidePostDelete = (option) => ({
    type: PostTypes.HIDE_POST_DELTETE,
    option
})

const deletePost = id => ({
    type: PostTypes.DELETE_POST,
    id
})

export const incrementPostVote = postId => ({
    type: PostTypes.INCREMENT_VOTE_POST,
    postId
})

export const decrementPostVote = postId => ({
    type: PostTypes.DECREMENT_VOTE_POST,
    postId
})