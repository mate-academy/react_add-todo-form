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
    userName: 'choose',
    errorUser: '',
    errorTitle: '',
  };

  addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newTitle, userName } = this.state;
    const newId = this.state.todos.length + 1;
    const newUser: User | null = users.find(user => user.name === userName) || null;

    if (!newUser) {
      this.setState({
        errorUser: 'Please choose a user',
      });

      return;
    }

    if (newTitle.trim().length === 0) {
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

    this.setState((state) => ({
      todos: [...state.todos, newTodo],
      newTitle: '',
      userName: '',
      errorUser: '',
      errorTitle: '',
    }));
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userName: event.currentTarget.value,
      errorUser: '',
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.currentTarget.value,
      errorTitle: '',
    });
  };

  render() {
    const {
      errorTitle,
      newTitle,
      userName,
      errorUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            name="newTitle"
            placeholder="Input title"
            value={newTitle}
            onChange={this.handleTitleChange}
          />
          {errorTitle}
          <br />

          <select
            name="newUser"
            onChange={this.handleUserChange}
            value={userName}
          >
            <option value="choose">Choose an option</option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit">Add</button>
          {errorUser}
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
