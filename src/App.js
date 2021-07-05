import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './component/TodoList/TodoList';
import NewTodo from './component/NewTodo/NewTodo';

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodo performers={users} addTodo={this.addTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
