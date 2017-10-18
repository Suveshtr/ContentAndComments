import { RECEIVE_CATEGORIES,ADD_CATEGORY } from '../actions/categories.types'

export const categories = (state = { isCategoryFetching: true} , action) => {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES:
            return {
                ...state,
                isCategoryFetching: false,
                ...action.categories
            }
        case ADD_CATEGORY:
            return {                
                [action.category.name]: {...action.category},
                ...state,
            }
        default:
            return state
    }
}

export const categoryIds = (state=[], action) => {
    switch (action.type) {
        
        case RECEIVE_CATEGORIES:
            return [
                ...state,                                
                ...action.categoryIds
            ]
        case ADD_CATEGORY:
            return [
                action.category.name,
                ...state,                
            ]
        default:
            return state
    }
}
