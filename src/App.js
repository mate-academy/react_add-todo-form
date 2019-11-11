import React from 'react';
import './App.css';
import NewTodo from './components/newTodo/NewTodo';
import TodoTable from './components/todoTable/TodoTable.js';

import users from './api/users';
import todos from './api/todos';


function getUsersNames(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: getUsersNames(todos, users),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const todos = this.state.todos;
    return (
      <div className="container">
        <h2>Static list of todo</h2>
        <NewTodo
          users={users}
          todos={todos}
          addTodo={this.addTodo}
        />
        <TodoTable todos={todos} />
        </div>
    );
  }
}

export default App;
