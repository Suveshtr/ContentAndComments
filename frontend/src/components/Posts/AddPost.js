import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import uuid from 'uuid'
import moment from 'moment'
import PostForm from './PostForm'
import { addNewPost } from '../../actions/posts.actions'


class AddPost extends React.Component {

  onSubmit = post => {    
    const { history, addNewPost } = this.props
    addNewPost(post)
    history.push(`/${post.category}/posts`)
  }

  render() {
    const { match } = this.props
    const post = {
      id: uuid.v4(),
      timestamp: moment().valueOf(),
      title:'',
      body: '',
      author:'',
      category: match.params.category === 'all' ? '' : match.params.category
    }
    return (
      <div>
        <h3>Add Post</h3>
        <Link className="close-create-entity" to={`/${match.params.category}/posts`} >Close</Link>
        <PostForm post={post} onSubmit={this.onSubmit}/>
      </div>      
    )
  }
}


export default withRouter(connect(null, { addNewPost } )(AddPost))