import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="App__list">
    {todos.map(todo => (
      <li key={todo.id}>
        <div className="task">
          <TodoInfo task={todo} />

          {todo.user && <UserInfo {...todo.user} />}
        </div>
      </li>
    ))}
  </ul>
);
