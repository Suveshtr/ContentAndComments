
import {  normalize } from 'normalizr'
import { postSchema } from '../../schema/schemas'
import { setPosts, setPostIds } from '../posts.actions'
import { setComments } from '../comments.actions'

export const normalizeNestedResponse = (response) => dispatch => {
    
    const normalizedResponse = normalize(response, postSchema )    
    dispatch(setPosts( normalizedResponse.entities.posts ))
    dispatch(setPostIds( normalizedResponse.result ) )
    dispatch(setComments( normalizedResponse.entities.comments) )
}