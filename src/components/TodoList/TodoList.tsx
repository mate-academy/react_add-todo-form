import React from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';

type Props = {
  completeToggle: (id:number) => void;
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ completeToggle, todoList }) => {
  const todoWithUsers = todoList.map((todo) => {
    return {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    };
  });

  return (
    <ul className="todo__list">
      {
        todoWithUsers.map((todo) => {
          return (
            <li
              key={todo.id}
              className="todo__item"
            >
              <button
                type="button"
                className="todo__button"
                onClick={() => {
                  completeToggle(todo.id);
                }}
              >
                <div className="todo__info">
                  <div>{todo.user?.name}</div>
                  <div className="todo__email">{todo.user?.email}</div>
                </div>
                <div className="todo__description">{todo.title}</div>
                <div className="todo__completed">
                  {
                    todo.completed
                      ? <img className="todo__image" src="./images/tick.png" alt="completed" />
                      : <img className="todo__image" src="./images/cross.png" alt="in progress" />
                  }
                </div>
              </button>
            </li>
          );
        })
      }
    </ul>
  );
};
