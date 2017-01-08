import * as types from './ActionTypes';

export function selectSubreddit(subreddit) {
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
