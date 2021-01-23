import React from 'react';
import PropTypes from 'prop-types';

export default class TodoList extends React.PureComponent {
  render() {
    const { todosList } = this.props;

    return (
      <ul className="list">
        {
          todosList.map(todo => (
            <li key={todo.id} className="list__item">
              <p>
                User:
                {' '}
                <span className="list__text">{todo.user}</span>
              </p>
              <p>
                Todo:
                {' '}
                <span className="list__text">{todo.title}</span>
              </p>
              <p>
                Status:
                {' '}
                <span className="list__text">
                  {todo.completed ? 'completed' : 'in progress'}
                </span>
              </p>
            </li>
          ))
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
