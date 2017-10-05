import React from 'react'
import { NavItem } from 'react-bootstrap'
import { IndexLinkContainer  } from 'react-router-bootstrap'

class Category extends React.Component {
  render() {
    const { category, path } = this.props

    return (

        <IndexLinkContainer  to={`/${category}/posts`} >
          <NavItem >
            {path}
          </NavItem>
        </IndexLinkContainer >
      
    )
  }
}

export default Category

