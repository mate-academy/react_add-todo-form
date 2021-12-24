import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[],
  removeTodo: any,
};

export const TodoList:React.FC<Props> = ({ todos, removeTodo }) => {
  return (
    <div className="todo-list">
      <h2 className="todo-list__title">Todo List:</h2>
      <div className="todo-list__items">
        {todos.map(todo => (
          <div className="todo-list__item" key={todo.id}>
            <img alt="status" src={todo.completed ? './images/checked.png' : './images/disable.png'} width="30px" />
            <div className="todo-list__item-info">
              <h2>{`Title: ${todo.title}`}</h2>
              {todo.user && <UserInfo user={todo.user} />}
            </div>
            <button
              type="button"
              className="todo-list__remove-item"
              data-key={todo.id}
              onClick={removeTodo}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
