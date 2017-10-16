import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PostForm from './PostForm'
import { EditPostRequest } from '../../actions'
class EditPost extends React.Component {
  
  onSubmit = (post) => {
    const { dispatch, history, match } = this.props
    dispatch(EditPostRequest(post))
    history.push(`/${match.params.category}/posts/${post.id}`)
  }

  render() {
    const { post } = this.props
    return(
      <div>        
        <h3>Edit Post</h3>
        <Link className="close-create-entity" to={`/${post.category}/posts/${post.id}`} >Close</Link>
        <PostForm post={post} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state, {match, history}) => {
  
  return {
    post: state.posts[match.params.id],
    history
  }
}
export default withRouter(connect(mapStateToProps)(EditPost))