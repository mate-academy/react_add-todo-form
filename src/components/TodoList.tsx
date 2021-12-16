import React from 'react';
import classNames from 'classnames';
import { TodoInfo } from './TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <table className="table table-hover table-bordered text-center">
      <thead>
        <tr>
          <th className="table-dark">Name</th>
          <th className="table-dark">Email</th>
          <th className="table-dark">Phone</th>
          <th className="table-dark">Task</th>
          <th className="table-dark">Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr
            className={
              classNames({
                'bg-success': todo.completed,
                'bg-danger': !todo.completed,
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
