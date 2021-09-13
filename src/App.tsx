import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
  };

  addTodo = (todo: Todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo</h1>
        <Form users={users} todos={todos} addTodo={this.addTodo} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
