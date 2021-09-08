import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const addedTodos = [...todos];

type State = {
  title: string;
  userId: number | '';
  id: number;
};

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userId: '',
    id: addedTodos.length + 1,
  };

  clearState = () => {
    this.setState(currentState => {
      return {
        title: '',
        userId: '',
        id: currentState.id + 1,
      };
    });
  };

  saveTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, id, userId } = this.state;
    const newTodo = {
      title,
      id,
      userId,
      completed: false,
    };

    addedTodos.push(newTodo as Todo);
    this.clearState();
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo</h1>

        <form onSubmit={this.saveTodo}>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            pattern="[A-Za-zа-яА-ЯЁё0-9]+"
            onChange={this.addTitle}
            required
          />
          <br />

          <select
            name="user"
            value={this.state.userId}
            onChange={(event) => {
              this.setState({ userId: +event.target.value });
            }}
            required
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>
            {
              users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))
            }

          </select>
          <br />

          <button type="submit">
            Add
          </button>

        </form>
      </div>
    );
  }
}

export default App;
