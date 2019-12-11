import React from 'react';
import './App.css';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

const todosWithUsers = todos.map(task => ({
  ...task,
  user: users.find(user => user.id === task.userId),
}));

class App extends React.Component {
  state = { todosList: [...todosWithUsers] };

  addNewTodo = (title, userName) => {
    this.setState(state => ({
      todosList: [
        ...state.todosList,
        { title, user: { name: userName } }],
    }));
  };

  render() {
    return (
      <div className="App">
        <TodoList todos={this.state.todosList} />
        <NewTodo addNewTodo={this.addNewTodo} />
      </div>
    );
  }
}

export default App;
