import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { incrementVote, decrementVote } from '../../../actions'
import * as ServerAPI from '../../../utils/ServerAPI'
class PostsList extends React.Component {
  

  updateVotingScore = (event, postId, option) => {
      //thanks connect
      const { dispatch } = this.props
      
      event.preventDefault()

      ServerAPI.updateVotingScore(postId, option)
        .then(result => {
          option === 'upVote' ? dispatch( incrementVote(postId)) : dispatch( decrementVote(postId))          
        })
  }
  
  
  render() {
    const { posts, postIds, comments } = this.props

    return (

      <Table responsive>

        <tbody>
          {postIds.map((postId) => {
            const post = posts[postId]
            return <tr key={postId}>
              <td className="vote-cell" >            
                <a className="vote-up"  
                  onClick={ event => this.updateVotingScore(event, postId, "upVote")}
                >up vote</a>
                <div className="vote-score" >{post.voteScore}</div>
                <a className="vote-down"
                  onClick={ event => this.updateVotingScore(event, postId, "downVote")}
                >down vote</a>
              </td>
              <td>{post.title}</td>

            </tr>
          })}
          
        </tbody>
      </Table>
    )
  }
}

export default connect()(PostsList)