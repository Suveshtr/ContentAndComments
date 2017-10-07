import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import { normalizeNestedResponse,normalizeCategories, addCategory } from './actions'
import * as ServerAPI from './utils/ServerAPI'
import './App.css';

class App extends Component {

  state = {
    hasPostFetched: false,
    hasCategoryFetched: false
  }
  
  componentDidMount() {

    const {dispatch} = this.props
    
    ServerAPI.getPostAndComments()
      .then(posts => {
        this.setState({
           //posts: result,
           hasPostFetched: true
        })
        dispatch(normalizeNestedResponse(posts))
      })
      
    ServerAPI.getAllCategories()
      .then(categories => {
        this.setState({
          hasCategoryFetched: true      
        })

         dispatch(normalizeCategories(categories))
         dispatch(addCategory({name: 'all', path: 'all'}))
      })
    
  }

  render() {

    const { hasCategoryFetched } = this.state
    const { isPostFetching } = this.props
    console.log("isPostFetching", isPostFetching)
    return (
      
     <div className="container">
        {hasCategoryFetched && <div>
          <Header />
        </div>}
         {(isPostFetching === false) && <div>
          <Main hasPostFetched={isPostFetching === false}/>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {

    const { isPostFetching } = state.posts
    console.log("isPostFetching", isPostFetching)
    return {
        isPostFetching
    }
}

export default withRouter(connect(mapStateToProps)(App))