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

export const getPostDetail = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
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

const getCategory = (post, categories) => {
  return categories.filter(({ name }) => post.category === name)
}

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
// export const getAll = () => {

 

      
//             /* category: getCategory(post, categories)*/
//             // getAllCategories()
//             //   .then(categories => {
//             //       let result = []
//             //       console.log("post", post)
//             //       result.concat({
//             //       ...post,
//             //       "comments": comments.filter(comment => comment.parentId === post.id) || [],
//             //       category: getCategory(post, categories)
//             //     })
//             console.log("result", result)
//           })
//       })
//     })
// }
