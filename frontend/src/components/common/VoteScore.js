import React from 'react'
import { connect } from 'react-redux'
import { incrementPostVote, 
         decrementPostVote,
        incrementCommentVote,
        decrementCommentVote } from '../../actions'
import * as ServerAPI from '../../utils/ServerAPI'

class VoteScore extends React.Component {
  updateVotingScore = (event, entityId, entity, option) => {
    //thanks connect
    const { dispatch } = this.props

    event.preventDefault()

    ServerAPI.updateVotingScore(entityId, entity, option)
      .then(result => {
        if(entity === "posts")
          option === 'upVote' ? dispatch(incrementPostVote(entityId)) : dispatch(decrementPostVote(entityId))
        else {
          option === 'upVote' ? dispatch(incrementCommentVote(entityId)) : dispatch(decrementCommentVote(entityId))
        }

      })
  }

  render() {
    const { entityId, voteScore, entity } = this.props

    return (
      <div >
        <a className="vote-up"
          onClick={event => this.updateVotingScore(event, entityId, entity, "upVote")}
        >up vote</a>
        <div className="vote-score" >{voteScore}</div>
        <a className="vote-down"
          onClick={event => this.updateVotingScore(event, entityId, entity, "downVote")}
        >down vote</a>
      </div>
    )
  }
}

export default connect()(VoteScore)