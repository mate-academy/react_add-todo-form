import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todoList: todos,
    todoId: todos.length,
    todoUserId: 0,
  }

  handleTodoList = (title) => {
    const { todoUserId, todoId } = this.state;

    const newTodo = {
      userId: todoUserId,
      id: todoId + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      todoList: [...state.todoList, newTodo],
      todoId: state.todoId + 1,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>
          to
          <span>do</span>
        </h1>

        <p>
          <span>
            Users:
            {users.length}
          </span>
        </p>

        <TodoForm
          users={users}
          todoList={this.state.todoList}
          todoId={this.state.todoId}
          handleTodoList={this.handleTodoList}
        />

        <TodoList
          todoList={this.state.todoList}
        />
      </div>
    );
  }
}

export default App;
