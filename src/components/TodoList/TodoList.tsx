import React from 'react';
import style from './TodoList.module.css';
import { Todo } from '../../types/types';
import TodoInfo from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className={style.todoList}>
    {todos.map(todo => (
      <li className={style.todoElement}>
        <TodoInfo key={todo.id} todo={todo} />
      </li>
    ))}
  </ul>
);

export default TodoList;
