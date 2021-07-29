import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

const preparedTodos = (list, users) => (
  list.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }))
);

export class TodoList extends React.Component {
  state = {
    listTodos: preparedTodos(this.props.list, this.props.users),
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list.length !== this.props.list.length) {
      this.renderNewList();
    }
  }

  renderNewList() {
    const { list, users } = this.props;

    this.setState({ listTodos: preparedTodos(list, users) });
  }

  render() {
    return (
      <ul>
        {this.state.listTodos.map(todo => (
          <li key={todo.id}>
            <Todo {...todo} />
          </li>
        ))}
      </ul>
    );
  }
};

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
};
