import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export function TodoList({ todos }) {
  return (
    <table className="todol-list__todos">
      <thead className="todol-list__thead">
        <tr>
          <th>id</th>
          <th>todo</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayof(PropTypes.shape({})).isRequired,
};
