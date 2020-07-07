import React from 'react';
import './App.css';

import users from './api/users';
import { preparedTodos, maxId } from './components/PreparedTodos';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

class App extends React.Component {
state = {
  todos: preparedTodos,
  maxTodoID: maxId,
}

addTodo = (newTodoItem, newId) => {
  // eslint-disable-next-line no-console
  console.log('newTodoItem to render ->', newTodoItem);

  this.setState(prevState => ({
    todos: [
      ...prevState.todos,
      newTodoItem,
    ],
    maxTodoID: newId,
  }));
}

render() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo
        addTodo={this.addTodo}
        maxId={this.state.maxTodoID}
      />
      <TodoList todolist={this.state.todos} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}
}

export default App;
