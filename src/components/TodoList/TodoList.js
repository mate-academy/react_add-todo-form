import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import NewTodo from '../NewTodo/NewTodo';
import './TodoList.css';

class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
  }

  addTodo = (tempTask, userId) => {
    const todosLength = this.state.todos.length;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: todosLength + 1, title: tempTask, userId: +userId,
      }],
    }));
  }

  render() {
    const { users } = this.props;
    const { todos } = this.state;

    return (
      <>
        <NewTodo users={users} addTodo={this.addTodo} />
        <table>
          <thead>
            <tr>
              <th>Numder</th>
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
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default TodoList;
