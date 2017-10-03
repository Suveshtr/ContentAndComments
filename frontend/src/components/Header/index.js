import React from 'react'
import { connect } from 'react-redux'
import Category from '../Category'
//import { fetchCategories } from '../../actions'


class Header extends React.Component {

    
       
    render() {

        const { categories } = this.props
        console.log("categories", categories)
        return (
            <div>
            <div className="categories">
                
                    <div className="categories-list">
                        Show:
                        {Object.keys(categories).map(key => {
                            const category  = categories[key]
                            return <Category
                                key={category.name}
                                category={category.name}
                                path={category.path}                                
                            />
                        })}
                    </div>
                
            </div>
            
            </div>
           
        )
    }
}

const mapStateToProps = (state) => {

    const categories = {...state.categories}

    return {
       categories    
    }
}

export default connect(mapStateToProps)(Header)