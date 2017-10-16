import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import VoteScore from '../common//VoteScore'
import Post from './Post'
import Comments from '../Comments/Comments'

class PostDetail extends React.Component {

  render() {
    const { post, comments } = this.props

    return (
      <div>
        <Table responsive>
          <tbody>
            <tr>
              <td className="vote-cell">
                <VoteScore entityId={post.id} voteScore={post.voteScore} entity="posts" />
              </td>
              <td>
                <Post post={post} showDetail={true}/>
              </td>
            </tr>
          </tbody>
        </Table>
        <div>
          <Comments comments={comments}/>
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state, { match }) => {
  const { posts, comments } = state
  const id  = match.params.id
 
  const filteredComments = posts[id].comments.map( commentId => comments[commentId])
  
  return {
    post: posts[id],
    comments: filteredComments.filter(comment => !comment.deleted )
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail))