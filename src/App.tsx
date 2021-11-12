import React from 'react';
import './App.scss';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList';

interface State {
  users: User[],
  todos: Todo[],
  title: string,
  selectedUser: string,
  titleNotEntered: boolean,
  userNotSelected: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    users,
    todos,
    title: '',
    selectedUser: 'no user selected',
    titleNotEntered: false,
    userNotSelected: false,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((state) => (
      {
        ...state,
        [name]: value,
        titleNotEntered: false,
      }
    ));
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
      userNotSelected: false,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedUser = this.state.users.find(user => (
      user.name === this.state.selectedUser
    ));

    if (!selectedUser || !this.state.title) {
      return this.showErrors();
    }

    const newTodo: Todo = {
      userId: selectedUser?.id,
      id: this.state.todos.length + 1,
      title: this.state.title,
      completed: false,
    };

    return this.setState((state) => ({
      todos: [...state.todos, newTodo],
      title: '',
      selectedUser: 'no user selected',
    }));
  };

  showErrors = () => {
    this.setState(state => ({
      titleNotEntered: !state.title,
      userNotSelected: state.selectedUser === 'no user selected',
    }));
  };

  render() {
    const {
      title,
      users: usersToPrint,
      selectedUser,
      titleNotEntered,
      userNotSelected,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          className="form"
          onSubmit={this.handleSubmit}
          action="POST"
        >
          <fieldset>
            <legend>Please enter todo</legend>
            {titleNotEntered
              ? (<span className="error-message">Title is not entered</span>)
              : null}
            <div className="form__element">
              <label htmlFor="title">
                Title
                <input
                  value={title}
                  type="text"
                  name="title"
                  placeholder="Enter todo"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            {userNotSelected
              ? (<span className="error-message">User is not selected</span>)
              : null}
            <div className="form__element">
              <select
                name="selectedUser"
                id="users"
                value={selectedUser}
                onChange={this.handleSelectChange}
              >
                <option
                  value=""
                >
                  Choose your fighter
                </option>
                {usersToPrint.map(user => (
                  <option
                    value={user.name}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
            >
              Add
            </button>
          </fieldset>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
