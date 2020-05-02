import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  render() {
    return (
      this.props.todos.map(todo => (
        <div key={todo.id} className="todo__item">
          <h2>
            {todo.id}
            .
            {' '}
            {todo.title}
          </h2>
          <p>{todo.user.name}</p>
          <p>{todo.completed ? 'completed' : 'not completed'}</p>
        </div>
      ))
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
