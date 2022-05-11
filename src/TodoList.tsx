import classNames from 'classnames';
import React from 'react';
import { Todo } from './types/Todo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <div className="todo_item">
        <li key={todo.id}>
          {todo.user
            ? (
              <>
                <p>
                  {`Name: ${todo.user.name}`}
                </p>
                <p>
                  {`Email: ${todo.user.email}`}
                </p>
                <p className={classNames(todo.completed
                  ? 'completed'
                  : 'active')}
                >
                  {`To do: ${todo.title}`}
                </p>
              </>
            )
            : (
              null
            )}
        </li>
      </div>
    ))}
  </ul>
);
