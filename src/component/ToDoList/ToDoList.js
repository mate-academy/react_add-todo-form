import React from 'react';
import PropTypes from 'prop-types';
import { NewTodo } from '../NewTodo/NewTodo';

export class ToDoList extends React.Component {
  state = {
    users: this.props.users,
    UserTodos: this.props.UserTodos,
    selectedUser: 0,
    updateTodos: this.props.updateTodos,
  };

  changeSelectedUsers = (e) => {
    this.setState({
      selectedUser: Number(e.target.value),
    });
  };

  renderAddedTodo = (value) => {
    this.setState({
      UserTodos: value,
    });
    this.state.updateTodos(this.state.UserTodos);
  };

  render() {
    const { users, UserTodos, selectedUser } = this.state;

    return (
      <>
        <NewTodo
          users={users}
          selectedUser={selectedUser}
          UserTodos={UserTodos}
          renderAddedTodo={this.renderAddedTodo}
        />

        <select name="" id="" onChange={this.changeSelectedUsers}>
          {
            users.map((user, index) => (
              <option key={user.id} value={index}>{user.name}</option>
            ))
          }
        </select>

        <div>
          {
            UserTodos.map(todo => (
              <div key={todo.id}>
                <h4>
                  {
                    users.map(
                      user => (user.id === todo.userId ? user.name : null),
                    )
                  }
                </h4>
                <p>{todo.title}</p>
              </div>
            ))
          }
        </div>
      </>
    );
  }
}

ToDoList.propTypes = {
  UserTodos: PropTypes.arrayOf(PropTypes.shape({
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
