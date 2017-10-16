import React from 'react'
import { connect } from 'react-redux'
import momemt from 'moment'
import { Link, withRouter } from 'react-router-dom'
import DeletePost from './DeletePost'
import { hidePostDelete } from '../../actions'

class Post extends React.Component {

  handleDeletePost = event => {
    event.preventDefault()
    this.props.dispatch(hidePostDelete(false))
  }

  getNumberOfComments = post => {
    const {comments} = this.props
    return post.comments.reduce((result, commentId)=> {
      if(comments[commentId].deleted === false) {
        result = result + 1
      }
      return result
    }, 0)
  }

  render() {

    const { post, showDetail, match } = this.props
    const date = momemt(post.timestamp).format("ll HH:mm:ss")
    const numberOfComments = this.getNumberOfComments(post)
    console.log("number of comments", numberOfComments)
    return (
      <div>
        {showDetail && <div>
          <p>{post.title}</p>
          <p>{post.body}</p>

          <p className="summary"> by {post.author} on {date}
            <span> | &nbsp;
                {numberOfComments !== 0 ?
                <span>{numberOfComments} comments</span>
                : <span>no comments</span>
              } <span> | <Link to={`${match.url}/add-comment`}>Add Comment</Link> </span>
            </span>
          </p>
          <div className="summary">
            <Link to={`${match.url}/edit-post`}>Edit Post</Link>
            <span> | </span>
            <a href="#" onClick={this.handleDeletePost}>Delete Post</a>
          </div>
          <DeletePost id={post.id} author={post.author}/>
        </div>}

        {!showDetail &&
          <div >
            <p><Link to={`${match.url}/${post.id}`}>{post.title}</Link></p>
            <p className="summary"> by {post.author} on {date}
              <span> | &nbsp;
                {numberOfComments !== 0 ?
                  <Link to={`${match.url}/${post.id}`}>{numberOfComments} comments</Link>
                  : "no comments"
                } 
              </span>
            </p>
          </div>}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    comments: state.comments
  }
}
export default withRouter(connect(mapStateToProps)(Post))