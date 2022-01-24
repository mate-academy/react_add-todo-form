import React from 'react';
import './App.css';
import { Todo } from './types/Todo';
import { User } from './types/User';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

type State = {
  todos: Todo[],
  users: User[],
  userId: number,
  title: string,
};

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    users: users.map(user => ({
      ...user,
    })),
    userId: 0,
    title: '',
  };

  handleChangeId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: +value,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  addTodo = () => {
    this.setState(state => {
      if (state.userId === 0 || state.title === '') {
        return { ...state };
      }

      const newTodo = {
        title: state.title,
        id: state.todos.length + 1,
        userId: +state.userId,
        completed: false,
        user: users.find(user => user.id === +state.userId),
      };

      return {
        todos: [...state.todos, newTodo],
        userId: 0,
        title: '',
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.handleChangeTitle}
          />
          <select
            value={this.state.userId}
            name="userId"
            onChange={this.handleChangeId}
          >
            <option value="">Choose a user</option>
            {this.state.users.map(user => (
              <option key={user.id} value={user.id}>
                {`${user.name} ${user.username}`}
              </option>
            ))}
          </select>
          <button type="submit" onClick={this.addTodo}>add</button>
        </form>
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
