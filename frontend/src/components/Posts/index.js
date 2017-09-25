import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../../actions'
import { PostsList } from './List-Posts'

class Posts extends React.Component {

    componentDidMount() {
        const { dispatch, selectedCategory } = this.props
        dispatch(fetchPosts(selectedCategory))
    }

    componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCategory !== this.props.selectedCategory) {
      const { dispatch, selectedCategory } = nextProps
      dispatch(fetchPosts(selectedCategory))
    }
  }

    render() {
        const { posts, isPostFetching } = this.props
        return(
            <div className="posts">
              <PostsList posts={posts}/>
            </div>
        )
    }
}

const mapStateToProps = (state, {match}) => {
    const { posts, isPostFetching } = state.allPosts
    return {
        posts,
        isPostFetching,
        selectedCategory : match.params.category || 'all'
    }
}

export default withRouter(connect(mapStateToProps)(Posts))
