import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
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
            name={todo.user.name}
          />
        ))}
      </tbody>
    </table>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
