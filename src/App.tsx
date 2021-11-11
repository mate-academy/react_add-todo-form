import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

let preparedTodos = todos.map(item => ({
  toDoTitle: item.title,
  toDoId: item.id,
  userId: item.userId,
}));

type State = {
  toDoId: number,
  toDoTitle: string,
  userId: number,
  invalidTitle: boolean,
  invalidUser: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    toDoId: preparedTodos.length + 1,
    toDoTitle: '',
    userId: 0,
    invalidTitle: false,
    invalidUser: false,
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          className="App__form"
          onSubmit={(event) => {
            event.preventDefault();

            if (!this.state.invalidTitle && !this.state.invalidUser) {
              this.setState({
                toDoId: preparedTodos.length + 1,
                toDoTitle: '',
                userId: 0,
              });
            }
          }}
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
                value={this.state.toDoTitle}
                onChange={(event) => {
                  this.setState({
                    toDoTitle: event.target.value,
                    invalidTitle: false,
                  });
                }}
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
                onChange={(event) => {
                  this.setState({
                    userId: +event.target.value,
                    invalidUser: false,
                  });
                }}
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
            onClick={() => {
              if (this.state.toDoTitle.length === 0) {
                this.setState({
                  invalidTitle: true,
                });
              } else if (!users.find(person => person.id === this.state.userId)) {
                this.setState({
                  invalidUser: true,
                });
              } else {
                this.setState(prevState => ({
                  toDoId: prevState.toDoId + 1,
                }));
                preparedTodos = [...preparedTodos, this.state];
              }
            }}
          >
            Add task
          </button>
        </form>

        <ul className="App__toDoList">
          {preparedTodos.map(toDoItem => {
            const user = users.find(person => person.id === toDoItem.userId);

            return (
              <li className="App__todoInfo">
                <h2>
                  {`${toDoItem.toDoId}. ${toDoItem.toDoTitle}`}
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
