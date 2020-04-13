import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ preparedTodos }) => (
  <div className="todos-list">
    {preparedTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
  </div>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      adress: PropTypes.object,
      streat: PropTypes.string,
      suite: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      geo: PropTypes.object,
      lat: PropTypes.string,
      lng: PropTypes.string,
      phone: PropTypes.string,
      website: PropTypes.string,
      company: PropTypes.object,
      catchPhrase: PropTypes.string,
      bs: PropTypes.string,
    })
  ).isRequired,
};
