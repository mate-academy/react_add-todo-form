import React from 'react';
import Class from 'classnames';
import { PreparedTodoType } from '../types/PreparedTodoType';
import './TodoList.scss';

interface Props {
  todoList: PreparedTodoType[];
}

export const TodoList: React.FC<Props> = React.memo(({ todoList }) => {
  return (
    <ul className="list">
      {
        todoList.map(todo => (
          <li
            className={Class(
              'list__item',
              { list__item__notCompl: !todo.completed },
            )}
            key={todo.id}
          >
            <h1>Title:</h1>
            <h3 className="title">{todo.title}</h3>
            <h1>Username:</h1>
            <h3 className="title is-2">{todo.user?.username}</h3>
            <h1>Name:</h1>
            <h3 className="title is-2">{todo.user?.name}</h3>
            <h1>Email:</h1>
            <h3 className="title is-4">{todo.user?.email}</h3>
            <h1 className="title is-3">Completed:</h1>
            <h3
              style={{
                color: !todo.completed
                  ? 'red'
                  : 'green',
              }}
              className="title is-2"
            >
              {todo.completed ? 'Yes' : 'No'}
            </h3>
          </li>
        ))
      }
    </ul>
  );
});
