import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ListItem } from '../ListItem/ListItem';
import { usersType, todosType } from '../../types';
import './list.scss';

export const List = ({ todos, users }) => (
  <ul className="todo">
    {todos.map(todo => (
      <li
        key={nanoid()}
        className="todo__item"
      >
        <ListItem
          users={users}
          todo={todo}
        />
      </li>
    ))}
  </ul>
);

List.propTypes = {
  todos: PropTypes.arrayOf(todosType).isRequired,
  users: PropTypes.arrayOf(usersType).isRequired,
};
