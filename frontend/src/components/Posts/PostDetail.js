import React from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import VoteScore from '../common//VoteScore'
import Post from './Post'
import DeletePost from './DeletePost'
import Comments from '../Comments/Comments'
import { getCommentsForPost, getPost } from '../../reducers/posts.reducer'
import NotFound from '../common/NotFound'

class PostDetail extends React.Component {

  render() {
    const { post, comments } = this.props

    if (!post)
      return <NotFound />

    return (
      <div>
        <DeletePost />
        
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
  
  return {
    post: getPost(state, match.params.id),
    comments: getCommentsForPost(state, match.params.id)
  }
}

export default withRouter(connect(mapStateToProps)(PostDetail))