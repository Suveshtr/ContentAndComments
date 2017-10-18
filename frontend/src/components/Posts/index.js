import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import sortBy from 'sort-by'
import PostsList from './PostsList'
import { getPostByCategory } from '../../reducers/posts.reducer'

class Posts extends React.Component {

  render() {    
    const { posts } = this.props
    return (
      <div className="posts">
        <PostsList posts={posts}
        />
      </div>
    )
  }
}


const mapStateToProps = (state, { match }) => {
  
  const { sortByOption } = state

  let filteredPostByCategory = getPostByCategory(state, match.params.category)

  return {
    posts: filteredPostByCategory.sort(sortBy(sortByOption)),
  }
}

export default withRouter(connect(mapStateToProps, null, null, { pure: false })(Posts))