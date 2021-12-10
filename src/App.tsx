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
    newTodo: '',
    titleIsValid: true,
    userIsSelected: true,
    newTodoIsValid: true,
  };

  handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const titleForNewTodo = this.state.title;
    const { selectedUser, newTodo, todosList } = this.state;

    const selectedUserFromServer
      = users.find(user => user.name === selectedUser);

    if (selectedUserFromServer === undefined) {
      this.setState({ userIsSelected: false });
    }

    if (!titleForNewTodo.trim()) {
      this.setState({ titleIsValid: false });
    }

    if (!newTodo.trim()) {
      this.setState({ newTodoIsValid: false });
    }

    if (selectedUserFromServer !== undefined
      && titleForNewTodo.trim()
      && titleForNewTodo.length <= 20
      && newTodo.trim()) {
      this.setState((state) => ({
        todosList: [...state.todosList, {
          userId: selectedUserFromServer.id,
          id: todosList.length + 1,
          title: titleForNewTodo,
          completed: false,
        }],
        title: '',
        selectedUser: '',
        newTodo: '',
      }));
    }
  };

  render() {
    const {
      todosList, title, titleIsValid, userIsSelected, newTodoIsValid,
    } = this.state;

    const todosForRender = todosList.map((todo) => ({
      ...todo,
      user: users.find(userFromServer => userFromServer.id === todo.userId) || null,
    }));

    return (
      <>
        <form
          action="#"
          className="form"
          onSubmit={this.handlerSubmit}
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
                  const { value } = event.target;

                  this.setState({
                    title: value.replace(/[^a-zA-Zа-яА-Я0-9\s]/gi, ''),
                    titleIsValid: true,
                  });
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
                  this.setState({
                    selectedUser: event.target.value,
                    userIsSelected: true,
                  });
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

            <label htmlFor="newTodo">
              Enter TODO:
              {' '}
              <br />
              <textarea
                className="form-textarea"
                name="newTodo"
                id="newTodo"
                placeholder="To do something"
                value={this.state.newTodo}
                onChange={(event) => {
                  this.setState({
                    newTodo: event.target.value,
                    newTodoIsValid: true,
                  });
                }}
              />
            </label>
            {newTodoIsValid ? '' : <span className="error-message">Please enter TODO</span>}
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
