import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { hidePostDelete, deletePostRequest } from '../../actions'

class DeletePost extends React.Component {

  modalDeleteHide = (event) => {
    this.props.dispatch(hidePostDelete(true))
  }

  modalDelete = event => {
    const { dispatch, id, match, history } = this.props
    dispatch(deletePostRequest(id))
    dispatch(hidePostDelete(true))
    history.push(`/${match.params.category}/posts`)
  }

  render() {
    const { hideDeletePost, author } = this.props
    return (
      <Modal show={!hideDeletePost}>
        <Modal.Header>
          <Modal.Title>
            <strong>{author}:</strong> &nbsp;
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

const mapStateToProps = (state, {match,history}) => {
  const { hideDeletePost } = state
  return {
    hideDeletePost,
    match,
    history
  }
}

export default withRouter(connect(mapStateToProps)(DeletePost))