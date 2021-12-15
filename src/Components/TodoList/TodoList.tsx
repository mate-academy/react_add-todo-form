import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';
import { Todo } from '../../types';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div className="list">
      {todos.map((todo: Todo) => (
        <div
          className="list__item"
          key={todo.id}
        >
          <TodoInfo todo={todo} />
        </div>
      ))}
    </div>
  );
};
