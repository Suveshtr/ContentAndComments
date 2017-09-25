import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Category extends React.Component {
    render() {
        const { category, path } = this.props

        return (
            <div className="category">
                <NavLink activeClassName="activeLink" to={`/${category}/posts`} >
                    {path}
                </NavLink>
            </div>
        )
    }
}



export default Category

