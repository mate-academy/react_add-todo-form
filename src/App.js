import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import TodoList from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state ={
    todos: preparedTodos,
    todoTitle: '',
    userId: 0,
  };

  render() {
    return (
      <div className="App">
        <h1>List of todos</h1>
        <p className="App__sum">
          <span>Todos: </span>
          {this.state.todos.length}
        </p>

        <p className="App__sum">
          <span>Users: </span>
          {users.length}
        </p>

        <form
          action="#"
          method="POST"
          onSubmit={(event) => {
            event.preventDefault();

            this.setState((prevState) => {
              const newTodo = {
                userId: this.state.userId,
                id: this.state.todos.length + 1,
                title: prevState.todoTitle,
                completed: false,
                user: users.find(user => user.id === this.state.userId),
              };

              return ({
                todos: [...prevState.todos, newTodo],
                todoTitle: '',
                userId: 0,
              });
            });
          }}
        >
          <div className="form__field">
            <label htmlFor="todoTitle">Todo title</label>
            <input
              type="text"
              name="todoTitle"
              value={this.state.todoTitle}
              onChange={(event) => {
                this.setState({ todoTitle: event.target.value.toLowerCase() });
              }}
              id="todoTitle"
              placeholder="Please enter the name of the new task"
            />

            <select
              name="userId"
              id="userId"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({ userId: +event.target.value });
              }}
            >
              <option>Please choose an executor</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">
            Add new todo
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
