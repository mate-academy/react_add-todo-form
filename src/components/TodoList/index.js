import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem';

export default class TodoList extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      todos.map(el => (
        <TodoItem key={el.id} {...el} />
      ))
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};
