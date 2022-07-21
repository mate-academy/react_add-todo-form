import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../type/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

interface Props {
  todoList: Todo[]
}
export const TodoLis: React.FC <Props> = ({ todoList }) => {
  return (
    <div className="card-area">
      {todoList.map(todo => (
        <div
          className={
            classNames(
              'card indicator-true',
              { 'card indicator-fasle': !todo.completed },
            )
          }
          key={todo.id}
        >
          <TodoInfo todo={todo} data-id={todo.id} />
        </div>
      ))}
    </div>
  );
};
