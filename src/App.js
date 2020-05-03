import React from 'react';
import './App.css';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(item => ({
  ...item,
  user: users.find(user => user.id === item.userId),
}));

class App extends React.Component {
state = {
  todos: preparedTodos,
}

addTodo = (newtodos) => {
  this.setState(prevState => ({ todos: [...prevState.todos, newtodos] }));
}

render() {
  const { todos } = this.state;

  return (
    <div className="app">
      <TodoList todos={todos} />
      <NewTodo saveChange={this.addTodo} users={users} length={todos.length} />
    </div>
  );
}
}

export default App;
