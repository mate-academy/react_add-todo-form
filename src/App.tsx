import React from 'react';
import './App.scss';

import { TodoList } from './Components/TodoList/TodoList';
import { AddTodo } from './Components/AddTodo/AddTodo';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './types';

const preparedTodos = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
  };

  addNewTodo = (todo: Todo) => {
    this.setState(currentState => ({
      todos: [...currentState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <AddTodo
          addTodo={this.addNewTodo}
          users={users}
          todos={this.state.todos}
        />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
