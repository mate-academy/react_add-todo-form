import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { uuid } from 'uuidv4';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { SelectUser } from './components/SelectUser';

const todosWithUsers: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

interface State {
  todos: Todo[];
  users: User[];
  todoTitle: string;
  selected: string;
  isFilled: boolean;
  isSelected: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    todos: todosWithUsers,
    users,
    todoTitle: '',
    selected: '',
    isFilled: true,
    isSelected: true,
  };

  clearInputs = () => {
    this.setState(({
      todoTitle: '', selected: '',
    }));
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      todoTitle: value,
      isFilled: true,
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      selected: value, isSelected: true,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { selected, todoTitle } = this.state;

    if (!todoTitle) {
      this.setState({
        isFilled: false,
      });
    }

    if (!selected) {
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

    this.clearInputs();
  };

  render() {
    return (
      <div className="App container-lg">
        <h1
          className="App__title"
        >
          Add todo form
        </h1>
        <ul className="list-group list-group-flush">
          <TodoList todos={this.state.todos} />
        </ul>
        <form
          className="App__form"
          action="#"
          onSubmit={this.handleSubmit}
        >
          <span>
            {!this.state.isFilled ? 'Please enter the title' : null}
          </span>
          <input
            className="App__todo_title form-control form-control-lg"
            type="text"
            name="todo"
            value={this.state.todoTitle}
            placeholder="Enter the todo title"
            onChange={this.handleInput}
          />
          <span>
            {!this.state.isSelected ? 'Please choose a user' : null}
          </span>
          <select
            className="form-select form-select-lg mb-3"
            name="selectUser"
            id="1"
            value={this.state.selected}
            onChange={this.handleSelect}
          >
            <SelectUser users={this.state.users} />
          </select>
          <button
            className="btn btn-primary"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
