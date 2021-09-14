import React from 'react';
import './App.css';
import { uuid } from 'uuidv4';
import TodoList from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, uuid: uuid(), user };
});

interface State {
  personId: number;
  title: string;
  copyPrepared: Todo[];
}

class App extends React.PureComponent<{}, State> {
  state = {
    personId: -1,
    title: '',
    copyPrepared: preparedTodos,
  };

  formSubmit = () => {
    this.state.copyPrepared.push({
      id: 1,
      uuid: uuid(),
      title: this.state.title,
      user: users[this.state.personId],
    });
  };

  handleChange = (event: React.FormEvent) => {
    if (!this.state.title || this.state.personId === -1) {
      event.preventDefault();

      return;
    }

    event.preventDefault();
    this.formSubmit();
    this.forceUpdate();
    this.state.title = '';
    this.state.personId = -1;
  };

  render() {
    return (
      <div className="App">
        <form
          className="app__form"
          onSubmit={this.handleChange}
        >
          <label htmlFor="inputTitle">
            <input
              className="form-control"
              id="inputTitle"
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Input new title"
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
            />

            {!this.state.title && (
              <p
                className="alert alert-danger"
              >
                Please enter the title
              </p>
            )}
          </label>

          <label htmlFor="selectUser">
            <select
              className="form-select form-select-lg"
              id="selectUser"
              name="user"
              value={this.state.personId}
              onChange={(event) => {
                this.setState({ personId: +event.target.value });
              }}
            >
              <option value="">
                Choose a user
              </option>

              {users.map(person => {
                return (
                  <option value={person.id - 1}>{person.name}</option>
                );
              })}

            </select>

            {(this.state.personId === -1) && (
              <p
                className="alert alert-danger"
              >
                Please choose a user
              </p>
            )}
          </label>

          <button
            className="btn btn-primary app__button"
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todosArray={this.state.copyPrepared} />
      </div>
    );
  }
}

export default App;
