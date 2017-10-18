import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import CommentForm from './CommentForm'
import { EditCommentRequest } from '../../actions/comments.actions'
import { getComment } from '../../reducers/comments.reducer'
class EditComment extends React.Component {
  
  onSubmit = (comment) => {
    const { history, match } = this.props
    EditCommentRequest(comment)
    history.push(`/${match.params.category}/posts/${match.params.postId}`)
  }

  render() {
    const { comment, match } = this.props
    return(
      <div>        
        <h3>Edit Comment</h3>
        <Link className="close-create-entity" to={`/${match.params.category}/posts/${match.params.postId}`} >Close</Link>
        <CommentForm comment={comment} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  
  return {
    comment: getComment(state, match.params.commentId)
  }
}
export default withRouter(connect(mapStateToProps, { EditCommentRequest })(EditComment))