import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import { TodoType } from '../typedefs/todoType';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map((todo) => {
      const { id, user, title, completed } = todo;

      return (
        <Todo
          key={id}
          user={user}
          title={title}
          completed={completed}
        />
      );
    })
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};

export default TodoList;
