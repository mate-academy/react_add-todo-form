import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <div className="newTodo">
        <ol className="ol">
          {todos.map(text => (
            <li
              className="li"
              key={text.id}
            >
              Title:
              {text.title}
              <p>
              User:
                {text.user.name}
              </p>
              <hr />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

export default TodoList;
