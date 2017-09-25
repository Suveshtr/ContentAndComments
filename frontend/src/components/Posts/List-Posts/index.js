import React from 'react'

export const PostsList = ({posts}) => {
  
  <ol className="posts-list">

    {posts.map((post) =>
      <li key={post.id}>
        {post.title}
      </li>
    )}
  </ol>
}