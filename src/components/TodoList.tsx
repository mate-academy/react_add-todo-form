import { FC } from 'react';
import { Todo } from '../types/Todo';

import users from '../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <ul className="App__list todoList">
      {todos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="todoList__item"
          >
            <div className="todoList__name">
              {newUser?.name}
            </div>
            <div className="todoList__title">
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
