import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import users from './api/users';
import todos from './api/todos';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => ({
    ...todo,
    user: users.find(item => item.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    todos: getTodosWithUsers(todos, users),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="main">
        <div className="main-todos">
          <TodoList todos={todos} />
          <NewTodo
            users={users}
            todos={todos}
            addTodo={this.addTodo}
          />
        </div>
      </div>
    );
  }
}

export default App;
