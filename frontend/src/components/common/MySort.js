import React from 'react'
import { connect } from 'react-redux'

import { setCommentSortBy } from '../../actions/comments.actions'
import { setPostSortBy } from '../../actions/posts.actions'

class MySort extends React.Component {
  state = {
    sortOption: 'timestamp'
  }


  handleSortBy = (selectedItem) => {
    const { dispatch, title } = this.props
    title === 'Posts' ? dispatch(setPostSortBy(selectedItem)) : dispatch(setCommentSortBy(selectedItem))
    this.setState({
      sortOption: selectedItem
    })
  }

  render() {
    return (
      <div className="sort-top">
        <div className="sort-changer">
          <select
            onChange={event => this.handleSortBy(event.target.value)}
            defaultValue={this.state.sortOption}
          >
            <option value="none" disabled>Sort {this.props.title}...</option>
            <option value="voteScore">Votes</option>
            <option value="timestamp">Date</option>
          </select>
        </div>
      </div>
    )
  }
}

export default connect()(MySort)