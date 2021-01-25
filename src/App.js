import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todo: preparedTodos,
  }

  addTodo = (title, userId) => {
    this.setState((prevState) => {
      const newTodo = {
        userId,
        title,
        completed: false,
        id: prevState.todo.length + 1,
        user: getUserById(userId),
      };

      return ({
        todo: [...prevState.todo, newTodo],

      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddForm users={users} addTodo={this.addTodo} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList prepared={this.state.todo} />
      </div>
    );
  }
}

export default App;
