import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import moment from 'moment'
import sortBy from 'sort-by'
import VoteScore from '../common/VoteScore'
import MySort from '../common/MySort'
import DeleteComment from './DeleteComment'
import { hideCommentDelete } from '../../actions/comments.actions'

class Comments extends React.Component {

  state = {
    id: '',
    parentId: '',
    author: ''
  }

  handleDeleteComment = (event) => {
    const { hideCommentDelete } = this.props
    event.preventDefault()
    hideCommentDelete(false)
    this.setState({
      id: event.target.dataset.id,
      parentId: event.target.dataset.parentid,
      author: event.target.dataset.author
    })
  }
  render() {

    let { comments, commentSortBy, match } = this.props

    comments = comments.sort(sortBy(commentSortBy))
    
    return (
      <div >
        
        {comments.length>0 && <MySort title="Comments" />}
        
        <Table responsive>
          <tbody >

            {comments.map(comment => (
              <tr key={comment.id}>
                <td className="vote-cell">
                  <div className="comments-vote">
                    <VoteScore entityId={comment.id} voteScore={comment.voteScore} entity="comments" />
                  </div>
                </td>
                <td>
                  <p>{comment.body}</p>
                  <div className="summary"> 
                    <div>by {comment.author} on {moment(comment.timestamp).format("ll HH:mm:ss")}</div>
                    <Link to={`${match.url}/edit-comment/${comment.id}`}>Edit Comment</Link>
                    <span> | </span>
                    <a href="#" data-id={comment.id} data-author = {comment.author} data-parentid={comment.parentId}
                        onClick={this.handleDeleteComment}>Delete Comment</a>
                  </div>                
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
        <DeleteComment id={this.state.id} author={this.state.author} parentId={this.state.parentId} />
      </div>

    )
  }
}
const mapStateToProps = ({commentSortBy}) => {
  return {
    commentSortBy
  }
}

export default withRouter(connect(mapStateToProps, {hideCommentDelete} )(Comments))