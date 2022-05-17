import React from 'react';
import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todoList">
      <ul className="todoList__list">
        {todos.map(item => (
          <li key={item.id} className="todoList__item">
            <TodoInfo
              user={item.user}
              title={item.title}
              completed={item.completed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
