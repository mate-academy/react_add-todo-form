import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    users: [...users],
    todoList: [...todos],
  }

  addTodo = todo => (
    this.setState(state => ({
      todoList: [...state.todoList, {
        ...todo,
        id: state.todoList.slice(-1)[0].id + 1,
      }],
    }))
  )

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <TodoList
          todoList={this.state.todoList}
          users={this.state.users}
        />
        <NewTodo
          addTodo={this.addTodo}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
