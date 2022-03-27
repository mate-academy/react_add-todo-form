import React from 'react';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => {
        const {
          user,
          id,
          title,
          completed,
        } = todo;

        return (
          <li className="todo-list__item" key={id}>
            <h2>{user?.name}</h2>
            <p className="item-title">{title}</p>
            <p>
              {completed ? 'complete' : 'in progress'}
            </p>
          </li>
        );
      })}
    </>
  );
};
