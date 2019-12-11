import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <div className="list">
        <h1>List of todos</h1>
        <ol className="list__tasks">
          {todos.map(item => (
            <li className="list__item">
              {item.title}
              {' '}
              <span className="list__user">
                User
                (
                {item.user.name}
                )
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

TodoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;
