import React from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css'
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => {
  return (
    <ol className="list">
      {todos.map(todo => (
        <li key={todo.id} className="list__item">
          <Todo
            title={todo.title}
          />
        </li>
    ))}
    </ol>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  )
}

TodoList.defaulProps = {
  todos: [],
}
