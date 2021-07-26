import React from 'react';
import classNames from 'classnames/bind';
import { TodoShape } from '../../shapes/TodoShape';
import { User } from '../User/User';

import './Todo.scss';

export const Todo = ({ title, completed, user }) => (
  <>
    <h3 className={
      classNames('item__title', { 'item__title--completed': !completed })
    }
    >
      {title}
    </h3>
    <User user={user} completed={completed} />
  </>
);

Todo.propTypes = TodoShape;
