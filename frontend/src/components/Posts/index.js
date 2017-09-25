import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts } from '../../actions'
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

        console.log("PostProps", this.props)
        return(
            <div className="posts">
              <ol className="posts-list">
                
                  { posts.map((post) => 
                        <li key={post.id}>
                            {post.title}
                        </li>
                   )}
              </ol>
            </div>
        )
    }
}

const mapStateToProps = (state, {match}) => {
    const { posts, isPostFetching } = state.allPosts
    
    console.log("posts:", state.allPosts)
    console.log("SelectedCategoryPath", match.params )
    return {
        posts,
        isPostFetching,
        selectedCategory : match.params.category || 'all'
    }
}

export default withRouter(connect(mapStateToProps)(Posts))
