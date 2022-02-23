import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todos">
      {
        todos.map(todo => (
          <div key={todo.id} className="todo">
            <span>{`ID ${todo.id}`}</span>
            <p>{todo.title}</p>
            <p>{`UserID ${todo.userId}`}</p>
          </div>
        ))
      }
    </div>
  );
};

export default TodoList;
