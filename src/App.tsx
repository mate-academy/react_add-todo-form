import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { user, ...todo };
});

type State = {
  currentTodos: Todo[];
};

class App extends React.Component<{}, State> {
  state: State = {
    currentTodos: preparedTodos,
  };

  setNewTodo = (todo: Todo) => {
    this.setState(state => (
      { currentTodos: [...state.currentTodos, todo] }
    ));
  };

  render() {
    const { currentTodos } = this.state;

    return (
      <div className="App">
        <h1>
          List of todos
        </h1>
        <TodoForm users={users} setNewTodo={this.setNewTodo} />
        <TodoList todos={currentTodos} />
      </div>
    );
  }
}

export default App;
