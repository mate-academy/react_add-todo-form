import React from 'react';
import PropTypes from 'prop-types';
import './List.css'
import propTypes from '../../types'

export class List extends React.PureComponent {
  render() {
    const { todoList } = this.props;

    return (
      <ul className="list-group list-group-flush">
        {todoList.map(todo =>{
          const name = todo.user.name;
          const title = todo.title;

          return(
            <li
              className="list-group-item"
              key={todo.id}
            >
              <span className='list__item-span'>{name}</span> <span className='list__item-span'>{title}</span>
            </li>
          )
        })}
      </ul>
    );
  }
}

List.propTypes = {
  todoList: PropTypes.arrayOf(
    propTypes
  ).isRequired,
};
