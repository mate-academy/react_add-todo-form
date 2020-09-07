import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import Form from './components/Form';

const prepTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: prepTodos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        todo,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <span>Users: </span>
        {todos.length}
        <Form
          addTodo={this.addTodo}
          users={users}
          id={this.state.todos.length + 1}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
