// this is very useful library when we want to store the minimal possible state for something
// Reselect selector
// Takes a list of posts and posts Ids, and picks out
// the selected Posts
// https://github.com/reactjs/reselect

import { createSelector } from 'reselect';
import { contains, filter } from 'lodash';
// Create select functions to pick off the pieces of state we care about
// for this calculation

const postSelector = state => state.postsData;
const selectedPostsSelector = state => state.selectedPostIds;

const getPosts = (postsData, selectedPostsIds) => {
  const selectedPosts = filter(
    postsData,
    post => contains(selectedPostsIds, post.id)
  );

  return selectedPosts;
};

export default createSelector(
  postSelector, // pick off a piece of state
  selectedPostsSelector, // pick off a piece of state
  getPosts // last argument is the function that has our selected logic
);
