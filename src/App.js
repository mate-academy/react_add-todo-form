import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

const getUserById = id => users.find(user => user.id === id);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: preparedTodos,
  }

  addTodo = (userId, title) => {
    const { todoList } = this.state;

    const newTodo = {
      userId,
      id: todoList.length + 1,
      title,
      completed: false,
      user: getUserById(userId),
    };

    this.setState(state => ({
      todoList: [newTodo, ...state.todoList],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <h1>List of tasks</h1>
        <AddTodoForm users={users} onAdd={this.addTodo} />
        <TodoList list={todoList} />
      </div>
    );
  }
}

export default App;
