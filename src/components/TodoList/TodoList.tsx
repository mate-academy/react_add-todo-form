import React from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <table className="todo-table">
      <thead className="todo-table__head">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Task</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr
            className={
              classNames('todo-table__body-row--undone',
                { 'todo-table__body-row--done': todo.completed })
            }
            key={todo.id}
          >
            <TodoInfo todo={todo} />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
