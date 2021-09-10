import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
  query: string;
  users: string;
}

interface Handle {
  target: { name: string, value: string }
}

class App extends React.Component<{}, State> {
  state = {
    todos: [...preparedTodos],
    query: '',
    users: '',
  };

  handleChange = (event: Handle) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as any);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.state.users !== '') {
      this.state.todos.push({
        user: users[users.findIndex(user => user.name === this.state.users)],
        userId: users[users.findIndex(user => user.name === this.state.users)].id,
        id: preparedTodos.length,
        title: this.state.query,
        completed: false,
      });
    }

    this.setState(state => ({
      todos: [...state.todos],
      query: '',
      users: '',
    }));
    this.forceUpdate();
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit} className="form">
          <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleChange}
            placeholder="Add your todo"
            className="select"
            required
          />
          <select name="users" value={this.state.users} onChange={this.handleChange} required>
            <option value="">Choose a user</option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit" className="button">Add</button>
        </form>

        <div>
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
