import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'
import CommentForm from './CommentForm'
import { addNewComment } from '../../actions/comments.actions'

class AddComment extends React.Component {

  onSubmit = comment => {    
    const { history, match, addNewComment } = this.props
    addNewComment(comment)
    history.push(`/${match.params.category}/posts/${comment.parentId}`)
  }

  render() {
    const { match } = this.props
    const comment = {
      id: uuid.v4(),
      parentId: match.params.postId,
      timestamp: moment().valueOf(),
      body: '',
      author:''      
    }
    return(
      <div>
        <h3>Add Comment</h3>
        <Link className="close-create-entity" to={`/${match.params.category}/posts/${comment.parentId}`} >Close</Link>
        <CommentForm comment={comment} onSubmit={this.onSubmit}/>
      </div>
      
    ) 
  }
}

export default withRouter(connect(null, {addNewComment})(AddComment))