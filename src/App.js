import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import NewTodo from './components/NewTodo';

class App extends React.Component {
  state = {
    todos: todos.map(todo => ({
      ...todo,
      person: users.find(user => user.id === todo.userId),
    })),
  }

  addNewTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <div>
        <NewTodo
          users={users}
          id={todos.length + 1}
          addNewTodo={this.addNewTodo}
        />
        <TodoList
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
      </div>
    );
  }
}

export default App;
