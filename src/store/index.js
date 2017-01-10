import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts } from './../actions';
import rootReducer from './../reducers';

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() => {
  console.log(store.getState());
});
