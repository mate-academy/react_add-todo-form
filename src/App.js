import React from 'react';
import todos from './api/todos';
import users from './api/users';
import './App.css';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

const { uuid } = require('uuidv4');

class App extends React.Component {
  state = {
    todos,
  }

  addTodo = (title, userId) => {
    const newTodo = {
      userId,
      id: uuid(),
      title,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [newTodo, ...prevState.todos],
    }));
  }

    convertTodo = listOfTodos => listOfTodos.map(todo => ({
      title: todo.title,
      completed: todo.completed,
      name: users.find(user => user.id === todo.userId).name,
    }))

    render() {
      return (
        <div className="App">
          <h1>Add todo form</h1>
          <AddTodoForm
            users={users}
            addTodo={this.addTodo}
          />
          <TodoList
            todos={this.convertTodo(this.state.todos)}
          />
        </div>
      );
    }
}

export default App;
