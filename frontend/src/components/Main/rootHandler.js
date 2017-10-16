import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
class rootHandler extends React.Component {

  render () {
    return (
      <Redirect from="/" to="/all/posts" />
    )
  }
}

export default withRouter(connect()(rootHandler))