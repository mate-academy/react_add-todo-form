import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './todoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li className="todoList__task" key={todo.id}>
        <h2>
          Task #
          {todo.id}
        </h2>
        <h2 className="todoList__title">{todo.title}</h2>
        <TodoInfo todoInfo={todo} />
        <UserInfo user={todo?.user} />
      </li>
    ))}
  </ul>
);
