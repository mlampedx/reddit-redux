import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Subheader from 'material-ui/Subheader';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { selectedSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from './../actions';
import Posts from './Posts';
import Selector from './Selector';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }
  
  handleChange(nextSubreddit) {
    console.log('nextSubreddit', nextSubreddit)
    this.props.dispatch(selectedSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    console.log('rendering posts', posts.length, posts)

    return (
      <div>
        <AppBar
          title={`Reddit Headlines - ${selectedSubreddit}`}
          iconElementRight={
            <Selector value = {selectedSubreddit}
              onChange = {this.handleChange}
              options={[ 'reactjs', 'reduxjs', 'frontend', 'nodejs', 'backend']} 
            />
          }
          style={{ 
            backgroundColor: '#cee3f8',
          }}
          titleStyle={{
            color: 'gray',
          }}
        />
        <p>
          {lastUpdated &&
            <Subheader>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </Subheader>
          }
          {!isFetching &&
           <RefreshIndicator
             percentage={90}
             color="#cee3f8"
             size={40}
             onClick = {this.handleRefreshClick}
             left={10}
             top={0}
             status="ready"
             style={{
               display: 'inline-block',
               position: 'relative',
             }}
            />
          }
        </p>
        {isFetching && posts.length === 0 && 
          <RefreshIndicator
            loadingColor="#cee3f8"
            size={40}
            left={10}
            top={0}
            status="loading"
            style={{
              display: 'inline-block',
              position: 'relative',
            }}
    />
        }
        {!isFetching && posts.length === 0 && 
          <h2>Empty.</h2>
        }
        {posts.length > 0 && 
          <div style = {{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts = {posts} />  
          </div>
        }
      </div>
    )
  }
}

App.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  console.log('state', state)
  const { selectedSubreddit, postsBySubreddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  }

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  }
}

export default connect(mapStateToProps)(App);
