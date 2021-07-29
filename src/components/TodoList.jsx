import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
// console.log(this.props)
export const TodoList = ({ todos }) => (
  <>
    <thead className="thead">
      <tr>
        <th>
          Task
        </th>
        <th>
          Status
        </th>
        <th>
          User
        </th>
      </tr>
    </thead>
    <tbody className="tbody">
      {todos.map(task => (
        <tr
          className="tr"
          key={task.id}
        >
          <Todo {...task} />
        </tr>
      ))}
    </tbody>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
