import React from 'react';
import './List.css'
import PropTypes from 'prop-types';


export const List = ({list}) => (
  <ul className="list-group list-group-flush">
    {list.map(todo =>{
      const name = todo.user.name;
      const title = todo.title;
      const status = (todo.completed)? 'true' : 'false';
      return(
      <li
        className="list-group-item"
        key={todo.id}
      >
        <span>{name}</span> <span>{title}</span> <span>{status}</span>
      </li>
      )
    })}
  </ul>
)

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
