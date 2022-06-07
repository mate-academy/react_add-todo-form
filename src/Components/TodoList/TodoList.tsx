import React from 'react';
import { FullTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.css';

type Props = {
  todos: FullTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="row">
      {todos.map(todo => (
        <div className="col-sm-4">
          <li key={todo.id} className="card">
            <TodoInfo todo={todo} />
          </li>
        </div>
      ))}
    </ul>
  );
};
