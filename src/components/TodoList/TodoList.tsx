import React from 'react';
import TodoInfo from '../TodoInfo/TodoInfo';
import { Todo } from '../types/Todo';
import './TodoList.scss';

export type Props = {
  todos: Todo[],
};
const TodoList:React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="todo-list__item" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);

export default TodoList;
