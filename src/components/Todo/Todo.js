import React from 'react';
import { TypeTodo } from '../../types';

export const Todo = ({ id, userId, title, completed }) => (
  <li>
    <div className="todo">
      <p>
        USER ID =
        {userId}
      </p>
      <p>
        Title:
        {title}
      </p>
      <p>
        TODO ID =
        {id}
      </p>
      <p>
        completed status:
        {`${completed}`}
      </p>
    </div>
  </li>
);

Todo.propTypes = TypeTodo;
