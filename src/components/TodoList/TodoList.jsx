import React from 'react';
import { Todo } from '../Todo';
import { TodoListShape } from '../Shapes/TodoListShape';

export const TodoList = ({ todos }) => (
  <>
    {todos.map(todo => (
      <tr key={todo.id}>
        <Todo {...todo} />
      </tr>
    ))}
  </>
);

TodoList.propTypes = TodoListShape;

TodoList.defaultProps = {
  todos: [],
};
