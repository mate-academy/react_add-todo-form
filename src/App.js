import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './Components/TodoList';
import NewTodo from './Components/NewTodo';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
  }

  newTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  render() {
    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>
        <div>
          <NewTodo users={users} newTodo={this.newTodo} todoId={todos.length} />
          <TodoList todoList={this.state.todos} />
        </div>
      </>
    );
  }
}

export default App;
