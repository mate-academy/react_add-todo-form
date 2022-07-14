import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(({
      id, title, completed, user,
    }) => (
      <li key={id}>
        <TodoInfo
          title={title}
          completed={completed}
          user={user}
          id={id}
        />
      </li>
    ))}
  </ul>
);
