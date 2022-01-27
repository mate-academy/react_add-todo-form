import React from 'react';
import nextId from 'react-id-generator';

import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/form/form';

import serverTodos from './api/todos';
import serverUsers from './api/users';

const preparedSereverTodos: Todo[] = serverTodos.map(todo => ({
  ...todo,
  user: serverUsers.find(user => user.id === todo.userId) || null,
}));

interface State {
  preparedTodos: Todo[];
  users: User[];
  lastIdTodo: string;
}

class App extends React.Component<{}, State> {
  state: State = {
    preparedTodos: [...preparedSereverTodos],
    users: [...serverUsers],
    lastIdTodo: nextId(),
  };

  addTodo = (newTodo: Todo) => {
    this.setState((state) => ({
      preparedTodos: [...state.preparedTodos, newTodo],
      lastIdTodo: nextId(),
    }));
  };

  render() {
    const {
      preparedTodos,
      users,
      lastIdTodo,
    } = this.state;

    return (
      <div className="App">
        <Form addTodo={this.addTodo} users={users} lastId={lastIdTodo} />

        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
