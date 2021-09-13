import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { UserInfo } from '../UserInfo';

type Props = {
  preparedTodos: TodoItem[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { preparedTodos } = props;

  return (
    <ul className="todoList list-group">
      {preparedTodos.map(todo => (
        <li key={todo.id} className="list-group-item">
          {todo.user && (
            <p className="userInfo">
              <UserInfo user={todo.user} />
            </p>
          )}
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
