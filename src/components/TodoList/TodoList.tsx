import classNames from 'classnames';
import React from 'react';
import { PreparedTodos } from '../../types/PreparedTodos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: PreparedTodos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <div className="container">
    {
      todos.map(todo => (
        <div
          key={todo.id}
          className={classNames(
            'card', {
              card__notDone: !todo.completed,
              card__done: todo.completed,
            },
          )}
        >
          <UserInfo user={todo.user} />
          <TodoInfo todos={todo} />
        </div>
      ))
    }
  </div>
);
