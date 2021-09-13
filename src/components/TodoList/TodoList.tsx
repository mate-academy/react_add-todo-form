import React from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <table className="table table-hover table-bordered text-center">
      <thead>
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
              classNames({
                'table-success': todo.completed,
                'table-danger': !todo.completed,
              })
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
