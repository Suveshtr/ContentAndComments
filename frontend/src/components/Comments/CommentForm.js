import React from 'react'
import {Form, Col, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

class CommentForm extends React.Component {

  static propTypes = {
    comment: PropTypes.shape( {
        id: PropTypes.string.isRequired,        
        parentId: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,        
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,           
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
    let submitComment = {...this.props.comment, ...this.state} 
    this.props.onSubmit(submitComment)
  }

  render() {
    const { comment } = this.props
    const disabled = (comment.author.length && comment.body.length)
    return (
      <div>                
        <Form horizontal className='create-entity-form' onSubmit={event => this.handleSubmit(event)}>        
          
          <FormGroup controlId="author">
            <Col componentClass={ControlLabel} sm={2}>
              Author
            </Col >
            <Col sm={10}>
              <FormControl type="text" 
                  placeholder='Author'
                  disabled={disabled}
                  defaultValue={comment.author} 
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
                  defaultValue={comment.body} 
                  onChange={this.handleChange}
              />
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

export default CommentForm