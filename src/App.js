import React from 'react';

import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

import './App.css';

import todos from './api/todos';
import users from './api/users';

const getUser = userId => users.find(user => user.id === userId);

const todosWithUser = todos.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
  };

  addTodo = (title, userId, completed) => {
    this.setState(prev => ({
      todos: [...prev.todos, {
        userId,
        id: prev.todos.length + 1,
        title,
        completed: !!completed,
        user: users.find(user => user.id === userId),
      }],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <AddTodoForm
          users={users}
          addTodo={this.addTodo}
        />
        <TodoList
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
