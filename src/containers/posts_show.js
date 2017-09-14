import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    // params list all the wildcards inside url
    // match is one object from react router
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div> Loading... </div>;
    }

    return (
      <div>
        <div className='text-xs-left'>
          <Link to='/'>
             Back to Index
          </Link>
        </div>
        <Link
          className='btn btn-danger pull-xs-right'
          to='/delete/'
          onClick={this.onDeleteClick}
        >
          Delete Post
        </Link>
        <h3> Title: { post.title } </h3>
        <h6> Categories: { post.categories } </h6>
        <p> { post.content } </p>
      </div>
    );
  }
}

// ownProps is the properties repectively to this exate page (component).
function mapStateToProps({ postsData }, ownProps) {
  return { post: postsData[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deletePost, fetchPost })(PostsShow);
