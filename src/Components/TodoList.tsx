import React from 'react';
import { Todo } from '../Types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {
        todos.map((todo) => (
          <li key={todo.id}>
            <div className="todoList__task">
              <p>
                {`${todo.id}.${todo.title}: `}
                {todo.completed
                  ? <span> Completed </span>
                  : <span>In progress</span>}
              </p>
            </div>
            <div className="todoList__user">
              {todo.user?.name}
            </div>
          </li>
        ))
      }
    </ul>
  );
};
