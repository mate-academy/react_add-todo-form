import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

type State = {
  todos: Todo[];
  newTitle: string;
  userName: string;
  errorUser: string;
  errorTitle: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos,
    newTitle: '',
    userName: '',
    errorUser: '',
    errorTitle: '',
  };

  addTodo = () => {
    const newId = this.state.todos.length + 1;
    const newUser: User | null = users.find(user => user.name === this.state.userName) || null;

    if (!newUser) {
      this.setState({
        errorUser: 'Please choose a user',
      });

      return;
    }

    this.setState({
      errorUser: '',
    });

    if (this.state.newTitle.trim().length === 0) {
      this.setState({
        errorTitle: 'Please enter the title',
      });

      return;
    }

    this.setState({
      errorTitle: '',
    });

    const newTodo = {
      userId: newUser.id,
      id: newId,
      title: this.state.newTitle,
      completed: false,
    };

    const input = document.querySelector('input');
    const select = document.querySelector('select');

    if (input) {
      input.value = '';
    }

    if (select) {
      select.value = '';
    }

    this.setState((state) => ({
      todos: [...state.todos, newTodo],
      newTitle: '',
      userName: '',
      errorUser: '',
      errorTitle: '',
    }));
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const input = event.currentTarget.value;

    this.setState({ userName: input });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget.value;

    this.setState({ newTitle: input });
  };

  defaultPreventer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.defaultPreventer}>
          <input
            type="text"
            name="newTitle"
            placeholder="Input title"
            onChange={(event) => {
              this.handleTitleChange(event);
            }}
          />
          {this.state.errorTitle}
          <br />

          <select
            name="newUser"
            onChange={(event) => {
              this.handleUserChange(event);
            }}
          >
            <option value="">Choose an option</option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit" onClick={this.addTodo}>Add</button>
          {this.state.errorUser}
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
