import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import NewTodo from './NewTodo';
import TodoList from './TodoList';

const todoList = [...todos];
const todosWithUser = todoList.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosWithUser,
  };

  addToList = (todoItem) => {
    todosWithUser.push(todoItem);
    this.setState({
      todos: todosWithUser.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>

        <TodoList
          todos={this.state.todos}
        />
        <NewTodo
          todos={this.state.todos}
          update={this.addToList}
        />
      </div>
    );
  }
}

export default App;
