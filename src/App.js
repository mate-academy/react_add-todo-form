import React from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todos: todos.map(item => ({
      ...item,
      user: users.find(user => item.userId === user.id),
    })),
  }

  addTodo = (newTodo) => {
    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    return (
      <div className="todo">
        <NewTodo
          users={users}
          initialTodoId={todos.length}
          saveTodo={this.addTodo}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
