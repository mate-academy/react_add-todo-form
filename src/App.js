import React from 'react';
import './App.css';
import { TodoList } from './components/TodoListFolder';
import { AddTodo } from './components/AddTodo';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => (
      {
        todosList: [...prevState.todosList, todo],
      }
    ));
  }

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">

        <AddTodo
          usersList={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

export default App;
