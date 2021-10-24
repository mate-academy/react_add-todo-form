import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  userId?: number;
  id: number;
  title: string;
  user: string | null;
}

interface State {
  todos: Todo[];
  title: string;
  name: string;
  isInput: boolean;
  isSelected: boolean;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)?.name || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    title: '',
    name: '',
    isInput: false,
    isSelected: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.title || !prevState.name) {
        return {
          ...prevState,
          isInput: !prevState.title,
          isSelected: !prevState.name,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => +todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title: prevState.title,
        user: prevState.name,
      };

      return {
        isInput: false,
        title: '',

        isSelected: false,
        name: '',

        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isInput: false,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      isSelected: false,
    });
  };

  render() {
    const {
      todos,
      title,
      name,
      isSelected,
      isInput,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={this.handleFormSubmit}
        >
          <input
            type="text"
            id="textInput"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={this.handleInputChange}
          />
          {isInput && (
            <p>Please enter the title</p>
          )}
          <select
            name="name"
            value={name}
            onChange={this.handleSelectChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isSelected && (
            <p>Please choose a user</p>
          )}
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <ul className="TodoList">
          {todos.map(todo => (
            <li
              key={todo.id}
            >
              {todo.user && (
                `${todo.user} : ${todo.title}`
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
