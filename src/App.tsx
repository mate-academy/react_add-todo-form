import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { State } from './types/StateForApp';
import { TodoList } from './components/TodoList';

class App extends React.Component<{}, State> {
  state = {
    todosList: [...todos],
    title: '',
    selectedUser: '',
    todo: '',
    titleIsValid: true,
    userIsSelected: true,
  };

  render() {
    const {
      todosList, title, selectedUser, titleIsValid, userIsSelected,
    } = this.state;

    const todosForRender = todosList.map((todoApp) => ({
      ...todoApp,
      user: users.find(userFromServer => userFromServer.id === todoApp.userId) || null,
    }));

    return (
      <>
        <form
          action="#"
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            const titleForNewTodo = title;
            const selectedUserFromServer
              = users.find(user => user.name === selectedUser);

            if (selectedUserFromServer === undefined) {
              this.setState({ userIsSelected: false });
            }

            if (!titleForNewTodo) {
              this.setState({ titleIsValid: false });
            }

            if (selectedUserFromServer !== undefined
              && titleForNewTodo
              && titleForNewTodo.length <= 20) {
              this.setState((state) => ({
                todosList: [...state.todosList, {
                  userId: selectedUserFromServer.id,
                  id: todosList.length + 1,
                  title: titleForNewTodo,
                  completed: false,
                }],
                title: '',
                selectedUser: '',
                todo: 'To do something',
              }));
            }
          }}
        >
          <fieldset className="form-fieldset">

            <legend className="form-legend">Create a new todo</legend>

            <label htmlFor="title">
              Enter the title of the TODO:
              {' '}
              <br />
              <input
                className="form-title"
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={(event) => {
                  this.setState({ title: event.target.value });
                  if (!event.target.value) {
                    this.setState({ titleIsValid: false });
                  } else {
                    this.setState({ titleIsValid: true });
                  }
                }}
              />
            </label>
            {titleIsValid ? '' : <span className="error-message">Please enter the title</span>}
            {title.length <= 20 ? '' : <span className="error-message">Max length 20 characters</span>}
            <br />

            <label htmlFor="user">
              Choose for whom the TODO will be created:
              {' '}
              <br />
              <select
                className="form-select"
                name="selectedUser"
                id="user"
                value={this.state.selectedUser}
                onChange={(event) => {
                  this.setState({ selectedUser: event.target.value });
                  if (!event.target.value) {
                    this.setState({ userIsSelected: false });
                  } else {
                    this.setState({ userIsSelected: true });
                  }
                }}
              >
                <option value="">Choose a user</option>
                {users.map(userFromServer => (
                  <option
                    key={userFromServer.id}
                    value={userFromServer.name}
                  >
                    {userFromServer.name}
                  </option>
                ))}
              </select>
            </label>
            {userIsSelected ? '' : <span className="error-message">Please choose a user</span>}
            <br />

            <label htmlFor="todo">
              Enter TODO:
              {' '}
              <br />
              <textarea
                className="form-textarea"
                name="todo"
                id="todo"
                placeholder="To do something"
                value={this.state.todo}
                onChange={(event) => {
                  this.setState({ todo: event.target.value });
                }}
              />
            </label>
            <br />

            <button type="submit">Add</button>

          </fieldset>
        </form>
        <TodoList todosForTodoList={todosForRender} />
      </>
    );
  }
}

export default App;
