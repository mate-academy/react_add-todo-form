import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodosList = ({ todo }) => (
  <>
    <tbody>
      <Todo todo={todo} />
    </tbody>
  </>
);

TodosList.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};
export default TodosList;
