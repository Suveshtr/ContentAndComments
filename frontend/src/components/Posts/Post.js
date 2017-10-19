import React from 'react'
import { connect } from 'react-redux'
import momemt from 'moment'
import { Link, withRouter } from 'react-router-dom'
import { Button, Glyphicon } from 'react-bootstrap'
import { hidePostDelete } from '../../actions//posts.actions'


class Post extends React.Component {
 
  handleDeletePost = event => {
    const { hidePostDelete } = this.props
    event.preventDefault()
    hidePostDelete(false, event.target.dataset.id, event.target.dataset.author)
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
            <a href="#" data-id={post.id} bsSize="xsmall" data-author={post.author} 
                  onClick={this.handleDeletePost}>Delete Post</a>
          </div>
          
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
            <div >
              <Link to={`${match.url}/${post.id}/edit-post`}>
                <Button bsSize="xsmall" style={{
                  marginRight:'10px'
                }}>
                    Edit Post <Glyphicon glyph="edit" />
                </Button>
              </Link>
              <Button data-id={post.id} bsSize="xsmall" data-author={post.author}
                  onClick={this.handleDeletePost}>
                  Delete Post <Glyphicon glyph="remove-circle" />
              </Button>
              
            </div>
          </div>}
      </div>
    )
  }
}
const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}
export default withRouter(connect(mapStateToProps, { hidePostDelete })(Post))