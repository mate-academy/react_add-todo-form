import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import NewTodo from './NewTodo';

class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
  }

  addTodo = (id, title, userId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id,
        userId,
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
        <table className="table">
          <thead className="head">
            <tr>
              <th>№</th>
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

export default TodoList;
