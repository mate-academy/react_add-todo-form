import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  }
}

interface NewTodo {
  userId: number,
  id: number,
  title:string,
  completed: boolean,
  user: User | null,
}

const newTodos: NewTodo[] = todosFromServer.map(todo => (
  {
    user: usersFromServer.find(user => (user.id === todo.userId)) || null,
    ...todo,
  }
));

type State = {
  todos: NewTodo[],
  newTodoName: string,
  newTodoPerformer: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: newTodos,
    newTodoName: '',
    newTodoPerformer: 0,
  };

  inputTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value });
  };

  inputTodoPerformer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoPerformer:
        usersFromServer.find(user => user.id === +event.target.value)?.id
        || -1,
    });
  };

  addInTodoList = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxTodoId = Math.max(...this.state.todos.map(todo => todo.id));

    const newTodo: NewTodo = {
      userId: +this.state.newTodoPerformer,
      id: maxTodoId + 1,
      title: this.state.newTodoName,
      completed: false,
      user: usersFromServer.find(user => user.id === +this.state.newTodoPerformer) || null,
    };

    this.setState(prev => {
      return {
        newTodoName: '',
        newTodoPerformer: 0,
        todos: [
          newTodo,
          ...prev.todos,
        ],
      };
    });
  };

  render() {
    const { todos, newTodoName, newTodoPerformer } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>

        <form
          className="form"
          onSubmit={this.addInTodoList}
        >
          <input
            className="form__element"
            type="text"
            placeholder="Enter todo"
            required
            onChange={this.inputTodoName}
            value={newTodoName}
          />

          <select
            className="form__element"
            name="users"
            id="users"
            value={newTodoPerformer}
            onChange={this.inputTodoPerformer}
          >
            <option value="0">Select performer</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          <button
            className="form__element"
            type="submit"
          >
            Add new todo to list
          </button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th className="tableHeader__line">Title</th>
              <th className="tableHeader__line">Status</th>
              <th className="tableHeader__line">Name</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <th className="tableBody__line">{todo.title}</th>
                {todo.completed
                  ? <th className="tableBody__line">Done</th>
                  : <th className="tableBody__line">To perform</th>
                }
                {todo.user
                  ? <th className="tableBody__line">{todo.user.name}</th>
                  : <th className="tableBody__line">No performer</th>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
