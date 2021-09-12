import React from 'react';

import classNames from 'classnames';
import { Todo } from '../Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {todos.map(todo => (
          <tr
            className={classNames(
              'table__body-row',
              { 'table__body-completed--done': todo.completed },
              { 'table__body-completed--undone': !todo.completed },
            )}
            key={todo.id}
          >
            <TodoInfo todo={todo} />
          </tr>
        ))}
      </tbody>
    </table>
  </>
);
