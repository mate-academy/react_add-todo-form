import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Status from './Status';

const Todo = ({ item }) => (
  <>
    <Title item={item} />
    <Status item={item} />
  </>
);

Todo.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Todo;
