import React from 'react';
import { uuid } from 'uuidv4';

import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todos.map((todo) => {
  const user = users.find((person) => person.id === todo.userId) || null;

  return {
    ...todo,
    user,
    uuid: uuid(),
  };
});

type State = {
  todos: Todo[];
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
  };

  addTodo = (newTodo: Todo) => {
    this.setState((currentState) => ({
      todos: [...currentState.todos, newTodo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <TodoList
          addTodo={this.addTodo}
          todos={this.state.todos}
          users={users}
        />
      </div>
    );
  }
}

export default App;
