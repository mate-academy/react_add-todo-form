import React from 'react';
import { Todo } from '../../type/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

interface Props {
  todoList: Todo[]
}
export const TodoLis: React.FC <Props> = ({ todoList }) => {
  return (
    <div className="card-area">
      {todoList.map(todo => (
        <div
          className={`${todo.completed ? 'card indicator-true' : 'card indicator-fasle'}`}
          key={todo.id}
        >
          <UserInfo
            user={todo.user}
            completed={todo.completed}
          />

          <TodoInfo todo={todo} />
        </div>
      ))}
    </div>
  );
};
