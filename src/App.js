import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  state = {
    todos: todos.map(el => ({
      ...el,
      user: users.find(person => person.id === el.userId),
    })),
  }

  MaxId = this.state.todos.length + 1;

  addNewTask = (value) => {
    const completeValue = {
      ...value,
      id: this.MaxId++,
    };

    this.setState(state => ({
      todos: [
        ...state.todos, completeValue,
      ],
    }));
  }

  handleCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo, completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <div className="app">
        <NewTodo users={users} addNewTask={this.addNewTask} />
        <TodoList
          handleCompleted={this.handleCompleted}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
