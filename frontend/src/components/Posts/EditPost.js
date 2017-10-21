import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import PostForm from './PostForm'
import { EditPostRequest } from '../../actions//posts.actions'
import NotFound from '../common/NotFound'
import { getPost } from '../../reducers/posts.reducer'

class EditPost extends React.Component {
  
  onSubmit = (post) => {
    const { EditPostRequest, history, match } = this.props
    EditPostRequest(post)
    history.push(`/${match.params.category}/posts/${post.id}`)
  }

  render() {
    const { post } = this.props
    if (!post)
      return <NotFound />
    return(
      <div>        
        <h3>Edit Post</h3>
        <Link className="close-create-entity" to={`/${post.category}/posts/${post.id}`} >Close</Link>
        <PostForm post={post} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  
  return {
    post: getPost(state,match.params.id)
  }
}
export default withRouter(connect(mapStateToProps, { EditPostRequest })(EditPost))