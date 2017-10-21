import { INCREMENT_VOTE_COMMENT, DECREMENT_VOTE_COMMENT } from '../actions/comments.types'
import { INCREMENT_VOTE_POST, DECREMENT_VOTE_POST } from '../actions/posts.types'

export const UpdateVotingScore = (state, action) => {
    
    let score = Number(state.voteScore)
    
    switch (action.type) {
        
        case INCREMENT_VOTE_POST:
        case INCREMENT_VOTE_COMMENT:
            
            return {
                ...state,
                voteScore: score+1
            }
        case DECREMENT_VOTE_POST:
        case DECREMENT_VOTE_COMMENT:
            return {
                ...state,
                voteScore: score-1
            }
        default:
            return state
    }
}
