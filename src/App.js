import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    userList: users.map(user => (
      <option name={user.username} key={user.id} value={user.id}>
        {user.name}
      </option>
    )),
    formEntry: '',
    selectedUser: 'not chosen',
    todosList: todos,
    userError: false,
    titleError: false,
  }

  addTodo = () => {
    if (this.state.formEntry === '') {
      this.setState({ titleError: true });
      return;
    }

    if (this.state.selectedUser === 'not chosen') {
      this.setState({ userError: true });
      return;
    }

    this.setState(state => ({
      todosList: [
        ...state.todosList,
        {
          userId: `${state.selectedUser}`,
          id: `${state.todosList.length + 1}`,
          title: `${state.formEntry}`,
          completed: false,
        },
      ],
    }));
  };

  render() {
    return (
      <div className="App">
        <form className="form">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="task text"
            value={this.state.formEntry}
            onChange={event => this.setState({
              formEntry: event.target.value,
              titleError: false,
            })}
          />
          {this.state.titleError
            ? <span className="error">Please enter the title</span>
            : ''
          }
          <br />
          <label htmlFor="users">Select User</label>
          <select
            name="users"
            onChange={event => this.setState({
              selectedUser: event.target.value,
              userError: false,
            })}
          >
            <option name="default" key="0" value="not chosen">
              Choose a user
            </option>
            {this.state.userList}
          </select>
          {this.state.userError
            ? <span className="error">Please choose a user</span>
            : ''
          }
          <br />
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              this.addTodo();
              this.setState({
                formEntry: '',
              });
            }}
          >
            Add task
          </button>
        </form>
        <div className="list">
          <ul>
            {this.state.todosList.map(({ id, userId, title, completed }) => (
              <li key={id}>
                {title}
                {` is `}
                {completed ? 'done' : 'not completed'}
                {` by `}
                {users.find(user => user.id === Number(userId)).name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
