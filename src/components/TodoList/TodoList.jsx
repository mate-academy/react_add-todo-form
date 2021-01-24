import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos, users }) => (
  <div className="is-flex is-justify-content-center">
    <table className="table is-hoverable table is-narrow m-3">
      <thead>
        <tr>
          <th>Task</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            task={todo.title}
            status={todo.completed}
            name={users.find(user => user.id === todo.userId).name}
          />
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
