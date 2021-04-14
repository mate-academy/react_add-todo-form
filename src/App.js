import React from 'react';
import './App.scss';
import TodoForm from './TodoForm';
import TodoList from './TodosList';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      executant: users.find(user => user.id === todo.userId),
    })),
    nextId: todos.length + 1,
  }

  changeStatusComplete = (todoId) => {
    const { todos } = this.state;

    this.setState(() => ({
      todos: todos.map(todo => ({
        ...todo,
        completed: todo.id === todoId
          ? !todo.completed
          : todo.completed,
      })),
    }));
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
      nextId: state.nextId + 1,
    }));
  }

  render() {
    const { todos, nextId } = this.state;

    return (
      <div className="App todo">
        <TodoForm
          users={users}
          addTodo={this.addTodo}
          nextId={nextId}
        />
        <TodoList
          todos={todos}
          changeStatusComplete={this.changeStatusComplete}
        />
      </div>
    );
  }
}

export default App;
