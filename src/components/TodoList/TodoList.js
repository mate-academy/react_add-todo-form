import React from 'react';

import { Todo } from '../Todo';
import { TodoListShape } from '../../shapes/TodoListShape';

export function TodoList({ todos }) {
  return (
    <div className="ui divided relaxed list">
      {todos.map(todo => (
        <Todo {...todo} key={todo.id} />
      ))}
    </div>
  );
}

TodoList.propTypes = TodoListShape;

TodoList.defaultProps = {
  todos: [],
};
