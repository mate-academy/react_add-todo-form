import React from 'react';
import './TodoList.scss';
import { Todo } from '../../Types/todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[],
}
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-main">
      {todos.map((todo) => (
        <li className="todo-list" key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
