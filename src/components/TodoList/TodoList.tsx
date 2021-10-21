import React from 'react';
import './TodoList.scss';
import users from '../../api/users';
import TodoType from '../../types/TodoType';

type Props = {
  allTodos: TodoType[];
};

export const TodoList: React.FC<Props> = ({ allTodos }) => {
  return (
    <ul className="todo-list">
      {allTodos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="todo-list__item"
          >
            <div>
              <span className="todo-list__item-name">
                Name:&nbsp;
              </span>
              {newUser?.name}
              <br />
              <span className="todo-list__item-task">
                Task:&nbsp;
              </span>
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
