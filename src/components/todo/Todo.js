import React from 'react';
import classNames from 'classnames';
import { User } from '../user/User';
import { TodoShape } from '../shapes/TodoShape';

import './Todo.css';

export const Todo = ({ id, user, title, completed }) => (
  <>
    <User user={{
      ...user,
      completed,
    }}
    />
    <div className="todo__Title">{title}</div>
    <strong className={
      classNames(
        'status',
        { 'status--completed': completed },
      )}
    />
  </>
);

Todo.propTypes = TodoShape;
