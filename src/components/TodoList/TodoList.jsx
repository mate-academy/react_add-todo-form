import React from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css'
import PropTypes from 'prop-types';
import { TodoType } from '../../types'

export const TodoList = ({ todos }) => {

  return (
    <ol className="list">
      {todos.map(todo => (
        <li key={todo.id} className="list__item">
          <Todo
            title={todo.title}
            user={todo.user}
            status={todo.completed}
          />
        </li>
    ))}
    </ol>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType)
}

TodoList.defaulProps = {
  todos: [],
}
