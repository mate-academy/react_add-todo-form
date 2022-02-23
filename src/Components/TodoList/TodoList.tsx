import React from 'react';
import { PreparedTodo } from '../../Types/PreparedTodo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (

  <ul className="todo__list">
    {todos.map((todo) => (
      <li className="todo__item" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
