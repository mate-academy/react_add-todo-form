import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addNewTodo = (title, name) => {
    this.setState((prevState) => {
      const newTodo = {
        userId: name.id,
        id: prevState.todos.length + 1,
        title,
        completed: false,
        user: {
          name,
        },
      };

      return {
        todos: [
          ...prevState.todos,
          newTodo,
        ],
      };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <TodoForm users={users} addNewTodo={this.addNewTodo} />
        <TodoList todos={this.state.todos} />

      </div>
    );
  }
}

export default App;
