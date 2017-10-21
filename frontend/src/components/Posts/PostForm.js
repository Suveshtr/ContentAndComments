import React from 'react'
import PropTypes from 'prop-types'

class PostForm extends React.Component {

  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }
    ).isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {}

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let submitPost = { ...this.props.post, ...this.state }
    this.props.onSubmit(submitPost)
  }

  render() {
    const { post } = this.props
    const disabled = (post.title.length && post.author.length && post.body.length)
    return (
      <div className='create-entity-form'>
        <form className="form-horizontal" onSubmit={event => this.handleSubmit(event)}>
          <div className="create-entity-details" >
            <lable className="control-label col-sm-2" htmlFor="title">Title</lable>

            <div className=" col-sm-10">
              <input type="text" id="title"
                placeholder='Title'
                required
                autoFocus
                defaultValue={post.title}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="create-entity-details">
            <lable className="control-label col-sm-2" htmlFor="author">
              Author
            </lable >
            <div className="col-sm-10">
              <input type="text" id="author"
                placeholder='Author'
                required
                disabled={disabled}
                defaultValue={post.author}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="create-entity-details">
            <lable className="control-label col-sm-2" htmlFor="body">
              Description
            </lable>
            <div className="col-sm-10">
              <input type="textarea" id="body"
                placeholder='Description'
                required
                defaultValue={post.body}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="create-entity-details">
            <lable className="control-label col-sm-2" htmlFor="category">
              Category
            </lable>
            <div className="col-sm-10">

              <input list="categories" id="category"
                onChange={this.handleChange}
                required
                defaultValue={post.category}                
                disabled={disabled} />
              <datalist id="categories">                
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </datalist>
            </div>
          </div>

          <div className="create-entity-details">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default PostForm