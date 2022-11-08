import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => {
      return (
        <div key={todo.id} className="TodoList">
          <TodoInfo todo={todo} />
        </div>
      );
    })}
  </ul>
);
