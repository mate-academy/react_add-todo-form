import React from 'react';
import './App.css';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import users from './api/users';
import { State } from './components/types/State';

const preparedTodos = todos.map((el) => ({
  ...el,
  user: users.find(
    (user) => user.id === el.userId,
  ) || null,
}));

class App extends React.Component<{}, State> {
  state:State = {
    title: '',
    userName: '',
    todoList: [...preparedTodos],
    // userIsValid: false,
    // titleIsValid: false,
    formErrors: { title: '', user: '' },
  };

  changeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      title: event.target.value,
      // titleIsValid: true,
      formErrors: { ...state.formErrors, title: '' },
    }));
  };

  onSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    if (this.state.title && this.state.userName) {
      const newTodo = {
        userId: Number(this.state.userName),
        id: this.state.todoList.length + 1,
        title: this.state.title,
        completed: false,
        user: users.find(user => user.name === this.state.userName),
      };

      this.setState(state => ({
        todoList: [...state.todoList, newTodo],
        title: '',
        userName: '',
      }));
    }

    if (!this.state.title) {
      this.setState(state => ({
        formErrors: { ...state.formErrors, title: 'Please enter the title' },
      }));
    }

    if (!this.state.userName) {
      this.setState(state => ({
        formErrors: { ...state.formErrors, user: 'Please choose a user' },
      }));
    }
  };

  onSelectorChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(state => ({
      userName: event.target.value,
      formErrors: { ...state.formErrors, user: '' },
      // userIsValid: true,
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          onSubmit={this.onSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.changeTitle}
          />

          {this.state.formErrors.title}
          <select
            name="user"
            value={this.state.userName}
            onChange={this.onSelectorChange}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          {this.state.formErrors.user}
          <button type="submit">
            Add
          </button>
        </form>

        <p>
          <span>ToDo list: </span>
          {this.state.todoList.length}
        </p>

        <TodoList todos={this.state.todoList} />
      </div>
    );
  }
}

export default App;
