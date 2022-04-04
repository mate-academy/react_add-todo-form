import React from 'react';
import './TodoList.scss';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type ListOfTodos = {
  todos: Todo[]
};

export const TodoList: React.FC<ListOfTodos> = ({ todos }) => (
  <div className="todo">
    <ul className="todo__list">
      {todos.map(todo => (
        <div className="todo__item" key={todo.id}>
          { todo.user && <UserInfo user={todo.user} />}
          <TodoInfo todo={todo} />
        </div>
      ))}
    </ul>
  </div>
);
