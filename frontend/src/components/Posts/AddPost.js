import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'
import PostForm from './PostForm'
import { addNewPost } from '../../actions/posts.actions'


class AddPost extends React.Component {

  onSubmit = post => {    
    const { dispatch, history } = this.props
    dispatch(addNewPost(post))
    history.push(`/${post.category}/posts`)
  }

  render() {
    const { post } = this.props
    return (
      <div>
        <h3>Add Post</h3>
        <Link className="close-create-entity" to={`/${post.category}/posts`} >Close</Link>
        <PostForm post={post} onSubmit={this.onSubmit}/>
      </div>      
    )
  }
}

const mapStateToProps = (state, {match, history}) => {
  return {
    history,
    post : {
      id: uuid.v4(),
      timestamp: moment().valueOf(),
      title:'',
      body: '',
      author:'',
      category: match.params.category
    }
  }
}

export default withRouter(connect(mapStateToProps)(AddPost))