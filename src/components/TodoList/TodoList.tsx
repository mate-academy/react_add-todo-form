import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  return (
    <div className="card">
      {props.todos.map(todo => (
        <div key={todo.id}>
          {todo.title}
          {todo.user && <UserInfo users={todo.user} />}
        </div>
      ))}
    </div>
  );
};
