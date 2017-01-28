import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { selectedSubreddit, postsBySubreddit } from './../reducers';

const rootReducer = combineReducers({selectedSubreddit, postsBySubreddit});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
