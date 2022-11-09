import React from 'react';
import { FullTodo } from '../../types/FullTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: FullTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {
      todos.map((todo) => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))
    }
  </ul>
);
