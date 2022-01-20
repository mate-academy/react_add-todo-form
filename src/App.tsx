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

    if (this.state.newTitle.length === 0) {
      this.setState({
        errorTitle: 'Please enter the title',
      });

      return;
    }

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

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
        }}
        >
          <input
            type="text"
            name="newTitle"
            placeholder="Input title"
            onChange={(event) => {
              this.setState({
                newTitle: event.target.value,
              });
            }}
          />
          {this.state.errorTitle}
          <br />

          <select
            name="newUser"
            onChange={(event) => {
              this.setState({
                userName: event.target.value,
              });
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
