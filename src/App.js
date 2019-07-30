import React from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const todos = todosFromServer.map(todo => ({
  ...todo, user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos,
  }

  addTodo = (title, user) => {
    this.setState(state => ({
      todos: [...state.todos, {
        title,
        user,
        completed: false,
        id: state.todos.length + 1,
      }],
    }));
  };

  render() {

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Todos: </span>
          {this.state.todos.length}
        </p>
        <AddTodoForm
          onSubmit={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
