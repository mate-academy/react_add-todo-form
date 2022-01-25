import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './TodoList';

interface State {
  myTodos: Todo[],
  myUsers: User[],
  title: string,
  userId: string,
}

type Event = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

class App extends React.Component<{}, State> {
  state: State = {
    myTodos: todos.map(todo => ({
      ...todo,
      user: users.find(person => person.id === todo.userId) || null,
    })),
    myUsers: users.map(user => ({
      ...user,
    })),
    title: '',
    userId: '',
  };

  change = (event: Event) => {
    const { name, value } = event.target;

    this.setState((prev: State) => ({
      ...prev,
      [name]: value,
    }));
  };

  updateTodos = () => {
    this.setState((prev: State): State | undefined => {
      if (prev.title !== '' || prev.userId !== '') {
        prev.myTodos.push({
          userId: +prev.userId,
          id: prev.myTodos.length + 1,
          title: prev.title,
          completed: false,
          user: prev.myUsers.find(person => person.id === +prev.userId) || null,
        });

        return {
          ...prev,
          title: '',
          userId: '',
        };
      }

      return undefined;
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.change}
            required
            // onInvalid={}  question
            // onInput={}
          />
          <select
            name="userId"
            value={this.state.userId}
            onChange={this.change}
            required
          >
            <option value="">Choose a user</option>
            {this.state.myUsers.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
                {user.username}
                {' '}
                {user.email}
              </option>
            ))}
          </select>
          <button
            type="submit"
            onClick={this.updateTodos}
          >
            Add
          </button>
          <TodoList todos={this.state.myTodos} />
        </form>
      </div>
    );
  }
}

export default App;
