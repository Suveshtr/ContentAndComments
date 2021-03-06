import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { hideCommentDelete, deleteCommentRequest } from '../../actions/comments.actions'

class DeleteComment extends React.Component {

  modalDeleteHide = (event) => {
    const { hideCommentDelete } = this.props
    hideCommentDelete(true)
  }

  modalDelete = event => {
    const { hideCommentDelete, deleteCommentRequest, id } = this.props
    deleteCommentRequest(id)
    hideCommentDelete(true)    
  }

  render() {
    const { hideDeleteComment, author } = this.props
    return (
      <Modal show={!hideDeleteComment}>
        <Modal.Header>
          <Modal.Title>
            <strong>{author}:</strong> &nbsp;
            Are you sure you want to delete this comment ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={this.modalDeleteHide}>No</Button>
          <Button onClick={this.modalDelete} bsStyle="primary">Yes</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = ({ hideDeleteComment }) => {
  
  return {
    hideDeleteComment    
  }
}

export default connect(mapStateToProps, { hideCommentDelete, deleteCommentRequest })(DeleteComment)