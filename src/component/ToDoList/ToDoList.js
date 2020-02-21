import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from '../NewTodo/NewTodo';
import './TodoList.css';

export class ToDoList extends React.Component {
  state = {
    users: this.props.users,
    userTodos: this.props.userTodos,
    selectedUser: -1,
  };

  changeSelectedUsers = (e) => {
    this.setState({
      selectedUser: Number(e.target.value),
    });
  };

  renderAddedTodo = (value) => {
    this.setState({
      userTodos: value,
    });
    this.props.updateTodos(value);
  };

  render() {
    const { users, userTodos, selectedUser } = this.state;

    return (
      <>
        <NewTodo
          users={users}
          selectedUser={selectedUser}
          userTodos={userTodos}
          renderAddedTodo={this.renderAddedTodo}
        />

        <select
          className="todo-select"
          name=""
          id=""
          onChange={this.changeSelectedUsers}
        >
          <option key={0} value={-1}>Select users&apos;s name</option>
          {
            users.map((user, index) => (
              <option key={user.id} value={index}>{user.name}</option>
            ))
          }
        </select>

        <div>
          {
            userTodos.map(todo => (
              <div key={todo.id}>
                <p className="todo-title-name">
                  {
                    users.map(
                      user => (user.id === todo.userId ? user.name : null),
                    )
                  }
                </p>
                <p className="todo-title-description">{todo.title}</p>
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

ToDoList.propTypes = {
  userTodos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ).isRequired,
  updateTodos: PropTypes.func.isRequired,
};
