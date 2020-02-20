import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import { NewTodo } from './NewTodo';

export class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
  }

  addTodo = (title, userId) => {
    const size = this.state.todos.length;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        userId: +userId,
        id: size + 1,
        title,
      }],
    }));
  }

  render() {
    const { users } = this.props;
    const { todos } = this.state;

    return (
      <>
        <NewTodo users={users} addTodo={this.addTodo} />
        <p className="title is-5">
          Todo List
        </p>
        <table className="table is-bordered is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>Number</th>
              <th>Task</th>
              <th>User id</th>
            </tr>
          </thead>
          <tbody>
            <Todo todos={todos} />
          </tbody>
        </table>
      </>
    );
  }
}

TodoList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};
