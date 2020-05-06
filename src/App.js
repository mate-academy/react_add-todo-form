import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (id, title, completed, user) => {
    this.setState(prev => ({
      todos: [
        ...prev.todos,
        {
          id,
          title,
          completed,
          user,
        },
      ],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="app">
        <div className="todo__add">
          <NewTodo users={users} addTodo={this.addTodo} id={todos.length + 1} />
        </div>
        <div className="todo__list">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
