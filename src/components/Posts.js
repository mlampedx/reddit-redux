import React, { PropTypes } from 'react';
import {List, ListItem} from 'material-ui/List';

export default function Posts({ posts }) {
  return (
    <List
      children={posts.map((post, i) => <a href={post.url}><ListItem key={i} primaryText={post.title} /></a>)}
    />
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};
