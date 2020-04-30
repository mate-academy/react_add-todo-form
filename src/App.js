import React from 'react';
import './App.css';

import TodoList from './TodoList';
import NewTodo from './NewTodo';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
state = {
  todos: [...todos],
  users: [...users],
}

saveChange = (newtodos) => {
  this.setState({ todos: newtodos });
}

render() {
  const { todos, users } = this.state;
  const preparedTodos = todos.map((item, index) => ({
    ...item,
    id: index + 1,
    user: users.find(user => user.id === item.userId),
  }));

  return (
    <div className="app">
      <TodoList preparedTodos={preparedTodos} />
      <NewTodo
        users={users}
        tempUser={this.state.tempUser}
        tempTitle={this.state.tempTitle}
        todos={todos}
        saveChange={this.saveChange}
      />
    </div>
  );
}
}

export default App;
