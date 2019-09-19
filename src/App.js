import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';

class App extends Component {
  state = {
    arrayOfUsers: [...users],
    arrayOfTodos: [...todos],
  }

  addTodo = (titleValue, selectedUserValue) => {
    this.setState(({ arrayOfTodos, title, selectedUser }) => ({
      arrayOfTodos: [
        ...arrayOfTodos,
        {
          userId: selectedUserValue,
          id: arrayOfTodos.length + 1,
          title: titleValue,
          completed: false,
        },
      ],
    }));
  }

  render() {
    const {
      arrayOfUsers,
      arrayOfTodos,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <AddTodo
          addTodo={this.addTodo}
          arrayOfUsers={arrayOfUsers}
        />
        <TodoList arrayOfTodos={arrayOfTodos} />
      </div>
    );
  }
}

export default App;
