import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

type ToDo = {
  userId: number,
  id: number,
  title: string,
  completed?: boolean,
};

type State = {
  todos: ToDo[],
  id: number,
  title: string,
  userId: number,
  invalidTitle: boolean,
  invalidUser: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    id: todos.length + 1,
    title: '',
    userId: 0,
    invalidTitle: false,
    invalidUser: false,
  };

  showErrors = () => {
    if (this.state.title.length === 0) {
      this.setState({
        invalidTitle: true,
        invalidUser: true,
      });
    } else if (!users.find(person => person.id === this.state.userId)) {
      this.setState({
        invalidUser: true,
        invalidTitle: true,
      });
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { id, title, userId } = this.state;

    const selectedUser = users.find(person => person.id === this.state.userId);

    if (!this.state.title || !selectedUser) {
      return this.showErrors();
    }

    const newToDo = {
      id,
      title,
      userId,
    };

    return this.setState(prevState => ({
      id: prevState.todos.length + 1,
      title: '',
      userId: 0,
      todos: [...prevState.todos, newToDo],
    }));
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      invalidTitle: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      invalidUser: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <form
          className="App__form"
          onSubmit={this.handleSubmit}
        >
          <label
            className="App__label"
            htmlFor="toDoTitle"
          >
            Task title:
            <br />
            <div className="App__container">
              <input
                type="text"
                id="toDoTitle"
                name="toDoTitle"
                placeholder="Task title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              {this.state.invalidTitle && (
                <span className="App__error">
                  Please, enter task title
                </span>
              )}
            </div>
          </label>

          <label
            className="App__label"
            htmlFor="userId"
          >
            Assigned to:
            <br />
            <div className="App__container">
              <select
                name="userId"
                id="userId"
                value={this.state.userId}
                onChange={this.handleUserChange}
              >
                <option value="">
                  Choose an user
                </option>

                {users.map(user => (
                  <option value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {this.state.invalidUser && (
                <span className="App__error">
                  Please, choose user
                </span>
              )}
            </div>
          </label>

          <button
            type="submit"
            className="App__button"
          >
            Add task
          </button>
        </form>

        <ul className="App__toDoList">
          {this.state.todos.map(toDoItem => {
            const user = users.find(person => person.id === toDoItem.userId);

            return (
              <li className="App__todoInfo">
                <h2>
                  {`${toDoItem.id}. ${toDoItem.title}`}
                </h2>

                {toDoItem.userId && (
                  <strong>
                    {user && `Assigned to: ${user.name}`}
                  </strong>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
