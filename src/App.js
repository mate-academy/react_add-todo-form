import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(item => (
  {
    ...item,
    user: users.find(person => (person.id === item.userId)),
  }
));

class App extends React.Component {
  state={
    todos: [...preparedTodos],
    newTodoId: todos.length + 1,
  }

  addTask = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
      newTodoId: state.newTodoId + 1,
    }));
  }

  deleteTask = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
        .map(item => (
          (item.id > id)
            ? {
              ...item, id: item.id - 1,
            }
            : item
        )),
      newTodoId: state.todos.length,
    }));
  }

  changeTodoStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <NewTodo
          users={users}
          todos={todos}
          newTodoId={this.state.newTodoId}
          addTask={this.addTask}
        />
        <TodoList
          todos={this.state.todos}
          changeTodoStatus={this.changeTodoStatus}
          deleteTask={this.deleteTask}
        />
      </div>
    );
  }
}

export default App;
