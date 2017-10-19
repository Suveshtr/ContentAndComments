import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { hidePostDelete, deletePostRequest } from '../../actions/posts.actions'

class DeletePost extends React.Component {

  modalDeleteHide = (event) => {
    const { hidePostDelete } = this.props
    hidePostDelete(true)
  }

  modalDelete = event => {
    const { hideDeletePostModal, deletePostRequest, hidePostDelete, match, history } = this.props
    deletePostRequest(hideDeletePostModal.id)
    hidePostDelete(true)
    history.push(`/${match.params.category}/posts`)
  }

  render() {
    const { hideDeletePostModal } = this.props
    return (
      <Modal show={!hideDeletePostModal.hide}>
        <Modal.Header>
          <Modal.Title>
            <strong>{hideDeletePostModal.author}:</strong> &nbsp;
            Are you sure you want to delete this post ?
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

const mapStateToProps = ({hideDeletePostModal}) => {
  return {
    hideDeletePostModal, 
  }
}

export default withRouter(connect(mapStateToProps, { hidePostDelete, deletePostRequest } )(DeletePost))