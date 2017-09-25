import React from 'react'
import { connect } from 'react-redux'
import Category from '../Category'
import { fetchCategories } from '../../actions'


class Header extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategories())
    }

    
    render() {

        //console.log("Header :", this.props)

        const { allCategories, isCategoriesFetching, selectedCategory } = this.props
       
        return (
            <div>
            <div className="categories">
                {(isCategoriesFetching === false) && (
                    <div className="categories-list">
                        Show:
                        {allCategories.map(category => {
                            return <Category
                                key={category.name}
                                category={category.name}
                                path={category.path}                                
                            />
                        })}
                    </div>
                )}
            </div>
            
            </div>
           
        )
    }
}

const mapStateToProps = (state /*, { match }*/) => {
    const { categories, isCategoriesFetching } = state.availableCategories
    let allCategories = [{ name:'all', path: 'all' }, ...categories]
    
    console.log("HederState", state)
    return {
        allCategories,
        isCategoriesFetching        
    }
}

export default connect(mapStateToProps)(Header)