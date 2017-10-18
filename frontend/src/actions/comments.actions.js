import * as ServerAPI from '../utils/ServerAPI'
import * as CommentTypes from './comments.types'

export const setComments = comments => ({
    type: CommentTypes.SET_COMMENTS,
    comments
})

export const incrementCommentVote = commentId => ({
    type: CommentTypes.INCREMENT_VOTE_COMMENT,
    commentId
})

export const decrementCommentVote = commentId => ({
    type: CommentTypes.DECREMENT_VOTE_COMMENT,
    commentId
})

export const setCommentSortBy = sortBy => ({
    type: CommentTypes.SET_COMMENT_SORT_BY,
    sortBy
})


const addComment = comment => ({
    type: CommentTypes.ADD_COMMENT,
    comment
})

export const addNewComment = comment => dispatch => (
    
    ServerAPI.addComment(comment)
        .then(comment => {   
            dispatch(addComment(comment))                        
        })
)

const editComment = (comment) => ({
    type: CommentTypes.EDIT_COMMENT,
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
    type: CommentTypes.HIDE_COMMENT_DELTETE,
    option
})

export const deleteCommentRequest = id => dispatch => {
    ServerAPI.deleteComment(id)
        .then(res => {
            dispatch(deleteComment(id))
        })
}

const deleteComment = id => ({
    type: CommentTypes.DELETE_COMMENT,
    id
})