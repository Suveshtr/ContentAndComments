import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'
import CommentForm from './CommentForm'
import { addNewComment } from '../../actions'


class AddComment extends React.Component {

  onSubmit = comment => {    
    const { dispatch, history, category } = this.props
    dispatch(addNewComment(comment))
    history.push(`/${category}/posts/${comment.parentId}`)
  }

  render() {
    const { category, comment} = this.props
    return(
      <div>
        <h3>Add Comment</h3>
        <Link className="close-create-entity" to={`/${category}/posts/${comment.parentId}`} >Close</Link>
        <CommentForm comment={comment} onSubmit={this.onSubmit}/>
      </div>
      
    ) 
  }
}
const mapStateToProps = (state, {match, history}) => {
  return {
    history,
    category: match.params.category,
    comment : {
      id: uuid.v4(),
      parentId: match.params.postId,
      timestamp: moment().valueOf(),
      body: '',
      author:''      
    }
  }
}

export default withRouter(connect(mapStateToProps)(AddComment))