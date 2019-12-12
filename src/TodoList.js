import './App.css';
import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.PureComponent {
  render() {
    const { addTodos } = this.props;

    return (
      <div>
        <ul>
          {addTodos.map(text => (
            <li
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
        </ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  addTodos: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
};

export default TodoList;
