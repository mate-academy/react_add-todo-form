import React from 'react';

import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: PrepearedTodo[]
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <div>
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
        />
      ))}
    </div>
  );
};
