import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import todos from '../api/todos';

const completedChange = (event, id, completed) => {
  todos.find((element, index) => {
    if (element.id === id) {
      todos[index].completed = event.target.checked;

      return true;
    }

    return false;
  });
};

export const TodoList = ({ props }) => (
  <ul>
    {props.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        completedChange={completedChange}
      />
    ))}
  </ul>
);

// TodoList.propTypes = {
//   props: PropTypes.arrayOf(PropTypes.shape({
//     userId: PropTypes.number.isRequired,
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//   })).isRequired,
// };
