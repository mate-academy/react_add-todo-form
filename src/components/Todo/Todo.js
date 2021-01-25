import React from 'react';
import classNames from 'classnames';
import { User } from '../User/User';
import './Todo.scss';
import { TodoShape } from '../../shapes/TodoShape';

export const Todo = ({ id, user, title, completed }) => (
  <>
    <div className="todo__Number">{id}</div>
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
