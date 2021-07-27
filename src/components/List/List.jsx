import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { todos } from '../../api/todos';
import users from '../../api/users';
import { ListItem } from '../ListItem/ListItem';
import './list.scss';

export const List = ({ usersArray, toDoArr }) => (
  <ol className="todo">
    {todos.map(todo => (
      <li
        className="todo__item"
        key={nanoid()}
      >
        <ListItem
          user={users.find(user => (user.id === todo.userId)).name}
          toDo={todo.title}
          progress={todo.completed}
        />
      </li>
    ))}

    {usersArray.map((user, index) => (
      <li
        className="todo__item"
        key={nanoid()}
      >
        <ListItem
          toDo={toDoArr[index]}
          user={user}
        />
      </li>
    ))}
  </ol>
);

List.propTypes = {
  usersArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  toDoArr: PropTypes.arrayOf(PropTypes.string).isRequired,
};
