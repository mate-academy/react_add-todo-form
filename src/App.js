import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { ...todo }],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__heading">Add Todo Form</h1>
        <NewTodo users={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
