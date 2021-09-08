import React, { FormEvent } from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
  userId: number;
  title: string;
  isUserSelected: boolean,
  isTitleEntered: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    userId: 0,
    title: '',
    isUserSelected: true,
    isTitleEntered: true,
  };

  addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (userId === 0) {
      this.setState({ isUserSelected: false });

      return;
    }

    if (title.length === 0) {
      this.setState({ isTitleEntered: false });

      return;
    }

    this.setState(prevState => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: prevState.todos.length + 1,
        title,
        completed: false,
      };

      return ({
        todos: [...prevState.todos, newTodo],
        userId: 0,
        title: '',
      });
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      isUserSelected: true,
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isTitleEntered: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo</h1>
        <form onSubmit={this.addTodo} className="mb-3">
          <select
            className="form-select form-select-lg mb-3"
            onChange={this.selectUser}
            value={this.state.userId}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!this.state.isUserSelected
              && <div className="alert alert-danger">Please choose a user!</div>}
          <input
            className="form-control form-control-lg mb-3"
            type="text"
            onChange={this.addTitle}
            value={this.state.title}
            placeholder="Enter the title"
          />
          {!this.state.isTitleEntered
                && <div className="alert alert-danger">Please enter the title!</div>}
          <button type="submit" className="btn btn-success btn-lg">Add</button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
