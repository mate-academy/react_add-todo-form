import React from 'react';
import { TodoInfo } from './TodoInfo';
import './TodoList.scss';

interface Props {
  tasks: Todo[];
}

export const TodoList: React.FC<Props> = (props) => {
  const { tasks } = props;

  return (
    <ul className="todo list-group">
      {tasks.map(task => (
        <li className="list-group-item d-flex justify-content-around" key={task.id}>
          <TodoInfo todo={task} />
        </li>
      ))}
    </ul>
  );
};
