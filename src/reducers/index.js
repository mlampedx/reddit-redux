import * as types from './../actions/ActionTypes';

export function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case types.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

const initPostState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}

function posts(state = initPostState, action) {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case types.INVALIDATE_SUBREDDIT:
    case types.REQUEST_POSTS:
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}
