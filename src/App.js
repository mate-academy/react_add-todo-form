import './App.css';
import React from 'react';
import users from './api/users';
import todos from './api/todos';
import NewTodo from './addNewTodo';
import TodoList from './TodoList';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...todosWithUsers],
  };

  addNewTodo = (title, userName) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title,
          user: { name: userName },
        }],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>List of Todos </h1>
        <div>
          <NewTodo addNewTodo={this.addNewTodo} />
          <TodoList addTodos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
