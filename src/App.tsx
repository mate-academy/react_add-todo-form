import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { uuid } from 'uuidv4';
import { TodoList } from './components/TodoList';
import { UserList } from './components/UserList';

import todos from './api/todos';
import users from './api/users';

const prepearedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
  todoTitle: string;
  selected: string;
  isFilled: boolean;
  isSelected: boolean;
}

class App extends Component<{}, State> {
  state = {
    todos: prepearedTodos,
    users,
    todoTitle: '',
    selected: '',
    isFilled: true,
    isSelected: true,
  };

  handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    this.setState({
      todoTitle: value,
      isFilled: true,
    });
  };

  handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    this.setState({
      selected: value,
      isSelected: true,
    });
  };

  clear = () => {
    this.setState(({
      todoTitle: '',
      selected: '',
    }));
  };

  handleChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { selected, todoTitle } = this.state;

    if (todoTitle === '') {
      this.setState({
        isFilled: false,
      });
    }

    if (selected === '') {
      this.setState({
        isSelected: false,
      });
    }

    if (!todoTitle || !selected) {
      return;
    }

    const rightUser = this.state.users.find(user => user.name === selected);

    this.setState(currentState => ({
      todos: [
        ...currentState.todos,
        {
          userId: uuid(),
          id: uuid(),
          title: currentState.todoTitle,
          completed: false,
          user: rightUser || null,
        },
      ],
    }));

    this.clear();
  };

  render() {
    return (
      <div className="App container-lg">
        <h1
          className="App__title"
        >
          Add todo form
        </h1>
        <form
          className="App__form"
          action="#"
          onSubmit={this.handleChangeSubmit}
        >
          <p>
            {!this.state.isFilled ? 'Please enter the title' : null}
          </p>
          <input
            className="form-control form-control-lg"
            type="text"
            name="todo"
            value={this.state.todoTitle}
            placeholder="Title"
            onChange={this.handleChangeInput}
          />
          <p>
            {!this.state.isSelected ? 'Please choose a user' : null}
          </p>
          <select
            className="form-select form-select-lg mb-3"
            name="selectUser"
            id="1"
            value={this.state.selected}
            onChange={this.handleChangeSelect}
          >
            <UserList users={this.state.users} />
          </select>
          <button
            className="btn btn-success"
            type="submit"
          >
            Add
          </button>
        </form>
        <ul className="list-group list-group-flush">
          <TodoList todos={this.state.todos} />
        </ul>
      </div>
    );
  }
}

export default App;
