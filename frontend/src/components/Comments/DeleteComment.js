import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { hideCommentDelete, deleteCommentRequest } from '../../actions/comments.actions'


class DeleteComment extends React.Component {

  modalDeleteHide = (event) => {
    this.props.dispatch(hideCommentDelete(true))
  }

  modalDelete = event => {
    const { dispatch, id, parentId, match, history } = this.props
    dispatch(deleteCommentRequest(id))
    dispatch(hideCommentDelete(true))
    history.push(`/${match.params.category}/posts/${parentId}`)
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

const mapStateToProps = (state, {match,history}) => {
  const { hideDeleteComment } = state
  return {
    hideDeleteComment,
    match,
    history
  }
}

export default withRouter(connect(mapStateToProps)(DeleteComment))