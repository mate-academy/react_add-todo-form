import React from 'react';
import { Todo } from '../../Types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[]
}

export const TodosList: React.FC<Props> = ({ todos }) => {
  return (
    <table className="table is-bordered is-hoverable container">
      <thead>
        <tr>
          <th className="has-text-centered">
            Task id
          </th>
          <th className="has-text-centered">
            Task title
          </th>
          <th className="has-text-centered">
            Owner
          </th>
          <th className="has-text-centered">
            Email
          </th>
          <th className="has-text-centered">
            Is completed
          </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.id} className="">
            <TodoInfo todo={todo} />
          </tr>
        ))}
      </tbody>

    </table>
  );
};
