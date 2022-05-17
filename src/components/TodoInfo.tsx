import React from 'react';
import { Todo } from './types/Todo';
import { UserInfo } from './UserInfo';

type Props = {
  todos: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todos }) => (
  <>
    <div className="todoTitle">{todos.title}</div>
    <div className="todoCompleted">
      {todos.completed ? 'Completed' : 'Not completed'}
    </div>
    {todos.user && <UserInfo users={todos.user} />}
  </>
);
