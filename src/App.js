import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    usersData: [...users],
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
    const { todoList, usersData } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <TodoList
          todoList={todoList}
          users={usersData}
        />
        <NewTodo
          addTodo={this.addTodo}
          users={usersData}
        />
      </div>
    );
  }
}

export default App;
