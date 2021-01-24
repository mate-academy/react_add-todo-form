import React from 'react';
import { TypeTodo } from '../../types';

export const Todo = ({ user, title }) => (
  <li>
    <div className="todo">
      <p>
        {`Name: ${user.name}`}
      </p>
      <p>
        {`Title: ${title}`}
      </p>
      <p>
        {`User id: ${user.id}`}
      </p>
    </div>
  </li>
);

Todo.propTypes = TypeTodo;
