const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())


const getPosts = (criteria) => 
    fetch(`${api}/${criteria}/posts`, { headers })
    .then(res => res.json())

export const getPostDetail = (postId) => 
    fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())


export const getPostsByCategory = (category) => 
  category === 'all' ? getAllPosts() : getPosts(category)



export const getPostsByComments = (comment) => 
  getPosts(comment)


export const getAllComments = () =>
  fetch(`${api}/comments`, { headers })
    .then(res => res.json())
    
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
