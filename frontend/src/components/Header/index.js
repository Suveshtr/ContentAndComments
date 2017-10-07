import React from 'react'
import { connect } from 'react-redux'
import Category from '../Category'

import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'


class Header extends React.Component {
  
  state ={
    selectedItem: 'Timestamp'
  }
  
  handleSortBy = (selectedItem) => {
    
    this.setState({
      selectedItem: selectedItem
    })
  }
  render() {

    const { categories } = this.props
    const { selectedItem } = this.state
    console.log("selectedItem render", selectedItem)
    return (

      <div className="categories">

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Text style={{color:'white'}}>
              Show:
            </Navbar.Text>
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

            <Nav pullRight style={{paddingRight: '10px'}}>
              <Navbar.Text style={{color:'white'}}>
                SortedBy:
              </Navbar.Text>
              <NavDropdown title={selectedItem} id="nav-dropdown" onSelect={this.handleSortBy}>
                <MenuItem eventKey="Timestamp">Timestamp</MenuItem>
                <MenuItem eventKey="Votes">Votes</MenuItem>          
              </NavDropdown>
              
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