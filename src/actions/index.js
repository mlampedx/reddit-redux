import fetch from 'isomorphic-fetch';
import { dispatch, getState } from './../store';
import * as types from './ActionTypes';

export function selectedSubreddit(subreddit) {
  return {
    type: types.SELECT_SUBREDDIT,
    subreddit,
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: types.INVALIDATE_SUBREDDIT,
    subreddit,
  }
}

export function requestPosts(subreddit) {
  return {
    type: types.REQUEST_POSTS,
    subreddit,
  }
}

export function receivePosts(subreddit, json) {
  return {
    type: types.RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  }
}

export function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(res => res.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else { return posts.didInvalidate; }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    else { return Promise.resolve(); }
  }
}
