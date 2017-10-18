import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import Main from './components/Main'
import rootHandler from './components/Main/rootHandler'
import { normalizeNestedResponse } from './actions/common'
import { normalizeCategories } from './actions/categories.actions'
import * as ServerAPI from './utils/ServerAPI'
import './App.css';

class App extends Component {

  componentDidMount() {

    const { dispatch } = this.props

    ServerAPI.getAllCategories()
      .then(categories => {
        
        categories = [{ name: 'all', path: 'all' }, ...categories]
        this.setState({
          categories: categories
        })
        dispatch(normalizeCategories(categories))
        
      }).then(res => {        
        ServerAPI.getPostAndComments()
          .then(posts => {            
            dispatch(normalizeNestedResponse(posts))
          })
      })

  }

  render() {

    
    const { isFetching } = this.props

    return (

      <div className="container">

        <Header />
        
        <Route exact path="/" component={rootHandler} />
        
        {(isFetching === false) && <div>
          <Main hasPostFetched={isFetching === false} />
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log("match", match)
  const { posts, postIds, comments, categories} = state
  const isFetching  = (posts.isPostFetching || !postIds.length || comments.isCommentFetching || categories.isCategoryFetching)
  
  return {
    isFetching
  }
}

export default withRouter(connect(mapStateToProps)(App))