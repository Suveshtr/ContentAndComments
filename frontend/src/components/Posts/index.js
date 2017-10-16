import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import sortBy from 'sort-by'
import PostsList from './PostsList'


class Posts extends React.Component {

  render() {    
    const { posts, comments, selectedCategory } = this.props
    return (
      <div className="posts">
        <PostsList posts={posts} comments={comments} selectedCategory={selectedCategory}
        />
      </div>
    )
  }
}


const getFilteredPost = (posts, postIds, selectedCategory) => {

  let filteredPostByCategory = postIds.reduce((result, id) => {
    if (((selectedCategory === 'all') || (posts[id].category === selectedCategory) ) &&
      !posts[id].deleted)
      result.push(posts[id])
    
    return result
  }, [])
  
  return filteredPostByCategory
}

const mapStateToProps = (state, { match }) => {
  
  const { posts, postIds, comments } = state
  const sortByOption = state.postSortBy
  const selectedCategory = match.params.category

  let filteredPostByCategory = getFilteredPost(posts, postIds, selectedCategory)

  return {
    posts: filteredPostByCategory.sort(sortBy(sortByOption)),
    postIds,
    comments,
    selectedCategory
  }
}

export default withRouter(connect(mapStateToProps, null, null, { pure: false })(Posts))