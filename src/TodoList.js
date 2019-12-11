import PropTypes from 'prop-types';
import React from 'react';
import NewTodo from './NewTodo';

class TodoList extends React.Component {
  state = {
    todos: [...this.props.todos],
    users: [...this.props.users],
  }

  setNewTodo= (userId, title) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        { userId, title },
      ],
    }));
  };

  render() {
    const { todos, users } = this.state;

    return (
      <>
        <NewTodo
          userList={users}
          setNewTodo={this.setNewTodo}
          className="todo-form"
        />
        <table className="todo-list">
          <thead className="todo-list__head">
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>USERS ID</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.title}>
                <td>{todos.indexOf(todo) + 1}</td>
                <td>{todo.title}</td>
                <td>{todo.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>

    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,

};

export default TodoList;
