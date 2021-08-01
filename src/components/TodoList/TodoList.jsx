import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { PreparedTodos } from '../../Types';

export const TodoList = ({ listOfTodods }) => (
  <ul className="table">
    {listOfTodods.map(todo => (
      <li key={todo.id}>
        <Todo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))
    }
  </ul>
);

TodoList.propTypes = {
  listOfTodods: PropTypes.arrayOf(PreparedTodos).isRequired,
};
