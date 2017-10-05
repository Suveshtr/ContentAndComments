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
          //categories: categories,
          hasCategoryFetched: true
         
        })

         dispatch(normalizeCategories(categories))
         dispatch(addCategory({name: 'all', path: 'all'}))
      })
    
  }

  
  render() {

    const { hasCategoryFetched, hasPostFetched } = this.state
      
    return (
      
     <div className="container">
        {hasCategoryFetched && <div>
          <Header />
        </div>}
         {hasPostFetched  && <div>
          <Main hasPostFetched={hasPostFetched}/>
        </div>}
      </div>
    )
  }
}


const mapStateToProps = (state) => {

  return {
    
  }
}

export default withRouter(connect(mapStateToProps)(App))