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


const getPostsByCriteria = (criteria) =>
  fetch(`${api}/${criteria}/posts`, { headers })
    .then(res => res.json())




export const getPosts = (category='all') =>
  category === 'all' ? getAllPosts() : getPostsByCriteria(category)



export const getPostsByComments = (comment) =>
  getPostsByCriteria(comment)


export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)


const createNestedResposes = (posts, comments) => {
    
    
    return posts.reduce((result, post) => {
      return result.concat({
        ...post,
        "comments": comments.filter(comment => comment.parentId === post.id) || [],
        //category: this.getCategory(post, categories)
      })
    }, [])
  }


export const getPostAndComments = (category='all') => {
  
  let response = {
    posts: [],
    comments: [],
    nestedPosts: []
  }

  return getPosts(category)
      .then(posts => {  
          response.posts = posts
          let postPromises = posts.map(post => {
            return getComments(post.id)
              .then(comments => {
                
                  response.comments.push(...comments)
                  return comments
              })
          })
          
          return Promise.all(postPromises)
            .then(result => {                
                response.nestedPosts = createNestedResposes(response.posts, response.comments)               
                return response.nestedPosts
            })
      })

}
export const updateVotingScore = (entityId, entity, option) =>
  fetch(`${api}/${entity}/${entityId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    
export const addPost = (post) => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: post.id, 
                           timestamp: post.timestamp, 
                           title:post.title, 
                           body: post.body, 
                           author: post.author, 
                           category: post.category })
  }).then(res => res.json())
    .then(post => {return {...post, comments:[]}})

export const updatePost = (post) => 
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title:post.title, body: post.body })
  }).then(res => res.json())

export const deletePost = id => 
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const addComment = (comment) => 
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: comment.id, 
                           timestamp: comment.timestamp,                            
                           body: comment.body, 
                           author: comment.author, 
                           parentId: comment.parentId })
  }).then(res => res.json())
    .then( comment => comment)

export const updateComment = (comment) => 
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title:comment.timestamp, body: comment.body })
  }).then(res => res.json())

export const deleteComment = id => 
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
