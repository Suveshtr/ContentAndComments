import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts, setPostIdsByCategory } from '../../actions'
import PostsList from './List-Posts'

class Posts extends React.Component {

    //When the url changes, the selecteCategory will change because of match.params.category will get updated by url change
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.selectedCategory !== this.props.selectedCategory) {
            const { dispatch, posts, postIds, selectedCategory } = nextProps
            console.log("PostsComponentWillUpdate called")
            if(!nextProps.postIds[selectedCategory]) {
                let filteredPostIds = postIds['all'].filter(id => posts[id].category === selectedCategory)
                console.log("PostsComponentWillUpdate dispatch setPostIdsByCategory", filteredPostIds)
                dispatch(setPostIdsByCategory(filteredPostIds, selectedCategory))
            }

        }
    }

    render() {
        const { posts, postIds, selectedCategory } = this.props
        
        return (
            <div className="posts">
                {(postIds[selectedCategory]) && <PostsList posts={posts} postIds={postIds[selectedCategory]} />}
            </div>
        )
    }
}


const mapStateToProps = (state, { match }) => {

    const { posts, postIds } = state

    console.log("POST_mapStateToProps_state", state )
    const selectedCategory = match.params.category || 'all'
    console.log("selected category", selectedCategory) 
    
    return {
        posts,
        postIds,
        selectedCategory: selectedCategory
    }
}

export default withRouter(connect(mapStateToProps)(Posts))