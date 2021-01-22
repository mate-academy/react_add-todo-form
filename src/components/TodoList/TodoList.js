import React from 'react';
import { Todo } from '../Todo/Todo';
import { todosValidation } from '../../validations/todosValidation';

export const TodoList = ({ todos }) => (
  <section>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} />
    ))}
  </section>
);

TodoList.propTypes = {
  todos: todosValidation.isRequired,
};
