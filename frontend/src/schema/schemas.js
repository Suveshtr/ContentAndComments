import { schema } from 'normalizr';

const posts = new schema.Entity('posts')
const commentSchema = new schema.Entity('comments')
const category = new schema.Entity('categories', undefined, { idAttribute: value => value.name } )
posts.define({
  comments: [commentSchema]
})

const postSchema = new schema.Array(
  posts
)

const categorySchema = new schema.Array(
  category
)

export { postSchema, commentSchema, categorySchema }