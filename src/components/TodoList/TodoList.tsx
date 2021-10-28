import React from 'react';
import './TodoList.css';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className="list__item"
        >
          {todo.user && <UserInfo user={todo.user} />}
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
