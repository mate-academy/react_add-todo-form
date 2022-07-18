import React from 'react';
import { PreparedTodos } from '../../types/PreparedTodos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: PreparedTodos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="container">
    {todos.map(todo => (
      <React.Fragment key={todo.id}>
        {todo.completed
          ? (
            <div className="card card__done">
              <UserInfo user={todo.user} />
              <TodoInfo todos={todo} />
            </div>
          )
          : (
            <div className="card card__not-done">
              <UserInfo user={todo.user} />
              <TodoInfo todos={todo} />
            </div>
          )}
      </React.Fragment>

    ))}
  </div>
);
