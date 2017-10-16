import React  from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from '../Posts'
import PostDetail from '../Posts/PostDetail'
import EditPost from '../Posts/EditPost'
import AddPost from '../Posts/AddPost'
import AddComment from '../Comments/AddComment'
import EditComment from '../Comments/EditComment'

class Main extends React.Component {

    
    render() {
        
        return (
            <div>
                <Switch>                    
                    <Route  exact path='/:category/posts' component={Posts} />  
                    <Route  path='/:category/posts/:postId/add-comment' component={AddComment} />
                    <Route  path='/:category/posts/:postId/edit-comment/:commentId' component={EditComment} />
                    <Route  path='/:category/posts/:id/edit-post' component={EditPost} />
                    <Route  path='/:category/posts/add-post' component={AddPost} />
                    <Route  path='/:category/posts/:id' component={PostDetail} />
                </Switch>
            </div>
            
        )

    }
}

export default Main