import React from 'react';
import { currentDate, currentDay, currentMonth } from '../../constants/date';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todo-list">
      <div className="todo-list__header">
        <h1 className="todo-list__day">
          {`${currentDay}, ${currentDate}`}
        </h1>
        <p className="todo-list__month">
          {currentMonth}
        </p>
      </div>

      <div className="todo-list__content">
        {todos.map(({
          userId, id, title, completed,
        }) => (
          <TodoInfo
            key={id}
            userId={userId}
            title={title}
            completed={completed}
          />
        ))}
      </div>
    </div>
  );
};
