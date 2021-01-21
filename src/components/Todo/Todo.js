import React from 'react';
import { TypeTodo } from '../../types';

export const Todo = ({ user, id, title, completed }) => (
  <li>
    <div className="todo">
      <p>
        {`Name: ${user.name}`}
      </p>
      <p>
        {`Title: ${title}`}
      </p>
      <p>
        {`todo id: ${id}`}
      </p>
      <p>
        status:
        {`${completed}`}
      </p>
    </div>
  </li>
);

Todo.propTypes = TypeTodo;
