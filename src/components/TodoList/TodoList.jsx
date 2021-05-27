import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <ul className="list">
        {todos.map(({ name, title, completed, id }) => (
          <li key={id} className="list__item">
            <>
              <p className="list__text">{name}</p>
              <h2 className="list__title">{title}</h2>
              <p>{completed ? 'Готово' : 'Не завершено'}</p>
            </>
          </li>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
