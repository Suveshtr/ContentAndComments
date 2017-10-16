import React from 'react'
import {Form, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

class PostForm extends React.Component {

  static propTypes = {
    post: PropTypes.shape( {
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
    this.setState( {
      [event.target.id]: event.target.value
    })    
  }

  handleSubmit = e => {    
    e.preventDefault()
    let submitPost = {...this.props.post, ...this.state} 
    this.props.onSubmit(submitPost)
  }

  render() {
    const { post } = this.props
    const disabled = (post.title.length && post.author.length && post.body.length)
    return (
      <div> 
        
        
        <Form horizontal className='create-entity-form' onSubmit={event => this.handleSubmit(event)}>        
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
            <Col sm={10}>
              <FormControl type="text" 
                  placeholder='Title' 
                  defaultValue={post.title}
                  onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="author">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col >
            <Col sm={10}>
              <FormControl type="text" 
                  placeholder='Author'
                  disabled={disabled}
                  defaultValue={post.author} 
                  onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="body">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={10}>
              <FormControl componentClass="textarea" 
                  placeholder='Description' 
                  defaultValue={post.body} 
                  onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          
          <FormGroup controlId="category">
            <Col componentClass={ControlLabel} sm={2}>
              Category
            </Col>
            <Col sm={10}>
              <FormControl componentClass="select" 
                          onChange={this.handleChange} 
                          defaultValue={post.category}
                          disabled={disabled}>                
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup controlId="submitBtn">
            <Col smOffset={2} sm={10}>
              <Button type="submit" >
                Submit
              </Button>            
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default PostForm