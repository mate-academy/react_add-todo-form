import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  setNewTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <NewTodoForm
          todos={this.state.todos}
          users={users}
          currentTodos={todos.length}
          setNewTodo={this.setNewTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
