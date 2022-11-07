import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map((todo: Todo) => (
      <div key={todo.id} className="todo">
        <TodoInfo todo={todo} />
      </div>
    ))}
  </ul>
);
