import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos } = props;

  return (
    <div className="table__body">
      {todos.map((todo: Todo) => (
        <div
          className="table__body-item"
          key={todo.id}
        >
          <TodoInfo todo={todo} />
        </div>
      ))}
    </div>
  );
};
