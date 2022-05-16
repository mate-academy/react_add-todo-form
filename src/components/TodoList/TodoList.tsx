import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todoList">
      <ul className="list">
        {todos.map(item => (
          <li key={item.id} className="list__item item">
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
