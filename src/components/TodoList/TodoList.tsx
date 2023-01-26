import React from 'react';
import { TodosWithUsers } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodosWithUsers[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map((todo) => (
      <li key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
