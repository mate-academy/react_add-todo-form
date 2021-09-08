import React from 'react';
import { TodoInfo } from './TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <table className="table">
    <tr className="table__head">
      <th>Name</th>
      <th>Email</th>
      <th>Task</th>
      <th>Status</th>
    </tr>
    {todos.map(todo => (
      <tr
        className={todo.completed ? 'table__item--done' : 'table__item--undone'}
        key={todo.id}
      >
        <TodoInfo todo={todo} />
      </tr>
    ))}
  </table>
);
