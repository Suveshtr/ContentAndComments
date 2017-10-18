import {  normalize } from 'normalizr'
import { categorySchema } from '../schema/schemas'
import * as CategoryTypes from './categories.types'

export const setCategories = categories => ({
    type: CategoryTypes.SET_CATEGORIES,
    categories
})

export const addCategory = category => ({
    type: CategoryTypes.ADD_CATEGORY,
    category
})

export const receiveCategories = (categories, categoryIds) => ({
    type: CategoryTypes.RECEIVE_CATEGORIES,
    categories,
    categoryIds
})
//thunk async action
export const normalizeCategories = (categories) => dispatch => {
    
    const normalizedCategories = normalize(categories, categorySchema )
    
    dispatch(receiveCategories(normalizedCategories.entities.categories, normalizedCategories.result))

}
