import React from 'react';

import users from './api/users';
import todos from './api/todos';

const getUserById = userId => (
  users.find(user => user.id === userId)
);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export class App extends React.PureComponent {
  state = {
    todosList: preparedTodos,
    newTitle: '',
    userName: '',
    hiddenName: true,
    hiddenTitle: true,
  }

  handleNewTitle = (event) => {
    this.setState({
      newTitle: event.target.value,
    });
  }

  handleUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  }

  handleForm = (event) => {
    event.preventDefault();
    const { userName, newTitle } = this.state;

    if (!newTitle || !userName) {
      this.setState({
        hiddenName: userName,
        hiddenTitle: newTitle,
      });

      return;
    }

    this.setState(prev => ({
      todosList: [
        ...prev.todosList,
        {
          id: prev.todosList.length + 1,
          title: newTitle,
          completed: false,
          user: {
            name: users.find(user => user.name === userName).name,
          },
        },
      ],
      userName: '',
      newTitle: '',
      hiddenName: true,
      hiddenTitle: true,
    }));
  }

  render() {
    const {
      todosList,
      newTitle,
      userName,
      hiddenTitle,
      hiddenName,
    } = this.state;

    return (
      <form onSubmit={this.handleForm}>
        <select
          value={userName}
          onChange={this.handleUserName}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        <span
          style={{ color: 'red' }}
          hidden={hiddenName}
        >
          Please choose a user
        </span>
        <div>
          <button type="submit">
            Add
          </button>
        </div>
        <input
          placeholder="Please enter the title"
          type="text"
          className="form-control"
          value={newTitle}
          onChange={this.handleNewTitle}
        />
        <span
          style={{ color: 'red' }}
          hidden={hiddenTitle}
        >
          Please enter the title
        </span>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Completed</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {todosList.map(todo => (
              <tr key={todo.id}>
                <th>{todo.user.name}</th>
                <th>
                  Completed :
                  {`${todo.completed}`}
                </th>
                <th>{todo.title}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  }
}
