import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const getUser = userId => users.find(user => user.id === userId);

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
  }

  addTodo = (newTitle, newUserId) => {
    const newTodo = {
      userId: newUserId,
      id: this.state.todos.length + 1,
      title: newTitle,
      completed: false,
      user: getUser(newUserId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <TodoForm users={users} addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
