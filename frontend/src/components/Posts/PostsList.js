import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import VoteScore from '../common/VoteScore'
import Post from './Post'
import MySort from '../common/MySort'

class PostsList extends React.Component {

  render() {
    const { posts, match } = this.props
    return (
      <div>
        
        <div className="add-entity">
          <Link to={`${match.url}/add-post`} >Add a Post</Link>
        </div>

        {posts.length>0 && <MySort title="Posts" />}
        
        <Table responsive>
          
          <tbody>

            {posts.map((post, index) => {

              return <tr key={index}>
                
                <td className="vote-cell">
                  <VoteScore entityId={post.id} voteScore={post.voteScore} entity="posts" />
                </td>
                <td>
                  <Post post={post} showDetail={false} />
                </td>
              </tr>
            })}

          </tbody>
        </Table>
      </div>


    )
  }
}

const mapStateTpProps = (state, {match}) => {
  return {
    match
  }
}

export default withRouter(connect(mapStateTpProps)(PostsList))