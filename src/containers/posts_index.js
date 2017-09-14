import React, { Component } from 'react';
import { connect } from 'react-redux';
// Link component is like a classic anchor tag
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import { map } from 'lodash';
import ListItem from '../components/list_item';

class PostsIndex extends Component {
  // React lifecicly method
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return map(this.props.postsData, postsData => {
      return (
        <ListItem post={postsData} key={postsData.id} />
      );
    });
  }

  render() {
    return (
      <div>
        <div className='text-xs-right'>
          <Link className='btn btn-primary' to='/posts/new'>
            Add a Post
          </Link>
        </div>
        <h3> POSTS </h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
};

function mapStateToProps({ postsData }) {
  return { postsData };
}

PostsIndex.propTypes = {
  postsData: React.PropTypes.object
};
// We can pass the action directly
// export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
