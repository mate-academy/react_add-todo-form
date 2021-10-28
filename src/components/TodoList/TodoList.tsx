import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
        >
          {todo.user && <UserInfo user={todo.user} />}
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
