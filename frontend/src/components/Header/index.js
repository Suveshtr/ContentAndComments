import React from 'react'
import { connect } from 'react-redux'
import Category from '../Category'

import { Navbar, Nav } from 'react-bootstrap'


class Header extends React.Component {
  render() {

    const { categories } = this.props

    return (

      <div className="categories">

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Show:
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {Object.keys(categories).map((key) => {
                const category = categories[key]
                return <Category
                  key={key}            
                  category={category.name}
                  path={category.path}                  
                />
                
              })}

            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const categories = state.categories

  return {
    categories
  }
}
//required to pass pure:false since the rect-router-bootstrap would not set the active links correctly in the NavItem
export default connect(mapStateToProps, null, null, { pure: false})(Header)