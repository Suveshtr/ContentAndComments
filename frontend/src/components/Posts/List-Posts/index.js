import React from 'react'

class PostsList extends React.Component {
  render() {
    const { posts, postIds } = this.props
    
    return (
       <ol className="posts-list">
        
        {postIds.map((postId) => {
          
          const post = posts[postId]
          
          return <li key={postId}>
            {post.title}
          </li>
        })}
      </ol>
    )
  }
}

export default PostsList