import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: [...preparedTodos],
  };

  addTodo = (todo) => {
    this.setState(prev => (
      {
        todos: [...prev.todos, todo],
      }
    ));
  };

  render() {
    return (
      <div className="App">
        <TodoList todos={preparedTodos} users={users} />
      </div>
    );
  }
}

export default App;
