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
              {Object.keys(categories).map(key => {
                const category = categories[key]
                return <Category
                  key={category.name}
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

  const categories = { ...state.categories }

  return {
    categories
  }
}

export default connect(mapStateToProps)(Header)