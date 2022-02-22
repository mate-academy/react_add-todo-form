import React from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map((todo: Todo) => (
      <li key={todo.id} className="todo-card">
        <TodoInfo todoItem={todo} />
      </li>
    ))}
  </ul>
);
