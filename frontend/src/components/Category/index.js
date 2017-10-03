import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { NavItem } from 'react-bootstrap'

class Category extends React.Component {
  render() {
    const { category, path } = this.props

    return (
      <NavItem>
        <Link to={`/${category}/posts`} >
          {path}
        </Link>
      </NavItem>
    )
  }
}

export default Category

