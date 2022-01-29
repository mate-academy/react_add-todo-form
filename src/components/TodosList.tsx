import React from 'react';
import { UserInfo } from './UserInfo';

type Props = {
  todos: TodoWithUser[]
};

export const TodosList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <ul>
      {todos.map((todo) => (
        <li
          className="box"
          key={todo.id}
        >
          <p className="has-text-weight-medium is-size-4 has-text-primary">
            {todo.title}
          </p>

          <UserInfo user={todo.user} />
          {todo.completed
            ? <p className="has-text-primary is-uppercase">Completed</p>
            : <p className="has-text-danger is-uppercase">Not completed</p>}
        </li>
      ))}
    </ul>
  );
};
