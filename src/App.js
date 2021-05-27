import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

import users from './api/users';
import todosList from './api/todos';
import AddTodosForm from './components/AddTodosForm/AddTodosForm';

const preparedTodos = todosList.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map(el => (
        el.id === id
          ? {
            ...el, completed: !el.completed,
          }
          : el
      )),
    }));
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <main className="app">
        <AddTodosForm users={users} todos={todos} addTodo={this.addTodo} />
        <TodoList todos={todos} changeStatus={this.changeStatus} />
      </main>
    );
  }
}

export default App;
