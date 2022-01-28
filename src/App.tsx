import React from 'react';
import './App.css';
import { Todo } from './types/Todo';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

type State = {
  todos: Todo[],
  userId: number,
  title: string,
  isValidTodo: boolean,
  isValidUser: boolean,
};

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    userId: 0,
    isValidTodo: true,
    isValidUser: true,
    title: '',
  };

  handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      isValidUser: true,
      userId: +value,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      isValidTodo: true,
      title: value,
    });
  };

  addTodo = () => {
    this.setState(state => {
      if (state.userId === 0) {
        this.setState({ isValidUser: false });

        return { ...state };
      }

      if (state.title.trim() === '') {
        this.setState({ isValidTodo: false });

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
          {!this.state.isValidTodo && <span>Please enter a todo</span>}
          <select
            value={this.state.userId}
            name="userId"
            onChange={this.handleUserIdChange}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {`${user.name} ${user.username}`}
              </option>
            ))}
          </select>
          {!this.state.isValidUser && <span>Please choose a user</span>}
          <button type="submit" onClick={this.addTodo}>add</button>
        </form>
        <TodoList preparedTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
