import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { TodoShape } from '../../shapes/TodoShape';
import { Todo } from '../Todo/Todo';

import './TodoList.scss';

export const TodoList = ({ todoList }) => (
  <ul className="list">
    {
      todoList.map(todo => (
        <li
          className={
            classNames('list__item item', { 'item--completed': todo.completed })
          }
          key={todo.id}
        >
          <Todo {...todo} />
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(TodoShape).isRequired,
};
